import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffect, UserEffect } from "@store/effects";

const appEffects = [
  AuthEffect,
  UserEffect,
];

@NgModule({
  imports: [ EffectsModule.forRoot(appEffects) ],
  exports: [ EffectsModule ],
})
export class AppEffectsModule { }