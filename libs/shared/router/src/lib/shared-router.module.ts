import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {routerReducer} from "@ngrx/router-store";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      'routerCustom',
      routerReducer
    )
  ],
})
export class SharedRouterModule {}
