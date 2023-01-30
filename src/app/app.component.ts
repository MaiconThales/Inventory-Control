import { Component, OnInit } from '@angular/core';

import { SupabaseSharedService } from './services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'inventory-control';

  session = this.supabase.session;

  constructor(private supabase: SupabaseSharedService) { }

  ngOnInit(): void {
    this.supabase.authChanges((_, session) => {
      this.session = session;
    });
  }


}
