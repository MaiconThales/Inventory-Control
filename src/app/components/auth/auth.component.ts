import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MyErrorStateMatcher } from 'src/app/components/shared';
import { EmailPasswordService, MagicLinkService } from 'src/app/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isValueProgress: boolean = false;
  hide: boolean = true;
  matcher = new MyErrorStateMatcher();
  magicAuthLogin = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email])
  });
  classicAuthLogin = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required])
  });

  constructor(
    private magicLinkService: MagicLinkService, 
    private emailPasswordService: EmailPasswordService,
    private router: Router) { }

  ngOnInit(): void {
    let local = localStorage.getItem('@app-stock:user');
    if(local != undefined) {
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  magicLogin(): void {
    this.isValueProgress = true;
    let email = this.magicAuthLogin.controls['emailFormControl'].value as string;
    this.magicLinkService.signIn(email).then(() => {
      this.isValueProgress = false;
    }).finally(() => {
      this.magicAuthLogin.reset();
      this.magicAuthLogin.controls.emailFormControl.setErrors(null);
      this.isValueProgress = false;
    });
  }

  createUserClassic(): void {
    this.isValueProgress = true;
    let email = this.classicAuthLogin.controls['emailFormControl'].value as string;
    let password = this.classicAuthLogin.controls['passwordFormControl'].value as string;
    this.emailPasswordService.signUp(email, password).then((value) => {
      this.isValueProgress = false;
    });

  }

  onSubmitMagicLogin(): void {
    this.magicLogin();
  }

  onSubmitClassic(): void {
    let email = this.classicAuthLogin.controls['emailFormControl'].value as string;
    let password = this.classicAuthLogin.controls['passwordFormControl'].value as string;
    this.emailPasswordService.signIn(email, password).then((value) => {
      if(value.data.user != null) {
         localStorage.setItem('@app-stock:user', value.data.user.email);
         this.router.navigateByUrl('/admin/dashboard');
      }
    }).finally(() => {
      this.classicAuthLogin.reset();
      this.classicAuthLogin.controls.emailFormControl.setErrors(null);
      this.classicAuthLogin.controls.passwordFormControl.setErrors(null);
    });
  }

}