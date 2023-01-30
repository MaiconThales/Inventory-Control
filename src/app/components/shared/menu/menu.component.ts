import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { ManagementTokenService, SupabaseSharedService } from 'src/app/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  showToolBar: boolean = false;
  toggleMenu: boolean = true;

  constructor(
    private shared: SupabaseSharedService,
    private token: ManagementTokenService,
    private router: Router) { }

  ngOnInit(): void {
    this.showToolBar = this.token.isValid();
  }

  toogleMenu(): void {
    this.toggleMenu = !this.toggleMenu;
  }

  redirecTo(type: string): void {
    switch (type) {
      case 'dashboard':
        this.router.navigateByUrl('admin/dashboard');
        break;
      case 'account':
        this.router.navigateByUrl('account');
        break;
    }
  }

  signOut(): void {
    this.shared.singOut();
    this.showToolBar = false;
  }

}
