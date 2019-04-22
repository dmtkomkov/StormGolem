import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GuardService, InterceptorService } from '@shared/services';
import { ngrxLogger } from "@shared/helpers";

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from '@root/app.component'
import { HomeComponent } from '@root/home/home.component';
import { BlogComponent } from '@root/blog/blog.component';
import { PostComponent } from '@root/blog/post/post.component';
import { PostFormComponent } from '@root/blog/post/post-form/post-form.component';
import { LoginDialogComponent } from '@shared/dialogs/login-dialog/login-dialog.component';
import { PageNotFoundComponent } from '@shared/error-pages/page-not-found/page-not-found.component';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { Routes, RouterModule } from '@angular/router';

import { blogReducer, userReducer, authReducer } from "@store/reducers";
import { BlogEffect, UserEffect, AuthEffect } from "@store/effects";

// TODO: routers, store and effects into separate modules
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent, canActivate: [ GuardService ] },
  { path: '**', component: PageNotFoundComponent },
];

const appStore = {
  blog: blogReducer,
  auth: authReducer,
  user: userReducer,
};

const appEffects = [
  BlogEffect,
  AuthEffect,
  UserEffect,
];

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    HomeComponent,
    BlogComponent,
    PageNotFoundComponent,
    PostComponent,
    PostFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(appStore, {metaReducers: [ngrxLogger]}),
    EffectsModule.forRoot(appEffects),
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  entryComponents: [
    LoginDialogComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
