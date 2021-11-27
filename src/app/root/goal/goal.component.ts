import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { GoalService } from "@root/goal/goal.service";
import { IGoalPage, IWorkLog } from "@root/goal/goal.interfaces";
import { formatDate } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { TestOverlayComponent } from '../../test-overlay/test-overlay.component';

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
    private goalService: GoalService,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    this.workLogForm = this.formBuilder.group({
      hours: 0,
      minutes: 30,
      log: '',
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      custom: null,
    });

    this.loadWorkLogs();
  }

  create() {
    const formData = this.workLogForm.value;
    const workLogData: IWorkLog = {log: formData.log, duration: formData.hours * 60 + formData.minutes, date: formData.date}
    this.goalService.createWorkLog(workLogData).subscribe(
      () => {
        this.loadWorkLogs();
        this.workLogForm.reset({
          hours: 0,
          minutes: 30,
          date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
          custom: null,
        });
      },
    );
  }

  loadWorkLogs() {
    this.goalService.getBlogPage(1).subscribe(
      (goalPage: IGoalPage) => {
        this.workLogs = goalPage.results;
      }
    )
  }

  openOverlay() {
    console.log(this.testButton);
    const overlayRef = this.overlay.create({
      width: '400px',
      height: '600px',
      // hasBackdrop: true,
      positionStrategy: this.overlay.position().flexibleConnectedTo(this.testButton).withPositions([{
        // here, top-left of the overlay is connected to bottom-left of the origin;
        // of course, you can change this object or generate it dynamically;
        // moreover, you can specify multiple objects in this array for CDK to find the most suitable option
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      } as ConnectedPosition]).withPush(false)
    });
    const x = new ComponentPortal(TestOverlayComponent);
    overlayRef.attach(x);
    overlayRef.outsidePointerEvents().subscribe(() => {
      overlayRef.detach();
    });
  }
}
