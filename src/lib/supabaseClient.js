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
 * Register Team with variable member count (1, 2, or 3 members)
 * teamSize: 1 = solo, 2 = duo, 3 = trio (default)
 *
 * teams: id, team_name, team_size, registration_type, created_at
 * team_members: id, team_id, full_name, email, batch, phone, role, created_at
 */
export const registerTeam = async (formData) => {
  const { teamName, leader, member2, member3, teamSize = 3 } = formData;
  const normalizedTeamName = teamName.trim();

  // Build members list based on teamSize
  const membersList = [{ ...leader, role: 'leader' }];
  if (teamSize >= 2 && member2?.email) membersList.push({ ...member2, role: 'member' });
  if (teamSize >= 3 && member3?.email) membersList.push({ ...member3, role: 'member' });

  // Validate internal duplicates
  const emails = membersList.map(m => m.email.toLowerCase().trim());
  const uniqueEmails = new Set(emails);
  if (uniqueEmails.size !== emails.length) {
    throw new Error('Duplicate email addresses detected within your team members!');
  }

  // Registration type label
  const registrationType = teamSize === 1 ? 'solo' : teamSize === 2 ? 'duo' : 'trio';

  // ── Try Supabase ──
  if (supabase) {
    try {
      // Check team name uniqueness
      const { data: existingTeam, error: teamCheckErr } = await supabase
        .from('teams')
        .select('id')
        .ilike('team_name', normalizedTeamName)
        .maybeSingle();

      if (teamCheckErr && teamCheckErr.code !== 'PGRST116') {
        console.warn('Supabase team check warning:', teamCheckErr);
      } else if (existingTeam) {
        throw new Error(`Team name "${normalizedTeamName}" is already taken. Please choose another name.`);
      }

      // Insert Team
      const { data: teamData, error: teamErr } = await supabase
        .from('teams')
        .insert([{ team_name: normalizedTeamName }])
        .select()
        .single();

      if (teamErr) {
        if (teamErr.code === '23505') throw new Error(`Team name "${normalizedTeamName}" is already registered.`);
        throw new Error(teamErr.message || 'Failed to create team record in Supabase');
      }

      const teamId = teamData.id;

      // Insert Members
      const membersToInsert = membersList.map(m => ({
        team_id: teamId,
        full_name: m.fullName.trim(),
        email: m.email.toLowerCase().trim(),
        batch: m.batch.trim(),
        phone: m.phone ? m.phone.trim() : null,
        role: m.role
      }));

      const { data: insertedMembers, error: membersErr } = await supabase
        .from('team_members')
        .insert(membersToInsert)
        .select();

      if (membersErr) {
        await supabase.from('teams').delete().eq('id', teamId);
        if (membersErr.code === '23505') {
          throw new Error('One of the member email addresses is already registered in another team!');
        }
        throw new Error(membersErr.message || 'Failed to register team members');
      }

      return {
        success: true,
        source: 'supabase',
        teamId: teamData.id,
        teamName: normalizedTeamName,
        teamSize,
        registrationType,
        members: insertedMembers,
        registeredAt: new Date().toISOString()
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
