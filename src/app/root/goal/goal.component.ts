import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GoalService } from "@root/goal/goal.service";
import { IGoalPage, ILabel, IWorkLog } from "@root/goal/goal.interfaces";
import { formatDate } from '@angular/common';
import { Subscription } from "rxjs";

interface IWorkLogForm {
  hours: number,
  minutes: number,
  log: string,
  date: string, // TODO: special type for regexp
  labels: [],
}

const DEFAULT_WORKLOG_FORM: IWorkLogForm = {
  hours: 0,
  minutes: 30,
  log: '',
  date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
  labels: [],
}

@Component({
  selector: 'sg-work-log',
  templateUrl: 'goal.component.html',
  styleUrls: ['goal.component.scss']
})
export class GoalComponent implements OnInit, OnDestroy {
  workLogs: IWorkLog[];
  workLogForm: FormGroup;
  updateFormSub: Subscription;
  workLogId: number;
  labelNames: string[];

  constructor(
    private formBuilder: FormBuilder,
    private goalService: GoalService
  ) {
    this.workLogId = NaN;
  }

  ngOnInit() {
    this.workLogForm = this.formBuilder.group(DEFAULT_WORKLOG_FORM);
    this.loadWorkLogs();
    this.loadLabels();
    this.handleUpdateForm();
  }

  private loadWorkLogs() {
    this.goalService.getGoalPage(1).subscribe(
      (goalPage: IGoalPage) => {
        this.workLogs = goalPage.results;
      }
    )
  }

  private loadLabels() {
    this.goalService.getLabels().subscribe((labels: ILabel[]) => {
      this.labelNames = labels.map(label => label.name);
    });
  }

  private handleUpdateForm() {
    this.updateFormSub = this.goalService.getUpdateData().subscribe((workLog) => {
      this.workLogId = workLog.id
      const minutes = workLog.duration % 60;
      const hours = (workLog.duration - minutes) / 60;
      this.workLogForm.setValue({
        hours: hours,
        minutes: minutes,
        log: workLog.log,
        date: workLog.date,
        labels: workLog.labels,
      })
    });
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
        this.resetForm();
        this.loadWorkLogs();
      },
    );
  }

  update() {
    const formData = this.workLogForm.value;
    const workLogData: IWorkLog = {
      id: this.workLogId,
      log: formData.log,
      duration: formData.hours * 60 + formData.minutes,
      date: formData.date,
      labels: formData.labels
    };
    this.goalService.updateWorkLog(workLogData).subscribe(
      () => {
        this.resetForm();
        this.loadWorkLogs();
      },
    );
  }

  resetForm() {
    this.workLogId = NaN;
    this.workLogForm.reset(DEFAULT_WORKLOG_FORM);
  }

  ngOnDestroy() {
    this.updateFormSub.unsubscribe();
  }
}

