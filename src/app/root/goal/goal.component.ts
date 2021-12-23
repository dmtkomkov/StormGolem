import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GoalService } from "@root/goal/goal.service";
import { IGoalPage, IWorkLog } from "@root/goal/goal.interfaces";
import { formatDate } from '@angular/common';
import { Subscription } from "rxjs";

@Component({
  selector: 'sg-work-log',
  templateUrl: 'goal.component.html',
  styleUrls: ['goal.component.scss']
})
export class GoalComponent implements OnInit, OnDestroy {
  @ViewChild('testbutton', {read: ElementRef}) private testButton: ElementRef;
  workLogs: IWorkLog[];
  workLogForm: FormGroup;
  updateFormSub: Subscription;
  workLogId: number;

  constructor(
      private formBuilder: FormBuilder,
      private goalService: GoalService
  ) {
    this.workLogId = NaN;
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

    this.updateFormSub = this.goalService.getUpdateData().subscribe((workLog) => {
      const minutes = workLog.duration % 60;
      const hours = (workLog.duration - minutes) / 60;
      console.log(hours, minutes);
      this.workLogForm.setValue({
        hours: hours,
        minutes: minutes,
        log: workLog.log,
        date: workLog.date,
        labels: workLog.labels,
      })
      console.log(workLog);
      this.workLogId = workLog.id
    })
  }

  ngOnDestroy() {
    this.updateFormSub.unsubscribe();
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

