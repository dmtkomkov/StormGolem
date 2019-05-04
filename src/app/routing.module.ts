import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "@root/home/home.component";
import { BlogComponent } from "@root/blog/blog.component";
import { GuardService } from "@shared/services";
import { PageNotFoundComponent } from "@shared/error-pages/page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent, canActivate: [ GuardService ] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
})
export class RoutingModule { }