import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GoalService } from "@root/goal/goal.service";
import { IGoalPage, IWorkLog } from "@root/goal/goal.interfaces";

@Component({
  selector: 'sg-work-log',
  templateUrl: 'goal.component.html',
  styleUrls: ['goal.component.scss']
})
export class GoalComponent implements OnInit {
  workLogs: IWorkLog[];
  workLogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private goalService: GoalService,
  ) { }

  ngOnInit() {
    this.workLogForm = this.formBuilder.group({
      hours: 0,
      minutes: 30,
      log: '',
    });

    this.loadWorkLogs();
  }

  create() {
    const formData = this.workLogForm.value;
    const workLogData: IWorkLog = {log: formData.log, duration: formData.hours * 60 + formData.minutes}
    this.goalService.createWorkLog(workLogData).subscribe(
      () => {
        this.loadWorkLogs();
        this.workLogForm.reset({ hours: 0, minutes: 30 });
      },
    );
  }

  loadWorkLogs() {
    this.goalService.getBlogPage(1).subscribe(
      (goalPage: IGoalPage) => {
        this.workLogs = goalPage.results
      }
    )
  }
}
