import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSession } from '@supabase/supabase-js';

import { Profile } from 'src/app/models';
import { MagicLinkService } from 'src/app/services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  //@Input() session!: AuthSession;

  profile!: Profile;
  updateProfileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    website: new FormControl(''),
    avatar_url: new FormControl('')
  });

  constructor(private magicLinkService: MagicLinkService, private router: Router) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    //let { user } = this.session;
    /*this.magicLinkService.profile(user).then((info) => {
      this.profile = info.data;
      console.log("Result: ", this.profile)
    });*/
  }

  signOut(): void {
    this.magicLinkService.signOut().then(() => {}).finally(() => {
      this.router.navigate(['/auth']);
    });
  }

}
