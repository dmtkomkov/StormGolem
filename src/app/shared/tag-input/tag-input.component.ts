import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor,  NG_VALUE_ACCESSOR} from "@angular/forms";

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
  public innerValue: string[] = [];
  onChange = (_value: string[]) => {}
  onTouched = () => {}

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

}
