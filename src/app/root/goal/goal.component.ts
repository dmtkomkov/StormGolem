import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GoalService } from "@root/goal/goal.service";
import { IGoalPage, ILabel, IWorkLog } from "@root/goal/goal.interfaces";
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
  labelNames: string[];
  editWorklogId: number = NaN;

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
      labels: [],
    });

    this.loadWorkLogs();
    this.loadLabels();

    this.updateFormSub = this.goalService.getUpdateData().subscribe((workLog) => {
      console.log(workLog);
      this.editWorklogId = workLog.id;
      const minutes = workLog.duration % 60;
      const hours = (workLog.duration - minutes) / 60;
      this.workLogForm.setValue({
        hours: hours,
        minutes: minutes,
        log: workLog.log,
        date: workLog.date,
        labels: workLog.labels,
      })
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
    this.goalService.createWorkLog(workLogData).subscribe(
        () => {
          this.loadWorkLogs();
          this.workLogForm.reset({
            hours: 0,
            minutes: 30,
            date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
            labels: [],
          });
        },
    );
  }

  update() {
    const formData = this.workLogForm.value;
    const workLogData: IWorkLog = {
      id: this.editWorklogId,
      log: formData.log,
      duration: formData.hours * 60 + formData.minutes,
      date: formData.date,
      labels: formData.labels
    };
    this.goalService.updateWorkLog(workLogData).subscribe(
      () => {
        this.loadWorkLogs();
        this.editWorklogId = NaN;
        this.workLogForm.reset({
          hours: 0,
          minutes: 30,
          date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
          labels: [],
        });
      },
    );
  }

  cancel() {
    this.editWorklogId = NaN;
    this.workLogForm.reset({
      hours: 0,
      minutes: 30,
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      labels: [],
    });
  }

  loadWorkLogs() {
    this.goalService.getGoalPage(1).subscribe(
        (goalPage: IGoalPage) => {
          this.workLogs = goalPage.results;
        }
    )
  }

  loadLabels() {
    this.goalService.getLabels().subscribe((labels: ILabel[]) => {
      this.labelNames = labels.map(label => label.name);
    });
  }
}

