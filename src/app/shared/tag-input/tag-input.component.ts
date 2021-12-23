import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR } from "@angular/forms";
import { ConnectedPosition, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { DropList } from '../drop-list/drop-list.component';
import { OverlayService } from '../../modal2/sg-overlay.service';
import { OverlayManager } from '../../modal2/sg-overlay-manager';

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
  @ViewChild('inputEl', { read: ElementRef }) private inputEl: ElementRef;
  public innerValue: string[] = [];
  labelList: OverlayManager;
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
      this.innerValue = value;
    }
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  };

  openLabelList() {
    const positionStrategy = this.overlay.position()
        .flexibleConnectedTo(this.inputEl)
        .withPositions([{
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        } as ConnectedPosition])

    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      positionStrategy
    });

    this.labelList = this.overlayService.open<DropList, string[]>(DropList, overlayConfig, ['home', 'work', 'hobby', 'health'])
    this.labelList.afterClosed().subscribe(data => {
      const newValue = this.innerValue.concat(data)
      this.writeValue(newValue);
      this.onChange(this.innerValue);
    })
  }
}
