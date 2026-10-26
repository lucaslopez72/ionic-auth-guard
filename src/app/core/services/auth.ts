import { Injectable, computed, signal } from '@angular/core';

export interface UserSession {
  username: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'DAM2_AUTH_SESSION';

  private readonly _currentUser = signal<UserSession | null>(
    this.readSessionFromStorage()
  );

  public readonly currentUser = this._currentUser.asReadonly();

  public readonly isAuthenticated = computed(
    () => this._currentUser()?.isAuthenticated ?? false
  );

  public login(user: string, pass: string): boolean {
    if (pass !== '123') {
      return false;
    }

    let role: UserSession['role'];

    if (user === 'admin') {
      role = 'admin';
    } else if (user === 'operador') {
      role = 'user';
    } else {
      return false;
    }

    const session: UserSession = {
      username: user,
      role,
      isAuthenticated: true
    };

    sessionStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(session)
    );

    this._currentUser.set(session);

    return true;
  }

  public logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this._currentUser.set(null);
  }

  private readSessionFromStorage(): UserSession | null {
    const data = sessionStorage.getItem(this.STORAGE_KEY);

    if (!data) {
      return null;
    }

    try {
      const session: unknown = JSON.parse(data);

      if (
        typeof session === 'object' &&
        session !== null &&
        'username' in session &&
        typeof session.username === 'string' &&
        'role' in session &&
        (session.role === 'admin' || session.role === 'user') &&
        'isAuthenticated' in session &&
        session.isAuthenticated === true
      ) {
        return {
          username: session.username,
          role: session.role,
          isAuthenticated: true
        };
      }
    } catch {
      // Si los datos no son un JSON válido, elimino la sesión.
    }

    sessionStorage.removeItem(this.STORAGE_KEY);
    return null;
  }
}