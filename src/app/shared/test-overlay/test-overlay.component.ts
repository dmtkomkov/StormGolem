import { Component, Inject, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OverlayManagerRef } from '../../modal2/sg-overlay-manager-ref';
import { SG_OVERLAY_DATA } from '../../modal2/sg-overlay.service';

const ANIMATION_TIMINGS = '200ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'sg-test-overlay',
  templateUrl: './test-overlay.component.html',
  styleUrls: ['./test-overlay.component.scss'],
  animations: [
    trigger('fade', [
      state('fadeOut', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('* => fadeIn', animate(ANIMATION_TIMINGS))
    ]),
    trigger('slideContent', [
      state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
      state('enter', style({ transform: 'none', opacity: 1 })),
      state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ])
  ]
})
export class TestOverlayComponent implements OnInit {
  animationState: 'void' | 'enter' | 'leave' = 'enter';

  constructor(
      private dialogRef: OverlayManagerRef,
      @Inject(SG_OVERLAY_DATA) public options: string[]
  ) { }

  ngOnInit(): void {
  }

  selectOption(option: string) {
    console.log(option);
    this.dialogRef.close();
  }

}
