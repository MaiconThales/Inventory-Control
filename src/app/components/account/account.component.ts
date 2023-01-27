import { Component, Input, OnInit } from '@angular/core';
import { AuthSession } from '@supabase/supabase-js';

import { Profile } from 'src/app/models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() session!: AuthSession;

  profile!: Profile;

  constructor() { }

  ngOnInit(): void {
  }

}
