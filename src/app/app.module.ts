import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from '@services';
import { ModalModule } from "@modal/modal.module";

import { AppRouterModule } from './app-router.module';
import { AppStoreModule } from "./app-store.module";
import { AppEffectsModule } from "./app-effects.module";

import { AppComponent } from '@root/app.component'
import { HomeComponent } from '@root/home/home.component';
import { BlogComponent } from '@root/blog/blog.component';
import { PostComponent } from '@root/blog/post/post.component';
import { PostFormComponent } from '@root/blog/post/post-form/post-form.component';
import { LoginDialogComponent } from '@shared/dialogs/login-dialog/login-dialog.component';
import { PageNotFoundComponent } from '@shared/error-pages/page-not-found/page-not-found.component';
import { IconComponent } from "@shared/icon/icon.component";
import { ButtonComponent } from "@shared/button/button.component";
import { MainMenuComponent } from '@shared/dialogs/main-menu/main-menu.component';
import { CloseIconComponent } from "./components/icons/close-icon/close-icon.component";
import { AddIconComponent } from "./components/icons/add-icon/add-icon.component";
import { EditIconComponent } from "./components/icons/edit-icon/edit-icon.component";
import { GoalComponent } from "@root/goal/goal.component";
import { GoalTableComponent } from "@root/goal/goal-table/goal-table.component";
import { GoalRowComponent } from "@root/goal/goal-row/goal-row.component";
import { TagInputComponent } from "@shared/tag-input/tag-input.component";
import { OverlayModule } from '@angular/cdk/overlay';
import { DropList } from '@shared/drop-list/drop-list.component';
import { OverlayService } from './modal2/sg-overlay.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    HomeComponent,
    BlogComponent,
    PageNotFoundComponent,
    PostComponent,
    PostFormComponent,
    IconComponent,
    ButtonComponent,
    MainMenuComponent,
    CloseIconComponent,
    AddIconComponent,
    EditIconComponent,
    GoalComponent,
    GoalTableComponent,
    GoalRowComponent,
    TagInputComponent,
    DropList
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
    AppStoreModule,
    AppEffectsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
    OverlayModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    OverlayService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
