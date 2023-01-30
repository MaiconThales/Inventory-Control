import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, SignInWithOAuthCredentials } from '@supabase/supabase-js';

import { SupabaseSharedService } from 'src/app/services';
import { environment as e } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaLoginService {

  private supabase!: SupabaseClient;

  constructor(private shared: SupabaseSharedService) {
    this.supabase = createClient(e.supabaseUrl, e.supabaseKey);
  }

  async signIn(providerLogin: any): Promise<any> {
    let { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: providerLogin
    });
    this.shared.handleErrors(error);
    return { data };
  }

}
