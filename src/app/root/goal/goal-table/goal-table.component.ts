import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IGoalTable, IWorkLog } from "@root/goal/goal.interfaces";

@Component({
  selector: 'sg-goal-table',
  templateUrl: 'goal-table.component.html',
  styleUrls: ['goal-table.component.scss']
})
export class GoalTableComponent implements OnInit, OnChanges {
  @Input() workLogs: IWorkLog[];
  goalTable: IGoalTable;
  sortedDates: string[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.buildGoalTable();
  }

  private buildGoalTable() {
    this.goalTable = this.workLogs.reduce((result, workLog: IWorkLog) => {
      const workLogNoDate: IWorkLog = { ...workLog  }
      const date = workLogNoDate.date;
      delete workLogNoDate.date;
      result[date] = result[date] || [];
      result[date].push(workLogNoDate);
      return result;
    }, {});
    this.sortedDates = Object.keys(this.goalTable).sort();
    this.sortedDates.reverse();
  }

}
