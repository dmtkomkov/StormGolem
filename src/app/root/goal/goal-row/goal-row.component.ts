import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IDateLog } from "@root/goal/goal.interfaces";
import { DropList } from "@shared/drop-list/drop-list.component";
import { OverlayService } from "../../../modal2/sg-overlay.service";
import { OverlayManager } from "../../../modal2/sg-overlay-manager";
import { ConnectedPosition, Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { GoalService } from "@root/goal/goal.service";

@Component({
  selector: 'sg-goal-row',
  templateUrl: 'goal-row.component.html',
  styleUrls: ['goal-row.component.scss']
})
export class GoalRowComponent implements OnInit {
  @ViewChild('menuButton', { read: ElementRef }) private menuButton: ElementRef;
  @Input() dateLog: IDateLog;
  @Input() date: string;
  menu: OverlayManager;

  constructor(
    private overlayService: OverlayService,
    private overlay: Overlay,
    private goalService: GoalService,
  ) { }

  ngOnInit() {

  }

  showMenu() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.menuButton)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      } as ConnectedPosition])
    // .withPush(false)

    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      positionStrategy
    });

    this.menu = this.overlayService.open<DropList, string[]>(DropList, overlayConfig, ['edit', 'delete'])
    this.menu.afterClosed().subscribe((action: string) => {
      if (action === 'edit') {
        this.goalService.sendUpdateData({ ...this.dateLog, date: this.date });
      } else if (action === 'delete') {
        this.goalService.sendDeleteId(this.dateLog.id);
      }
    })
  }

}
