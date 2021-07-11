import { Component, Input, OnInit } from '@angular/core';
import { IDateLog } from "@root/goal/goal.interfaces";
import { MainMenuComponent } from "@shared/dialogs/main-menu/main-menu.component";
import { EAnimation } from "@interfaces";
import { ModalService } from "@modal/modal.service";

@Component({
  selector: 'sg-goal-row',
  templateUrl: 'goal-row.component.html',
  styleUrls: ['goal-row.component.scss']
})
export class GoalRowComponent implements OnInit {
  @Input() dateLog: IDateLog;

  constructor(
    private dialog: ModalService,
  ) { }

  ngOnInit() {

  }

  showMenu(e) {
    const width: number = 200;
    this.dialog.open(MainMenuComponent, {
      animation: EAnimation.SLIDE,
      x: e.clientX - width,
      y: e.clientY,
      width: width,
      height: 100
    });
  }

}
