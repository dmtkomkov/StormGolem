import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GoalService } from "@root/goal/goal.service";
import { IGoalPage, ILabel, IWorkLog } from "@root/goal/goal.interfaces";
import { formatDate } from '@angular/common';
import { EMPTY, Subject, Subscription } from "rxjs";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { catchError, distinctUntilChanged, mergeMap } from "rxjs/operators";

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
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport: CdkVirtualScrollViewport;
  workLogs: IWorkLog[];
  workLogForm: FormGroup;
  updateFormSub: Subscription;
  newPageSub: Subscription;
  workLogId: number;
  labelNames: string[];
  pageCount: number;
  nextPage$ = new Subject<number>();

  constructor(
    private formBuilder: FormBuilder,
    private goalService: GoalService
  ) {
    this.workLogId = NaN;
    this.workLogs = [];
    this.pageCount = 0;
  }

  ngOnInit() {
    this.workLogForm = this.formBuilder.group(DEFAULT_WORKLOG_FORM);
    this.loadLabels();
    this.handleUpdate();
    this.handleNextPage();
  }

  private loadFirstPage() {
    this.goalService.getGoalPage(1).subscribe(
      (goalPage: IGoalPage) => {
        this.workLogs = goalPage.results;
        this.pageCount = 1;
      }
    )
  }

  private handleNextPage() {
    this.newPageSub = this.nextPage$.pipe(
      distinctUntilChanged(),
      mergeMap((nextPageNumber: number) => this.goalService.getGoalPage(nextPageNumber).pipe(
        catchError(() => EMPTY), // TODO: ensure 404 error
      )),
    ).subscribe((goalPage: IGoalPage) => {
      this.workLogs = [...this.workLogs, ...goalPage.results];
      this.pageCount++;
    });
  }

  onScroll() {
    if (this.viewport.measureScrollOffset('bottom') < 200) {
      this.nextPage$.next(this.pageCount + 1);
    }
  }

  private loadLabels() {
    this.goalService.getLabels().subscribe((labels: ILabel[]) => {
      this.labelNames = labels.map(label => label.name);
    });
  }

  private handleUpdate() {
    this.updateFormSub = this.goalService.getUpdateData().subscribe((workLog) => {
      this.viewport.scrollToIndex(0);
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
        this.loadFirstPage();
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
        this.loadFirstPage();
      },
    );
  }

  private resetForm() {
    this.workLogId = NaN;
    this.workLogForm.reset(DEFAULT_WORKLOG_FORM);
  }

  cancelForm() {
    this.resetForm();
  }

  ngOnDestroy() {
    this.updateFormSub.unsubscribe();
    this.newPageSub.unsubscribe();
  }
}

