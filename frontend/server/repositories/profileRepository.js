import { getSupabaseAdminClient } from '../services/supabaseService.js'

export function createProfile(profile) {
  return getSupabaseAdminClient().from('profiles').insert(profile)
}
