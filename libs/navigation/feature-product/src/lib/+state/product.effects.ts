import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType, concatLatestFrom} from '@ngrx/effects';
import {fetch, navigation} from '@nrwl/angular';

import * as ProductActions from './product.actions';
import * as ProductFeature from './product.reducer';
import {ProductLayoutComponent} from "@navigation/product";
import {HistoryComponent} from "../history/history.component";
import {map, of, take, tap} from "rxjs";
import {ProductFacade} from "./product.facade";
import {ClientFacade} from "@navigation/shell";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable()
export class ProductEffects {

  navigationToLayout$ = createEffect(() =>
    this.actions$.pipe(
      navigation(ProductLayoutComponent, {
        run: (a: ActivatedRouteSnapshot) => {
          return of(['product-1', 'product-2', 'product-3']).pipe(
            map((products: string[]) => {
              if (!a.firstChild || !a.firstChild!.params['productId']) {
                return ProductActions.updateProduct({product: products[0]})
              } else {
                console.log('Product params: ', a.firstChild!.params);
                return ProductActions.updateProduct({product: a.firstChild!.params['productId']});
              }
            })
          )
        },
        onError(a: ActivatedRouteSnapshot, e: any): any {
        }
      })
    ));

  navigationToHistory$ = createEffect(() =>
    this.actions$.pipe(
      navigation(HistoryComponent, {
        run: a => {
          // debugger;
          console.log('History params: ', a.params);
        }
      })
    ));

  updateProduct$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductActions.updateProduct),
        concatLatestFrom(() => [
          this.clientFacade.url$,
          this.clientFacade.client$,
          this.productFacade.product$,
        ]),
        map(([a, url, client, product]) => {
          // let urlTree = this.router.parseUrl(url);
          console.log(url);
          let routeParts = url.split('/').filter(x => x.length > 0);
          let indexOfProductId = routeParts.indexOf('product') + 1
          let currentProduct = routeParts[indexOfProductId];
          let productIsInUrl = currentProduct != undefined;
          let productInUrlIsSameAsState = currentProduct == product;
          if (productIsInUrl && productInUrlIsSameAsState) {
            return;
          }
          routeParts[indexOfProductId] = a.product;
          console.log('New URL is = ', routeParts.join('/'));
          if (productIsInUrl) {
            this.location.go(routeParts.join('/'));
          } else {
            this.router.navigate(routeParts);
          }
        })
      ),
    {
      dispatch: false
    }
  );

  constructor(
    private readonly actions$: Actions,
    private router: Router,
    private location: Location,
    private productFacade: ProductFacade,
    private clientFacade: ClientFacade) {
  }
}
