import { AuthPersistence } from "@/persistence/auth-persistence";

export class AuthService {
  static async signInWithEmail(email, password) {
    return AuthPersistence.signInWithEmail(email, password);
  }

  static async signUpWithEmail(email, password, name) {
    // Store provided name in user_metadata so we can greet users
    const metadata = {};
    if (name && name.trim()) {
      metadata.name = name.trim();
      metadata.full_name = name.trim();
    }
    return AuthPersistence.signUpWithEmail(email, password, metadata);
  }

  static async signOut() {
    return AuthPersistence.signOut();
  }

  static async getSession() {
    return AuthPersistence.getSession();
  }

  static onAuthStateChange(callback) {
    return AuthPersistence.onAuthStateChange(callback);
  }
}
