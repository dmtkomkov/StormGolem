import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR } from "@angular/forms";
import { ConnectedPosition, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { DropList } from '../test-overlay/drop-list.component';
import { OverlayService } from '../../modal2/sg-overlay.service';
import { OverlayManager } from '../../modal2/sg-overlay-manager-ref';

@Component({
  selector: 'sg-tag-input',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
  }],
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements ControlValueAccessor {
  @ViewChild('dropListTarget', {read: ElementRef}) private testButton: ElementRef;
  public innerValue: string[] = [];
  dropList: OverlayManager;
  onChange = (_value: string[]) => {}
  onTouched = () => {}

  constructor(
      private overlay: Overlay,
      private overlayService: OverlayService
  ) { }

  writeValue(value: string[]): void {
    if (value === null || value === undefined) {
      this.innerValue = [];
    } else {
      this.innerValue = this.innerValue.concat(value);
    }
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  };

  openDropList() {
    const positionStrategy = this.overlay.position()
        .flexibleConnectedTo(this.testButton)
        .withPositions([{
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        } as ConnectedPosition])
        .withPush(false)

    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      positionStrategy
    });

    this.dropList = this.overlayService.open<DropList, string[]>(DropList, overlayConfig, ['home', 'work', 'hobby', 'health'])
    this.dropList.afterClosed().subscribe(data => {
      this.writeValue([data]);
      this.onChange(this.innerValue);
    })
  }
}
