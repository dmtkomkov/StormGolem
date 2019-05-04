import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { ngrxLogger } from "@shared/helpers";
import { authReducer, blogReducer, userReducer } from "@store/reducers";

const appStore = {
  blog: blogReducer,
  auth: authReducer,
  user: userReducer,
};

@NgModule({
  imports: [ StoreModule.forRoot(appStore, { metaReducers: [ ngrxLogger ] }) ],
  exports: [ StoreModule ],
})
export class AppStoreModule { }