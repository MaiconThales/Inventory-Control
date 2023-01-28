import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagementTokenService {

  constructor() { }

  getUserLoggedInLocalStorage(): string {
    let converted;
    let value = localStorage.getItem('sb-jwthxonnohkfgagcesku-auth-token');
    if(value != undefined) {
      converted = JSON.parse(value);
    }
    return converted;
  }

  isValid(): boolean {
    let value = this.getUserLoggedInLocalStorage();
    if(value != undefined || value != null) {
      return true;
    }
    return false;
  }

}
