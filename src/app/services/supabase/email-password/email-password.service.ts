import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment as e } from 'src/environments/environment';
import { SnackBarService, SupabaseSharedService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  private supabase!: SupabaseClient;

  constructor(private shared: SupabaseSharedService) {
    this.supabase = createClient(e.supabaseUrl, e.supabaseKey)
  }

  async signUp(email: string, password: string): Promise<any> {
    let { data, error } = await this.supabase.auth.signUp({
      email, password
    });
    this.shared.handleErrors(error);
    return { data };
  }

  async signIn(email: string, password: string): Promise<any> {
    let { data, error } = await this.supabase.auth.signInWithPassword({
      email, password
    });
    this.shared.handleErrors(error);
    return { data };
  }

}
