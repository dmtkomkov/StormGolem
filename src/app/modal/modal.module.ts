import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  imports: [CommonModule, ClickOutsideModule],
  declarations: [ModalComponent, ModalDirective],
  entryComponents: [ModalComponent]
})
export class ModalModule {}
