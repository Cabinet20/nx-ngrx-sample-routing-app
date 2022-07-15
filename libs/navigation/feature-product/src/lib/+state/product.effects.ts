import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType, concatLatestFrom} from '@ngrx/effects';
import {fetch, navigation} from '@nrwl/angular';

import * as ProductActions from './product.actions';
import * as ProductFeature from './product.reducer';
import {ProductLayoutComponent} from "@navigation/product";
import {HistoryComponent} from "../history/history.component";
import {map, take} from "rxjs";
import {ProductFacade} from "./product.facade";
import {ClientFacade} from "@navigation/shell";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable()
export class ProductEffects {

  navigationToLayout$ = createEffect(() =>
    this.actions$.pipe(
      navigation(ProductLayoutComponent, {
        run: a => {
          // debugger;
          console.log('Product params: ', a.params);
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
          this.clientFacade.client$
        ]),
        map(([a, url, client]) => {
          debugger;
          // let urlTree = this.router.parseUrl(url);
          console.log(url);
          let routeParts = url.split('/').filter(x => x.length > 0);
          routeParts[routeParts.indexOf('product') + 1] = a.product;
          this.location.replaceState(routeParts.join('/'));
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
