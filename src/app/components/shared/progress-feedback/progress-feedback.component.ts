import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-feedback',
  templateUrl: './progress-feedback.component.html',
  styleUrls: ['./progress-feedback.component.scss']
})
export class ProgressFeedbackComponent implements OnInit {

  @Input() isShown: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
