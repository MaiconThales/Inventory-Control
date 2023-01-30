import { Component, OnInit } from '@angular/core';

import { IconsService, SupabaseSharedService } from './services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'inventory-control';

  session = this.supabase.session;

  constructor(private supabase: SupabaseSharedService, private icon: IconsService) {}

  ngOnInit(): void {
    this.icon.createIcons();
    this.supabase.authChanges((_, session) => {
      this.session = session;
    });
  }

}
