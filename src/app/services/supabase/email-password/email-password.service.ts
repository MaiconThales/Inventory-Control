import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment as e } from 'src/environments/environment';
import { SnackBarService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  private supabase!: SupabaseClient;

  constructor(private snackBarService: SnackBarService) {
    this.supabase = createClient(e.supabaseUrl, e.supabaseKey)
  }

  async signUp(email: string, password: string): Promise<any> {
    let { data, error } = await this.supabase.auth.signUp({
      email, password
    });
    this.handleErrors(error);
    return { data };
  }

  async signIn(email: string, password: string): Promise<any> {
    let { data, error } = await this.supabase.auth.signInWithPassword({
      email, password
    });
    this.handleErrors(error);
    return { data };
  }

  singOut() {
    return this.supabase.auth.signOut();
  }

  private handleErrors(error: any): void {
    try {
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        this.snackBarService.openSnackBar(error.message, "Ok");
      }
    }
  }

}
