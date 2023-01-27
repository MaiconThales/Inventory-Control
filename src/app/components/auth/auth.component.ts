import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MyErrorStateMatcher } from 'src/app/components/shared';
import { MagicLinkService } from 'src/app/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isValueProgress: boolean = false;
  matcher = new MyErrorStateMatcher();
  authLogin = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private magicLinkService: MagicLinkService) { }

  ngOnInit(): void {
    this.authLogin = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email])
    });
  }

  magicLogin(): void {
    this.isValueProgress = true;
    let email = this.authLogin.controls['emailFormControl'].value as string;
    this.magicLinkService.signIn(email).then(() => {
      this.isValueProgress = false;
    }).finally(() => {
      this.authLogin.reset();
      this.authLogin.controls.emailFormControl.setErrors(null);
      this.isValueProgress = false;
    });
  }

  onSubmit(): void {
    this.magicLogin();
  }

}