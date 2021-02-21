import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sg-work-log',
  templateUrl: 'goal.component.html',
  styleUrls: ['goal.component.scss']
})
export class GoalComponent implements OnInit {
  workLogs: string[];

  constructor() { }

  ngOnInit() {
    this.workLogs = [
      'some1',
      'some2',
      'some3',
      'some4',
      'some5',
      'some6'
    ]
  }

}
