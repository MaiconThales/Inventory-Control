import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js'

import { environment as e } from 'src/environments/environment';
import { Profile } from 'src/app/models';
import { SnackBarService, SupabaseSharedService } from 'src/app/services';


@Injectable({
  providedIn: 'root'
})
export class MagicLinkService {

  private supabase!: SupabaseClient;

  constructor(private snackBarService: SnackBarService, private shared: SupabaseSharedService) {
    this.supabase = createClient(e.supabaseUrl, e.supabaseKey);
  }

  async profile(user: User): Promise<any> {
    let { data, error, status } = await this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
    this.shared.handleErrorsProfile(error, status);
    return { data, error, status };
  }

  async signIn(email: string): Promise<string | undefined> {
    let info = await this.supabase.auth.signInWithOtp({
      email
    });
    if (info.error?.message != undefined) {
      this.snackBarService.openSnackBar(info.error?.message, "Ok");
    } else {
      this.snackBarService.openSnackBar("E-mail send", "Ok");
    }
    return info.error?.message;
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