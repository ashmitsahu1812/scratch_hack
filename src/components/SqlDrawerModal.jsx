import React, { useState } from 'react';
import { Database, Copy, Check, X, Key, Globe, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { getSupabaseStatus, updateSupabaseCredentials, getLocalRegistrationsCount } from '../lib/supabaseClient';
import { scratchAudio } from '../lib/soundEffects';

const SQL_SCHEMA = `-- Drop old structures if resetting
drop view if exists public.team_registrations cascade;
drop table if exists public.team_members cascade;
drop table if exists public.teams cascade;
drop table if exists public.team_registrations cascade;

-- Single Table: 1 Row Per Team
create table public.team_registrations (
    id uuid default gen_random_uuid() primary key,
    team_name text not null unique,
    team_size integer not null default 3,
    registration_type text not null default 'trio',
    
    -- Leader / Member 1
    leader_name text not null,
    leader_email text not null,
    leader_batch text not null,
    leader_phone text not null,
    
    -- Member 2 (Optional)
    member2_name text null,
    member2_email text null,
    member2_batch text null,
    
    -- Member 3 (Optional)
    member3_name text null,
    member3_email text null,
    member3_batch text null,
    
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.team_registrations enable row level security;

-- Policies for public registration insertion and checking
create policy "Allow public to insert team registrations" 
on public.team_registrations for insert 
with check (true);

create policy "Allow public to read team registrations" 
on public.team_registrations for select 
using (true);

-- Trigger to prevent ANY duplicate member email across all rows & columns
create or replace function check_no_duplicate_member_emails()
returns trigger as $$
declare
    dup_email text;
begin
    with new_emails as (
        select lower(trim(new.leader_email)) as email
        union all
        select lower(trim(new.member2_email)) where new.member2_email is not null and trim(new.member2_email) <> ''
        union all
        select lower(trim(new.member3_email)) where new.member3_email is not null and trim(new.member3_email) <> ''
    )
    select ne.email into dup_email
    from new_emails ne
    where exists (
        select 1 from public.team_registrations t
        where (t.id is distinct from new.id)
          and (
            lower(trim(t.leader_email)) = ne.email
            or lower(trim(coalesce(t.member2_email, ''))) = ne.email
            or lower(trim(coalesce(t.member3_email, ''))) = ne.email
          )
    )
    limit 1;

    if dup_email is not null then
        raise exception 'Email "%" is already registered in another team. Duplicate members are not allowed.', dup_email;
    end if;

    return new;
end;
$$ language plpgsql;

create or replace trigger trg_check_no_duplicate_emails
before insert or update on public.team_registrations
for each row execute function check_no_duplicate_member_emails();`;

export default function SqlDrawerModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState(localStorage.getItem('SCRATCH_SUPABASE_URL') || '');
  const [customKey, setCustomKey] = useState(localStorage.getItem('SCRATCH_SUPABASE_ANON_KEY') || '');
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const status = getSupabaseStatus();
  const localCount = getLocalRegistrationsCount();

  const handleCopySql = () => {
    scratchAudio.playSnap();
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveKeys = (e) => {
    e.preventDefault();
    scratchAudio.playSnap();

    if (customUrl.trim() && customKey.trim()) {
      updateSupabaseCredentials(customUrl.trim(), customKey.trim());
      setStatusMsg('Supabase API credentials updated successfully!');
    } else {
      updateSupabaseCredentials('', '');
      setStatusMsg('Cleared Supabase credentials. Reverted to Local Demo Storage.');
    }

    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="modal-overlay">
      <div className="scratch-block sensing snap-anim max-w-3xl w-full bg-[#151C2D] border-2 border-[#5CB1D6]/40 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            scratchAudio.playSnap();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-[#26354F] pb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#5CB1D6]/20 text-[#5CB1D6] flex items-center justify-center border border-[#5CB1D6]/40 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-white">
              Supabase Database Setup & Schema
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Run this SQL script in your Supabase SQL Editor to initialize tables and RLS policies.
            </p>
          </div>
        </div>

        {/* Database Status Indicator Card */}
        <div className="mb-6 p-4 rounded-xl bg-[#0E1422] border border-[#2A364F] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${status.isConfigured ? 'bg-[#59C059]' : 'bg-[#FFAB19]'}`} />
            <span className="text-slate-300">Active Connection:</span>
            <span className="text-white font-bold">{status.isConfigured ? 'Supabase Database' : 'Local Demo Database (localStorage)'}</span>
          </div>

          <div className="text-slate-400">
            Local Registrations: <span className="text-[#FFAB19] font-bold">{localCount}</span>
          </div>
        </div>

        {/* SQL Schema Copy Box */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between">
            <label className="text-xs font-heading font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#FFAB19]" /> Supabase SQL Schema Script
            </label>
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4C97FF] hover:bg-[#3373CC] text-white text-xs font-heading font-bold transition-all shadow"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied SQL Script!' : 'Copy SQL Schema'}
            </button>
          </div>

          <pre className="bg-[#090D16] p-4 rounded-xl border border-[#232F47] text-xs font-code text-slate-300 overflow-x-auto max-h-64 leading-relaxed">
            {SQL_SCHEMA}
          </pre>
        </div>

        {/* Optional Live Supabase Keys Configuration Form */}
        <form onSubmit={handleSaveKeys} className="bg-[#0E1422] p-5 rounded-2xl border border-[#26354F] space-y-4">
          <div className="font-heading font-bold text-base text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-[#FFBF00]" />
            Connect Live Supabase Instance (Optional)
          </div>

          {statusMsg && (
            <div className="p-3 rounded-lg bg-[#59C059]/20 border border-[#59C059]/40 text-[#59C059] text-xs font-semibold">
              {statusMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 font-sans mb-1">
                Project URL (VITE_SUPABASE_URL)
              </label>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="scratch-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 font-sans mb-1">
                Anon API Key (VITE_SUPABASE_ANON_KEY)
              </label>
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                className="scratch-input text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="scratch-btn scratch-btn-events text-xs py-2 px-5"
            >
              Save Credentials & Reload
            </button>

            <span className="text-[11px] text-slate-400 font-sans">
              Credentials are stored securely in browser localStorage.
            </span>
          </div>
        </form>

      </div>
    </div>
  );
}
