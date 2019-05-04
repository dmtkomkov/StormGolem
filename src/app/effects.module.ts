import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffect, BlogEffect, UserEffect } from "@store/effects";

const appEffects = [
  BlogEffect,
  AuthEffect,
  UserEffect,
];

@NgModule({
  imports: [ EffectsModule.forRoot(appEffects) ],
  exports: [ EffectsModule ],
})
export class AppEffectsModule { }