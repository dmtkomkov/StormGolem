import { Component, Input, OnInit } from '@angular/core';
import { IDateLog } from "@root/goal/goal.interfaces";

@Component({
  selector: 'sg-goal-row',
  templateUrl: 'goal-row.component.html',
  styleUrls: ['goal-row.component.scss']
})
export class GoalRowComponent implements OnInit {
  @Input() dateLog: IDateLog;

  constructor() { }

  ngOnInit() {

  }

}
