import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Route, RouterState} from '@angular/router';
import {ProductLayoutComponent} from './product-layout/product-layout.component';
import {HistoryComponent} from './history/history.component';
import {DetailsComponent} from './details/details.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromProduct from './+state/product.reducer';
import {ProductEffects} from './+state/product.effects';
import {FullRouterStateSerializer, MinimalRouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store";
import {ClientGuard} from "../../../shell/src/lib/guards/client.guard";
import {ProductFacade} from "./+state/product.facade";
import {min} from "rxjs";
import {CustomSerializer} from "../../../shell/src/lib/serializer/custom.serializer";

export const navigationFeatureProductRoutes: Route[] = [
  {
    path: '',
    canActivate: [ClientGuard],
    component: ProductLayoutComponent,
    children: [
      {
        path: 'product/:productId',
        children: [
          {
            path: '',
            redirectTo: 'details',
            pathMatch: 'full',
          },
          {
            path: 'details',
            component: DetailsComponent,
          },
          {
            path: 'history',
            component: HistoryComponent,
          },
        ],
      },]
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(navigationFeatureProductRoutes),
    StoreModule.forFeature(
      fromProduct.PRODUCT_FEATURE_KEY,
      fromProduct.productReducer
    ),
    StoreRouterConnectingModule.forRoot({
      serializer: MinimalRouterStateSerializer,
    }),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [ProductFacade],
  declarations: [ProductLayoutComponent, HistoryComponent, DetailsComponent],
  exports: [ProductLayoutComponent],
})
export class NavigationFeatureProductModule {
}
