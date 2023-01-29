import { Component, OnInit } from '@angular/core';

import { ManagementTokenService, SupabaseSharedService } from 'src/app/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  showToolBar: boolean = false;

  constructor(private shared: SupabaseSharedService, private token: ManagementTokenService) { }

  ngOnInit(): void {
    this.showToolBar = this.token.isValid();
  }

  signOut(): void {
    this.shared.singOut();
    this.showToolBar = false;
  }

}
