import { Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR } from "@angular/forms";
import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TestOverlayComponent } from '../test-overlay/test-overlay.component';
import { FilePreviewOverlayService } from '../../modal2/sg-overlay.service';

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
  @ViewChild('testbutton', {read: ElementRef}) private testButton: ElementRef;
  public innerValue: string[] = [];
  onChange = (_value: string[]) => {}
  onTouched = () => {}

  constructor(
      private overlay: Overlay,
      private overlayService: FilePreviewOverlayService
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

  onKeyUp(event) {
    if (event.code === 'Space') {
      this.writeValue([event.target.value]);
      this.onChange(this.innerValue);
    }
  }

  onKeyPress(event) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }

  openOverlay() {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().flexibleConnectedTo(this.testButton).withPositions([{
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
      overlayRef.dispose();
    });
  }

  openOverlay2() {
    let menu = this.overlayService.open({options: ['work1', 'work2', 'work3', 'work4']})
  }
}
