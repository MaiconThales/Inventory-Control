import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthSession, createClient, Session, SupabaseClient, User } from '@supabase/supabase-js'

import { environment as e } from 'src/environments/environment';
import { Profile } from 'src/app/models';
import { SnackBarService } from 'src/app/services';


@Injectable({
  providedIn: 'root'
})
export class MagicLinkService {

  private supabase!: SupabaseClient;
  _session: AuthSession | null = null;

  constructor(private snackBarService: SnackBarService) {
    this.supabase = createClient(e.supabaseUrl, e.supabaseKey);
  }

  get session(): AuthSession | null {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });

    return this._session
  }

  async getSession(): Promise<any> {
    return this.supabase.auth.getSession();
  }

  async profile(user: User): Promise<any> {
    let { data, error, status } = await this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
    try {
      if (error && status !== 406) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        this.snackBarService.openSnackBar(error.message, "Ok");
      }
    }
    return { data, error, status };
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void): any {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async signIn(email: string): Promise<string | undefined> {
    let info = await this.supabase.auth.signInWithOtp({ email });
    if (info.error?.message != undefined) {
      this.snackBarService.openSnackBar(info.error?.message, "Ok");
    } else {
      this.snackBarService.openSnackBar("E-mail send", "Ok");
    }
    return info.error?.message;
  }

  async signOut(): Promise<any> {
    this.snackBarService.openSnackBar("Logout", "Ok");
    return await this.supabase.auth.signOut();
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

}