import { Component, OnInit } from '@angular/core';

import { MagicLinkService } from './services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'inventory-control';

  session = this.magicLinkService.session;

  constructor(private magicLinkService: MagicLinkService) { }

  ngOnInit(): void {
    this.magicLinkService.authChanges((_, session) => {
      this.session = session;
    });
  }


}
