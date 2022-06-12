import { Component, ElementRef, forwardRef, Input, OnChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR } from "@angular/forms";
import { ConnectedPosition, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { DropList } from '../drop-list/drop-list.component';
import { OverlayService } from '../../modal2/sg-overlay.service';
import { OverlayManager } from '../../modal2/sg-overlay-manager';
import * as _ from 'lodash';

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
export class TagInputComponent implements ControlValueAccessor, OnChanges {
  @Input() duplication: boolean = false;
  @Input() options: string[] = [];
  @ViewChild('inputEl', { read: ElementRef }) private inputEl: ElementRef;
  onChange = (_value: string[]) => {}
  onTouched = () => {}
  public innerValue: string[] = [];
  private labelDropDown: OverlayManager;
  private _availableOptions: string[] = [];

  constructor(
      private overlay: Overlay,
      private overlayService: OverlayService
  ) { }

  ngOnChanges() {
    this._availableOptions = this.options;
  }

  writeValue(value: string[]): void {
    this.availableOptions = value;
    this.innerValue = value ?? [];
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  };

  openLabelList() {
    if (this.availableOptions.length === 0) {
      return
    }
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

    this.labelDropDown = this.overlayService.open<DropList, string[]>(DropList, overlayConfig, this.availableOptions)
    this.labelDropDown.afterClosed().subscribe((option: string) => {
      const newValue = this.innerValue.concat(option);
      this.writeValue(newValue);
      this.onChange(this.innerValue);
    })
  }

  set availableOptions(usedOptions: string[]) {
    this._availableOptions = this.duplication ? this.options : _.difference(this.options, usedOptions);
  }

  get availableOptions() {
    return this._availableOptions;
  }
}
