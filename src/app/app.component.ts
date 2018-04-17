import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'sg-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent {
  title: string = 'Storm Golem';

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIcon(
      'lightning',
      sanitizer.bypassSecurityTrustResourceUrl('assets/lightning.svg')
    )
  }
}
