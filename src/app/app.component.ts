import { Component } from '@angular/core';

@Component({
  selector: 'sg-root',
  template: `
    <h1>
      Welcome to {{title}}!
    </h1>
  `,
  styles: [ ],
})
export class AppComponent {
  private title = 'sg';
}
