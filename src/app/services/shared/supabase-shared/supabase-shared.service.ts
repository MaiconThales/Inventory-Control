import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SnackBarService } from 'src/app/services';
import { environment as e } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseSharedService {

  private supabase!: SupabaseClient;

  constructor(private snackBarService: SnackBarService, private router: Router) {
    this.supabase = createClient(e.supabaseUrl, e.supabaseKey);
  }

  singOut(): void {
    this.snackBarService.openSnackBar("Logout", "Ok");
    this.supabase.auth.signOut().then(() => {
      this.router.navigate(['/auth']);
    });
  }

  handleErrors(error: any): void {
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

  handleErrorsProfile(error: any, status: any): void {
    try {
      if (error && status !== 406) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        this.snackBarService.openSnackBar(error.message, "Ok");
      }
    }
  }

}
