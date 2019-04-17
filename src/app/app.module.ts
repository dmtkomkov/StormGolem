import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from '@app';
import { HomeComponent } from '@home/home.component';
import { BlogComponent } from '@blog/blog.component';
import { PostComponent } from '@blog/post/post.component';
import { PostFormComponent } from '@blog/post/post-form/post-form.component';
import { LoginDialogComponent } from '@dialogs/login-dialog/login-dialog.component';
import { PageNotFoundComponent } from '@errors/page-not-found/page-not-found.component';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { BlogService } from '@services/blog.service';
import { GuardService } from '@services/guard.service';
import { InterceptorService } from '@services/interceptor.service';

import { StoreModule } from "@ngrx/store";
import { Routes, RouterModule } from '@angular/router';
import { blogReducer } from "./reducers/blog.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BlogEffect } from "./effects/blog.effect";
import { userReducer } from "./reducers/user.reducer";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent, canActivate: [ GuardService ] },
  { path: '**', component: PageNotFoundComponent }
];

const appStore = {
  blog: blogReducer,
  user: userReducer,
};

const appEffects = [
  BlogEffect,
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
    StoreModule.forRoot(appStore),
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
    AuthService,
    UserService,
    BlogService,
    GuardService,
  ],
  entryComponents: [
    LoginDialogComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
