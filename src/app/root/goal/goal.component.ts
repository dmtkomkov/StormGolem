import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GoalService } from "@root/goal/goal.service";
import { IGoalPage, IWorkLog } from "@root/goal/goal.interfaces";
import { formatDate } from '@angular/common';

@Component({
  selector: 'sg-work-log',
  templateUrl: 'goal.component.html',
  styleUrls: ['goal.component.scss']
})
export class GoalComponent implements OnInit {
  @ViewChild('testbutton', {read: ElementRef}) private testButton: ElementRef;
  workLogs: IWorkLog[];
  workLogForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private goalService: GoalService
  ) {
  }

  ngOnInit() {
    this.workLogForm = this.formBuilder.group({
      hours: 0,
      minutes: 30,
      log: '',
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      labels: null,
    });

    this.loadWorkLogs();
    this.goalService.getLabelTable().subscribe(data => console.log(data));
  }

  create() {
    const formData = this.workLogForm.value;
    const workLogData: IWorkLog = {
      log: formData.log,
      duration: formData.hours * 60 + formData.minutes,
      date: formData.date,
      labels: formData.labels
    }
    console.log(workLogData);
    this.goalService.createWorkLog(workLogData).subscribe(
        () => {
          this.loadWorkLogs();
          this.workLogForm.reset({
            hours: 0,
            minutes: 30,
            date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
            labels: null,
          });
        },
    );
  }

  loadWorkLogs() {
    this.goalService.getGoalPage(1).subscribe(
        (goalPage: IGoalPage) => {
          this.workLogs = goalPage.results;
        }
    )
  }
}

