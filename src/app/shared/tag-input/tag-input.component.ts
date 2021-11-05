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
  onChange = (_value) => {}
  onTouched = () => {}

  writeValue(value): void {
    if (value === null || value === '' || value === undefined) {
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

  onKeyUp(e) {
    if (e.code === 'Space') {
      this.writeValue([e.target.value]);
      this.onChange(this.innerValue);
    }
  }

  onKeyPress(e) {
    if (e.code === 'Space') {
      e.preventDefault();
    }
  }

}
