import { supabaseClient } from "../../supabase";

export class AuthPersistence {
  static async signInWithEmail(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  static async signUpWithEmail(email, password, metadata) {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: metadata || {} },
    });
    return { data, error };
  }

  static async signOut() {
    const { error } = await supabaseClient.auth.signOut();
    return { error };
  }

  static async getSession() {
    const { data, error } = await supabaseClient.auth.getSession();
    return { data, error };
  }

  static onAuthStateChange(callback) {
    return supabaseClient.auth.onAuthStateChange(callback);
  }
}

