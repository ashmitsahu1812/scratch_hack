import { createClient } from '@supabase/supabase-js';

// Default / stored Supabase config
const getStoredConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('SCRATCH_SUPABASE_URL') || '';
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('SCRATCH_SUPABASE_ANON_KEY') || '';
  return { url, key };
};

let { url: currentUrl, key: currentKey } = getStoredConfig();
export let supabase = (currentUrl && currentKey) ? createClient(currentUrl, currentKey) : null;

export const updateSupabaseCredentials = (url, key) => {
  if (url && key) {
    localStorage.setItem('SCRATCH_SUPABASE_URL', url);
    localStorage.setItem('SCRATCH_SUPABASE_ANON_KEY', key);
    supabase = createClient(url, key);
    return true;
  } else {
    localStorage.removeItem('SCRATCH_SUPABASE_URL');
    localStorage.removeItem('SCRATCH_SUPABASE_ANON_KEY');
    supabase = null;
    return false;
  }
};

export const getSupabaseStatus = () => {
  const { url, key } = getStoredConfig();
  return {
    isConfigured: !!(url && key),
    url: url || 'Not Configured (Using Local Demo Storage)'
  };
};

/**
 * Register Team with 1 row per team (team_name, leader details, member2 details, member3 details)
 * teamSize: 1 = solo, 2 = duo, 3 = trio (default)
 *
 * Table: team_registrations
 */
export const registerTeam = async (formData) => {
  const { teamName, leader, member2, member3, teamSize = 3 } = formData;
  const normalizedTeamName = teamName.trim();
  const registrationType = teamSize === 1 ? 'solo' : teamSize === 2 ? 'duo' : 'trio';

  // Build members list for confirmation badge return
  const membersList = [{
    role: 'leader',
    fullName: leader.fullName.trim(),
    email: leader.email.toLowerCase().trim(),
    batch: leader.batch.trim(),
    phone: leader.phone ? leader.phone.trim() : null
  }];

  if (teamSize >= 2 && member2?.fullName && member2?.email) {
    membersList.push({
      role: 'member',
      fullName: member2.fullName.trim(),
      email: member2.email.toLowerCase().trim(),
      batch: member2.batch ? member2.batch.trim() : ''
    });
  }

  if (teamSize >= 3 && member3?.fullName && member3?.email) {
    membersList.push({
      role: 'member',
      fullName: member3.fullName.trim(),
      email: member3.email.toLowerCase().trim(),
      batch: member3.batch ? member3.batch.trim() : ''
    });
  }

  // Validate internal duplicates
  const emails = membersList.map(m => m.email.toLowerCase().trim());
  const uniqueEmails = new Set(emails);
  if (uniqueEmails.size !== emails.length) {
    throw new Error('Duplicate email addresses detected within your team members!');
  }

  // 1 Single Flat Row for this Team
  const teamRow = {
    team_name: normalizedTeamName,
    team_size: teamSize,
    registration_type: registrationType,
    leader_name: leader.fullName.trim(),
    leader_email: leader.email.toLowerCase().trim(),
    leader_batch: leader.batch.trim(),
    leader_phone: leader.phone ? leader.phone.trim() : null,
    member2_name: (teamSize >= 2 && member2?.fullName) ? member2.fullName.trim() : null,
    member2_email: (teamSize >= 2 && member2?.email) ? member2.email.toLowerCase().trim() : null,
    member2_batch: (teamSize >= 2 && member2?.batch) ? member2.batch.trim() : null,
    member3_name: (teamSize >= 3 && member3?.fullName) ? member3.fullName.trim() : null,
    member3_email: (teamSize >= 3 && member3?.email) ? member3.email.toLowerCase().trim() : null,
    member3_batch: (teamSize >= 3 && member3?.batch) ? member3.batch.trim() : null
  };

  // ── Try Supabase ──
  if (supabase) {
    try {
      // Check team name uniqueness
      const { data: existingTeam, error: teamCheckErr } = await supabase
        .from('team_registrations')
        .select('id')
        .ilike('team_name', normalizedTeamName)
        .maybeSingle();

      if (teamCheckErr && teamCheckErr.code !== 'PGRST116') {
        console.warn('Supabase team check warning:', teamCheckErr);
      } else if (existingTeam) {
        throw new Error(`Team name "${normalizedTeamName}" is already taken. Please choose another name.`);
      }

      // Check for duplicate emails across existing teams in the database
      const emailsToCheck = [
        leader.email.toLowerCase().trim(),
        (teamSize >= 2 && member2?.email) ? member2.email.toLowerCase().trim() : null,
        (teamSize >= 3 && member3?.email) ? member3.email.toLowerCase().trim() : null
      ].filter(Boolean);

      for (const email of emailsToCheck) {
        const { data: dupData } = await supabase
          .from('team_registrations')
          .select('team_name, leader_email, member2_email, member3_email')
          .or(`leader_email.ilike.${email},member2_email.ilike.${email},member3_email.ilike.${email}`)
          .limit(1)
          .maybeSingle();

        if (dupData) {
          throw new Error(`Email "${email}" is already registered with team "${dupData.team_name}". Each participant can only be in one team!`);
        }
      }

      // Insert the 1 single row for the team
      const { data: insertedTeam, error: insertErr } = await supabase
        .from('team_registrations')
        .insert([teamRow])
        .select()
        .single();

      if (insertErr) {
        if (insertErr.code === '23505') {
          throw new Error(`Team name or email is already registered.`);
        }
        throw new Error(insertErr.message || 'Failed to insert team registration record');
      }

      return {
        success: true,
        source: 'supabase',
        teamId: insertedTeam?.id || 'registered',
        teamName: normalizedTeamName,
        teamSize,
        registrationType,
        members: membersList,
        registeredAt: insertedTeam?.created_at || new Date().toISOString()
      };
    } catch (err) {
      console.error('Supabase registration failed:', err);
      throw err;
    }
  }

  throw new Error('Supabase is not configured.');
};

export const getLocalRegistrationsCount = () => {
  try {
    const list = JSON.parse(localStorage.getItem('scratch_hack_registrations') || '[]');
    return list.length;
  } catch { return 0; }
};
