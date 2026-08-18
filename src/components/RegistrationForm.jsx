import React, { useState, useCallback } from 'react';
import {
  Users, Sparkles, AlertCircle, Loader2,
  UserRound, UsersRound, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { registerTeam } from '../lib/supabaseClient';
import { scratchAudio } from '../lib/soundEffects';
import RegistrationBadgeModal from './RegistrationBadgeModal';

/* ─── Team size config ─── */
const TEAM_SIZES = [
  { size: 1, label: 'Solo',  icon: UserRound,   desc: '1 member',  color: '#FFE500' },
  { size: 2, label: 'Duo',   icon: Users,       desc: '2 members', color: '#FF5CE8' },
  { size: 3, label: 'Trio',  icon: UsersRound,  desc: '3 members', color: '#00FFB3' },
];

const EMPTY_MEMBER = { fullName: '', email: '', batch: '' };

export default function RegistrationForm() {
  const [teamSize, setTeamSize]   = useState(3);
  const [formData, setFormData]   = useState({
    teamName: '',
    leader:  { fullName: '', email: '', batch: '', phone: '' },
    member2: { ...EMPTY_MEMBER },
    member3: { ...EMPTY_MEMBER },
  });
  const [errors, setErrors]               = useState({});
  const [isSubmitting, setIsSubmitting]   = useState(false);
  const [isSnapping, setIsSnapping]       = useState(false);
  const [globalError, setGlobalError]     = useState('');
  const [confirmedRegistration, setConfirmedRegistration] = useState(null);

  /* ── Real-time per-field duplicate email ── */
  const getDuplicateEmail = useCallback((section, value) => {
    const val = value.toLowerCase().trim();
    if (!val) return null;
    const others = ['leader', 'member2', 'member3']
      .filter(s => s !== section)
      .map(s => formData[s]?.email?.toLowerCase().trim())
      .filter(Boolean);
    return others.includes(val) ? 'This email is already used by another member!' : null;
  }, [formData]);

  /* ── Input change ── */
  const handle = (section, field, value) => {
    setErrors(prev => {
      const next = { ...prev };
      const prefix = section === 'leader' ? 'leader' : section === 'member2' ? 'member2' : section === 'member3' ? 'member3' : '';
      const key = section === 'teamName' ? 'teamName' : `${prefix}${field.charAt(0).toUpperCase() + field.slice(1)}`;
      delete next[key];
      delete next.duplicateEmail;
      return next;
    });
    setGlobalError('');
    if (section === 'teamName') {
      setFormData(p => ({ ...p, teamName: value }));
    } else {
      setFormData(p => ({ ...p, [section]: { ...p[section], [field]: value } }));
    }
  };

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe  = /^[0-9]{10}$/;

    if (!formData.teamName.trim())      e.teamName = 'Team name is required.';
    else if (formData.teamName.trim().length < 2) e.teamName = 'Minimum 2 characters.';

    if (!formData.leader.fullName.trim()) e.leaderFullName = 'Full name is required.';
    if (!formData.leader.email.trim())    e.leaderEmail    = 'Email is required.';
    else if (!emailRe.test(formData.leader.email.trim())) e.leaderEmail = 'Enter a valid email address.';
    if (!formData.leader.batch.trim())    e.leaderBatch    = 'Batch name is required.';
    if (!formData.leader.phone.trim())    e.leaderPhone    = 'Mobile number is required.';
    else if (!phoneRe.test(formData.leader.phone.trim().replace(/\D/g, ''))) e.leaderPhone = 'Must be exactly 10 digits.';

    if (teamSize >= 2) {
      if (!formData.member2.fullName.trim()) e.member2FullName = 'Full name is required.';
      if (!formData.member2.email.trim())    e.member2Email    = 'Email is required.';
      else if (!emailRe.test(formData.member2.email.trim())) e.member2Email = 'Enter a valid email.';
      if (!formData.member2.batch.trim())    e.member2Batch    = 'Batch name is required.';
    }
    if (teamSize >= 3) {
      if (!formData.member3.fullName.trim()) e.member3FullName = 'Full name is required.';
      if (!formData.member3.email.trim())    e.member3Email    = 'Email is required.';
      else if (!emailRe.test(formData.member3.email.trim())) e.member3Email = 'Enter a valid email.';
      if (!formData.member3.batch.trim())    e.member3Batch    = 'Batch name is required.';
    }

    const activeEmails = [
      formData.leader.email.toLowerCase().trim(),
      ...(teamSize >= 2 ? [formData.member2.email.toLowerCase().trim()] : []),
      ...(teamSize >= 3 ? [formData.member3.email.toLowerCase().trim()] : []),
    ].filter(Boolean);
    const dup = activeEmails.find((em, i) => activeEmails.indexOf(em) !== i);
    if (dup) e.duplicateEmail = `"${dup}" appears more than once — every member must have a unique email.`;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setGlobalError('');
    if (!validate()) {
      scratchAudio.playError();
      setGlobalError('Please fix the highlighted errors before submitting.');
      return;
    }
    setIsSnapping(true);
    scratchAudio.playSnap();
    setTimeout(async () => {
      setIsSubmitting(true);
      try {
        const result = await registerTeam({ ...formData, teamSize });
        setIsSubmitting(false); setIsSnapping(false);
        setConfirmedRegistration(result);
      } catch (err) {
        setIsSubmitting(false); setIsSnapping(false);
        scratchAudio.playError();
        setGlobalError(err.message || 'Registration failed. Please try again.');
      }
    }, 600);
  };

  /* ── Shared style helpers ── */
  const label = 'block text-xs font-sans font-semibold text-white/55 uppercase tracking-wider mb-1.5';
  const err   = (msg) => msg ? (
    <p className="flex items-center gap-1 text-xs text-[#FF6B6B] mt-1.5 font-sans">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{msg}
    </p>
  ) : null;

  /* ── Text input (no icon inside) ── */
  const renderField = ({ section, field, type = 'text', placeholder, errorKey, maxLen }) => (
    <div>
      <input
        type={type}
        maxLength={maxLen}
        value={section === 'teamName' ? formData.teamName : formData[section][field]}
        onChange={e => handle(section, field, e.target.value)}
        placeholder={placeholder}
        className={`scratch-input ${errors[errorKey] ? 'error' : ''}`}
      />
      {err(errors[errorKey])}
    </div>
  );

  /* ── Email field with real-time dup detection ── */
  const renderEmailField = ({ section, errorKey, placeholder }) => {
    const dupErr = getDuplicateEmail(section, formData[section]?.email || '');
    const valErr = errors[errorKey];
    return (
      <div>
        <input
          type="email"
          value={formData[section].email}
          onChange={e => handle(section, 'email', e.target.value)}
          placeholder={placeholder}
          className={`scratch-input ${(dupErr || valErr) ? 'error' : ''}`}
        />
        {dupErr
          ? <p className="flex items-center gap-1 text-xs text-[#FF6B6B] mt-1.5 font-sans"><AlertCircle className="w-3.5 h-3.5 shrink-0" />{dupErr}</p>
          : err(valErr)
        }
      </div>
    );
  };

  return (
    <section id="register" className="py-20 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#FF5CE8]/10 rounded-md rotate-12 blur-xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#00FFB3]/10 rounded-md -rotate-12 blur-2xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 bg-[#A78BFF]/20 text-[#A78BFF] border border-[#A78BFF]/40 rounded-sm font-sans text-sm font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4" /> Team Registration Block
          </div>
          <h2 className="font-heading text-5xl sm:text-7xl text-white">Snap Your Team Together</h2>
          <p className="text-white/55 mt-2 text-sm sm:text-base font-sans">
            Complete your team details to lock in your hackathon spot.
          </p>
        </div>

        {/* ── Team Size Selector ── */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <span className="text-xs font-sans font-semibold text-white/45 uppercase tracking-widest">
              How many members are in your team?
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {TEAM_SIZES.map(({ size, label: lbl, icon: Icon, desc, color }) => (
              <button
                key={size} type="button"
                onClick={() => { scratchAudio.playSnap(); setTeamSize(size); setErrors({}); setGlobalError(''); }}
                className="relative flex flex-col items-center gap-2 p-4 rounded-md border-2 transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: teamSize === size ? color : 'rgba(255,255,255,0.15)',
                  background:  teamSize === size ? `${color}18` : 'rgba(255,255,255,0.04)',
                  boxShadow:   teamSize === size ? `4px 4px 0 ${color}55` : 'none',
                  transform:   teamSize === size ? 'translate(-2px,-2px)' : 'none',
                }}
              >
                <Icon className="w-6 h-6" style={{ color: teamSize === size ? color : 'rgba(255,255,255,0.4)' }} />
                <div>
                  <div className="font-heading text-xl" style={{ color: teamSize === size ? color : 'rgba(255,255,255,0.7)' }}>{lbl}</div>
                  <div className="text-xs text-white/40 font-sans">{desc}</div>
                </div>
                {size === 3 && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] px-1.5 py-0.5 rounded-sm bg-[#00FFB3] text-[#0A0E1A] font-sans font-bold uppercase tracking-wider whitespace-nowrap">
                    Recommended
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Solo/Duo Disclaimer (valid but optional note) ── */}
        {(teamSize === 1 || teamSize === 2) && (
          <div className="mb-6 p-4 rounded-md bg-[#FFE500]/10 border-2 border-[#FFE500]/40 flex items-start gap-3 snap-anim">
            <AlertTriangle className="w-5 h-5 text-[#FFE500] shrink-0 mt-0.5" />
            <div>
              <div className="font-heading text-lg text-[#FFE500]">Solo/Duo Notice</div>
              <p className="text-sm text-white/70 font-sans mt-1 leading-relaxed">
                {teamSize === 1 ? 'Solo' : 'Duo'} participation is fully valid and allowed.
                If you'd like to find {teamSize === 1 ? 'a team' : 'a 3rd member'}, contact <span className="text-[#FFE500]">Newton School of Technology</span> organisers
                who can try to connect you with other participants looking for a team.
              </p>
            </div>
          </div>
        )}

        {/* ── Global Error ── */}
        {(globalError || errors.duplicateEmail) && (
          <div className="mb-6 p-4 rounded-md bg-[#FF6B6B]/15 border-2 border-[#FF6B6B]/50 text-white flex items-start gap-3 snap-anim">
            <AlertCircle className="w-5 h-5 text-[#FF6B6B] shrink-0 mt-0.5" />
            <div>
              {globalError && <div className="text-sm font-semibold font-sans">{globalError}</div>}
              {errors.duplicateEmail && (
                <div className="text-sm font-sans mt-1">
                  <span className="font-bold">Duplicate Email: </span>{errors.duplicateEmail}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Form ── */}
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit} 
          className={`space-y-8 ${isSnapping ? 'snap-anim' : ''}`}
        >

          {/* BLOCK 1 — Team Name */}
          <div className="scratch-block events scratch-notch">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="font-heading text-xl text-[#FFE500] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFE500]" />
                broadcast [team_created]
              </div>
              <span className="scratch-tag scratch-tag-events">Step 1</span>
            </div>
            <label className={label}>Team Name <span className="text-[#FF6B6B]">*</span></label>
            {renderField({ section: "teamName", field: "teamName", placeholder: "Team Name", errorKey: "teamName" })}
          </div>

          {/* BLOCK 2 — Leader */}
          <div className="scratch-block motion scratch-notch">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div className="font-heading text-xl text-[#00FFB3] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00FFB3]" />
                {teamSize === 1 ? 'Your Details 👤' : 'Member 1: Team Leader 👑'}
              </div>
              <span className="scratch-tag scratch-tag-motion">Primary Contact</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={label}>Full Name <span className="text-[#FF6B6B]">*</span></label>
                {renderField({ section: "leader", field: "fullName", placeholder: "Full Name", errorKey: "leaderFullName" })}
              </div>
              <div>
                <label className={label}>Email Address <span className="text-[#FF6B6B]">*</span></label>
                {renderEmailField({ section: "leader", errorKey: "leaderEmail", placeholder: "Email Address" })}
              </div>
              <div>
                <label className={label}>Batch <span className="text-[#FF6B6B]">*</span></label>
                {renderField({ section: "leader", field: "batch", placeholder: "Batch", errorKey: "leaderBatch" })}
              </div>
              <div>
                <label className={label}>Mobile Number <span className="text-[#FF6B6B]">*</span></label>
                {renderField({ section: "leader", field: "phone", type: "tel", maxLen: 10, placeholder: "Mobile Number", errorKey: "leaderPhone" })}
              </div>
            </div>
          </div>

          {/* BLOCK 3 — Member 2 */}
          {teamSize >= 2 && (
            <div className="scratch-block looks scratch-notch">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="font-heading text-xl text-[#FF5CE8] flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5CE8]" />
                  Member 2 Details
                </div>
                <span className="scratch-tag scratch-tag-looks">Team Member</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={label}>Full Name <span className="text-[#FF6B6B]">*</span></label>
                  {renderField({ section: "member2", field: "fullName", placeholder: "Full Name", errorKey: "member2FullName" })}
                </div>
                <div>
                  <label className={label}>Email Address <span className="text-[#FF6B6B]">*</span></label>
                  {renderEmailField({ section: "member2", errorKey: "member2Email", placeholder: "Email Address" })}
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Batch <span className="text-[#FF6B6B]">*</span></label>
                  {renderField({ section: "member2", field: "batch", placeholder: "Batch", errorKey: "member2Batch" })}
                </div>
              </div>
            </div>
          )}

          {/* BLOCK 4 — Member 3 */}
          {teamSize >= 3 && (
            <div className="scratch-block sensing scratch-notch">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <div className="font-heading text-xl text-[#A78BFF] flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#A78BFF]" />
                  Member 3 Details
                </div>
                <span className="scratch-tag scratch-tag-sensing">Team Member</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={label}>Full Name <span className="text-[#FF6B6B]">*</span></label>
                  {renderField({ section: "member3", field: "fullName", placeholder: "Full Name", errorKey: "member3FullName" })}
                </div>
                <div>
                  <label className={label}>Email Address <span className="text-[#FF6B6B]">*</span></label>
                  {renderEmailField({ section: "member3", errorKey: "member3Email", placeholder: "Email Address" })}
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Batch <span className="text-[#FF6B6B]">*</span></label>
                  {renderField({ section: "member3", field: "batch", placeholder: "Batch", errorKey: "member3Batch" })}
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="text-center pt-2">
            <button
              type="submit" disabled={isSubmitting}
              className="scratch-btn scratch-btn-events text-xl py-4 px-10 w-full sm:w-auto"
            >
              {isSubmitting
                ? <><Loader2 className="w-6 h-6 animate-spin" /> Compiling &amp; Snapping…</>
                : <><Sparkles className="w-6 h-6" /> Snap &amp; Register {teamSize === 1 ? 'Solo' : teamSize === 2 ? 'Duo' : 'Team'}</>
              }
            </button>
            <div className="text-xs text-white/30 mt-3 font-code">
              Hosted by Newton School of Technology • Real-time duplicate email detection active
            </div>
          </div>

        </motion.form>

        {confirmedRegistration && (
          <RegistrationBadgeModal
            registrationData={confirmedRegistration}
            onClose={() => setConfirmedRegistration(null)}
          />
        )}
      </motion.div>
    </section>
  );
}
