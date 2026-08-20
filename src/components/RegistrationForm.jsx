import React, { useState, useCallback } from 'react';
import {
  Users, Sparkles, AlertCircle, Loader2,
  UserRound, UsersRound, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { registerTeam } from '../lib/supabaseClient';
import { scratchAudio } from '../lib/soundEffects';
import RegistrationBadgeModal from './RegistrationBadgeModal';
import { GeoBox, GeoStar, GeoCylinder, GeoDiamond } from './GeoShapes';

/* ─── Team size config ─── */
const TEAM_SIZES = [
  { size: 1, label: 'Solo',  icon: UserRound,   desc: '1 member',  color: '#FFE500' },
  { size: 2, label: 'Duo',   icon: Users,       desc: '2 members', color: '#FF5CE8' },
  { size: 3, label: 'Trio',  icon: UsersRound,  desc: '3 members', color: '#00FFB3' },
];

const EMPTY_MEMBER = { fullName: '', email: '', batch: '' };

export default function RegistrationForm() {
  const [teamSize, setTeamSize] = useState(3);
  const [formData, setFormData] = useState({
    teamName: '',
    leader:  { fullName: '', email: '', batch: '', phone: '' },
    member2: { ...EMPTY_MEMBER },
    member3: { ...EMPTY_MEMBER },
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [globalError, setGlobalError] = useState('');
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
    const phoneRe = /^[0-9]{10}$/;

    if (!formData.teamName.trim()) e.teamName = 'Team name is required.';
    else if (formData.teamName.trim().length < 2) e.teamName = 'Minimum 2 characters.';

    // Member 1 (Leader / Primary Registrant)
    if (!formData.leader.fullName.trim()) e.leaderFullName = 'Full name is required.';
    if (!formData.leader.email.trim())    e.leaderEmail    = 'Email is required.';
    else if (!emailRe.test(formData.leader.email.trim())) e.leaderEmail = 'Enter a valid email address.';
    if (!formData.leader.batch.trim())    e.leaderBatch    = 'Batch name is required.';
    if (!formData.leader.phone.trim())    e.leaderPhone    = 'Mobile number is required.';
    else if (!phoneRe.test(formData.leader.phone.trim().replace(/\D/g, ''))) e.leaderPhone = 'Must be exactly 10 digits.';

    // Member 2
    if (teamSize >= 2) {
      if (!formData.member2.fullName.trim()) e.member2FullName = 'Full name is required.';
      if (!formData.member2.email.trim())    e.member2Email    = 'Email is required.';
      else if (!emailRe.test(formData.member2.email.trim())) e.member2Email = 'Enter a valid email.';
      if (!formData.member2.batch.trim())    e.member2Batch    = 'Batch name is required.';
    }

    // Member 3
    if (teamSize >= 3) {
      if (!formData.member3.fullName.trim()) e.member3FullName = 'Full name is required.';
      if (!formData.member3.email.trim())    e.member3Email    = 'Email is required.';
      else if (!emailRe.test(formData.member3.email.trim())) e.member3Email = 'Enter a valid email.';
      if (!formData.member3.batch.trim())    e.member3Batch    = 'Batch name is required.';
    }

    // Check duplicate emails within team
    const activeEmails = [
      formData.leader.email.toLowerCase().trim(),
      ...(teamSize >= 2 ? [formData.member2.email.toLowerCase().trim()] : []),
      ...(teamSize >= 3 ? [formData.member3.email.toLowerCase().trim()] : [])
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

  const label = 'block text-xs font-sans font-semibold text-white/55 uppercase tracking-wider mb-1.5';
  const err = (msg) => msg ? (
    <p className="flex items-center gap-1 text-xs text-[#FF6B6B] mt-1.5 font-sans">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />{msg}
    </p>
  ) : null;

  const renderField = ({ section, field, type = "text", placeholder, errorKey, maxLen }) => {
    const isTeam = section === "teamName";
    const val = isTeam ? formData.teamName : formData[section][field];
    const isErr = !!errors[errorKey];

    return (
      <div>
        <input
          type={type}
          maxLength={maxLen}
          value={val}
          placeholder={placeholder}
          onChange={(e) => handle(section, field, e.target.value)}
          className={`scratch-input w-full ${isErr ? 'scratch-input-error' : ''}`}
        />
        {err(errors[errorKey])}
      </div>
    );
  };

  const renderEmailField = ({ section, errorKey, placeholder }) => {
    const val = formData[section].email;
    const dupWarning = getDuplicateEmail(section, val);
    const hasError = !!errors[errorKey] || !!dupWarning;

    return (
      <div>
        <input
          type="email"
          value={val}
          placeholder={placeholder}
          onChange={(e) => handle(section, 'email', e.target.value)}
          className={`scratch-input w-full ${hasError ? 'scratch-input-error' : ''}`}
        />
        {err(errors[errorKey] || dupWarning)}
      </div>
    );
  };

  return (
    <section id="register" className="py-16 sm:py-20 relative border-t border-white/10 overflow-hidden">
      <GeoBox 
        color="#00FFB3" shadow="#008F64"
        className="absolute top-12 left-8 lg:left-14 w-14 h-14 lg:w-16 lg:h-16 geo-float opacity-80 hidden md:block"
      />
      <GeoStar 
        color="#FFE500" shadow="#998A00"
        className="absolute top-20 right-8 lg:right-16 w-14 h-14 lg:w-16 lg:h-16 geo-float-slow opacity-85 hidden md:block"
      />
      <GeoDiamond 
        color="#FF5CE8" shadow="#B326A0"
        className="absolute bottom-16 left-8 lg:left-16 w-12 h-12 lg:w-14 lg:h-14 geo-float-alt opacity-75 hidden md:block"
      />
      <GeoCylinder 
        color="#A78BFF" shadow="#7352D9"
        className="absolute bottom-12 right-8 lg:right-16 w-12 h-16 geo-float-slow opacity-80 hidden md:block"
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-3 bg-[#A78BFF]/20 text-[#A78BFF] border border-[#A78BFF]/40 rounded-full font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Registration Block
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide">
            Snap Your Team Together
          </h2>
          <p className="text-white/60 mt-2 text-xs sm:text-base font-sans max-w-lg mx-auto">
            Choose your registration size. Complete your details to lock in your hackathon spot.
          </p>
        </div>

        <div className="mb-6">
          <div className="text-center mb-3">
            <span className="text-[11px] sm:text-xs font-sans font-semibold text-white/50 uppercase tracking-widest">
              How many members are registering right now?
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3.5 max-w-lg mx-auto">
            {TEAM_SIZES.map(({ size, label: lbl, icon: Icon, desc, color }) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  scratchAudio.playSnap();
                  setTeamSize(size);
                  setErrors({});
                  setGlobalError('');
                }}
                className="relative flex flex-col items-center justify-center gap-1 p-2 sm:p-3.5 rounded-lg border-2 transition-all duration-200 cursor-pointer"
                style={{
                  borderColor: teamSize === size ? color : 'rgba(255,255,255,0.15)',
                  background:  teamSize === size ? `${color}18` : 'rgba(255,255,255,0.04)',
                  boxShadow:   teamSize === size ? `2px 2px 0 ${color}66` : 'none',
                }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: teamSize === size ? color : 'rgba(255,255,255,0.4)' }} />
                <div className="text-center">
                  <div className="font-heading text-base sm:text-xl leading-tight" style={{ color: teamSize === size ? color : 'rgba(255,255,255,0.8)' }}>{lbl}</div>
                  <div className="text-[9px] sm:text-xs text-white/40 font-sans mt-0.5 leading-none">{desc}</div>
                </div>
                {size === 3 && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[7px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-[#00FFB3] text-[#070B14] font-sans font-bold uppercase tracking-wider whitespace-nowrap shadow-sm">
                    Complete Team
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {(teamSize === 1 || teamSize === 2) && (
          <div className="mb-6 sm:mb-8 p-3.5 sm:p-5 rounded-xl bg-[#FFE500]/10 border-2 border-[#FFE500]/40 flex items-start gap-3 snap-anim">
            <Info className="w-5 h-5 text-[#FFE500] shrink-0 mt-0.5" />
            <div>
              <div className="font-heading text-base sm:text-lg text-[#FFE500] flex flex-wrap items-center gap-2">
                <span>{teamSize === 1 ? 'Solo' : 'Duo'} Registration Note</span>
                <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-[#FFE500]/20 text-[#FFE500] font-sans uppercase font-bold tracking-wider">
                  Clubbing on Event Day
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans mt-1 leading-relaxed">
                {teamSize === 1 ? 'Solo' : 'Duo'} registration is fully allowed! On the event day, <strong className="text-[#FFE500]">NST SDC X REY organisers will club you with other participants</strong> who do not have a 3rd member to form a complete 3-member team before hacking begins.
              </p>
            </div>
          </div>
        )}

        {(globalError || errors.duplicateEmail) && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-lg bg-[#FF6B6B]/15 border-2 border-[#FF6B6B]/50 text-white flex items-start gap-3 snap-anim">
            <AlertCircle className="w-5 h-5 text-[#FF6B6B] shrink-0 mt-0.5" />
            <div>
              {globalError && <div className="text-xs sm:text-sm font-semibold font-sans">{globalError}</div>}
              {errors.duplicateEmail && (
                <div className="text-xs sm:text-sm font-sans mt-1">
                  <span className="font-bold">Duplicate Email: </span>{errors.duplicateEmail}
                </div>
              )}
            </div>
          </div>
        )}

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit} 
          className={`space-y-4 sm:space-y-6 ${isSnapping ? 'snap-anim' : ''}`}
        >
          <div className="scratch-block events">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5 gap-2">
              <div className="font-heading text-lg sm:text-xl text-[#FFE500] flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFE500] shrink-0" />
                <span className="truncate">broadcast [{teamSize === 1 ? 'solo_created' : teamSize === 2 ? 'duo_created' : 'team_created'}]</span>
              </div>
              <span className="scratch-tag scratch-tag-events text-[10px] sm:text-xs shrink-0">Step 1</span>
            </div>
            <label className={label}>{teamSize === 1 ? 'Participant / Team Handle' : 'Team Name'} <span className="text-[#FF6B6B]">*</span></label>
            {renderField({ section: "teamName", field: "teamName", placeholder: teamSize === 1 ? "Enter Handle or Team Name" : "Team Name", errorKey: "teamName" })}
          </div>

          <div className="scratch-block motion">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5 gap-2">
              <div className="font-heading text-lg sm:text-xl text-[#00FFB3] flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FFB3] shrink-0" />
                <span className="truncate">{teamSize === 1 ? 'Your Details (Participant)' : 'Member 1: Team Leader'}</span>
              </div>
              <span className="scratch-tag scratch-tag-motion text-[10px] sm:text-xs shrink-0">Primary</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className={label}>Full Name <span className="text-[#FF6B6B]">*</span></label>
                {renderField({ section: "leader", field: "fullName", placeholder: "Full Name", errorKey: "leaderFullName" })}
              </div>
              <div>
                <label className={label}>Email Address <span className="text-[#FF6B6B]">*</span></label>
                {renderEmailField({ section: "leader", errorKey: "leaderEmail", placeholder: "Email Address" })}
              </div>
              <div>
                <label className={label}>Batch Name <span className="text-[#FF6B6B]">*</span></label>
                {renderField({ section: "leader", field: "batch", placeholder: "Batch Name", errorKey: "leaderBatch" })}
              </div>
              <div>
                <label className={label}>Mobile Number <span className="text-[#FF6B6B]">*</span></label>
                {renderField({ section: "leader", field: "phone", type: "tel", maxLen: 10, placeholder: "10-digit Phone", errorKey: "leaderPhone" })}
              </div>
            </div>
          </div>

          {teamSize >= 2 && (
            <div className="scratch-block looks">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5 gap-2">
                <div className="font-heading text-lg sm:text-xl text-[#FF5CE8] flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5CE8] shrink-0" />
                  <span className="truncate">Member 2 Details</span>
                </div>
                <span className="scratch-tag scratch-tag-looks text-[10px] sm:text-xs shrink-0">Member 2</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={label}>Full Name <span className="text-[#FF6B6B]">*</span></label>
                  {renderField({ section: "member2", field: "fullName", placeholder: "Full Name", errorKey: "member2FullName" })}
                </div>
                <div>
                  <label className={label}>Email Address <span className="text-[#FF6B6B]">*</span></label>
                  {renderEmailField({ section: "member2", errorKey: "member2Email", placeholder: "Email Address" })}
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Batch Name <span className="text-[#FF6B6B]">*</span></label>
                  {renderField({ section: "member2", field: "batch", placeholder: "Batch Name", errorKey: "member2Batch" })}
                </div>
              </div>
            </div>
          )}

          {teamSize >= 3 && (
            <div className="scratch-block sensing">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5 gap-2">
                <div className="font-heading text-lg sm:text-xl text-[#A78BFF] flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFF] shrink-0" />
                  <span className="truncate">Member 3 Details</span>
                </div>
                <span className="scratch-tag scratch-tag-sensing text-[10px] sm:text-xs shrink-0">Member 3</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={label}>Full Name <span className="text-[#FF6B6B]">*</span></label>
                  {renderField({ section: "member3", field: "fullName", placeholder: "Full Name", errorKey: "member3FullName" })}
                </div>
                <div>
                  <label className={label}>Email Address <span className="text-[#FF6B6B]">*</span></label>
                  {renderEmailField({ section: "member3", errorKey: "member3Email", placeholder: "Email Address" })}
                </div>
                <div className="sm:col-span-2">
                  <label className={label}>Batch Name <span className="text-[#FF6B6B]">*</span></label>
                  {renderField({ section: "member3", field: "batch", placeholder: "Batch Name", errorKey: "member3Batch" })}
                </div>
              </div>
            </div>
          )}

          <div className="text-center pt-3">
            <button
              type="submit" disabled={isSubmitting}
              className="scratch-btn scratch-btn-events text-lg sm:text-xl py-3.5 sm:py-4 px-8 sm:px-10 w-full sm:w-auto"
            >
              {isSubmitting
                ? <><Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> Compiling &amp; Snapping…</>
                : <><Sparkles className="w-5 h-5 sm:w-6 sm:h-6" /> Snap &amp; Register {teamSize === 1 ? 'Solo' : teamSize === 2 ? 'Duo' : 'Team'}</>
              }
            </button>
            <div className="text-[11px] sm:text-xs text-white/40 mt-3 font-sans">
              Hosted by <strong className="text-white/60">NST SDC X REY</strong> • Real-time duplicate email validation active
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
