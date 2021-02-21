import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
      log: [ '', Validators.required ],
    });

    this.loadWorkLogs();
  }

  create() {
    this.goalService.createWorkLog(this.workLogForm.value).subscribe(
      () => this.loadWorkLogs(),
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
