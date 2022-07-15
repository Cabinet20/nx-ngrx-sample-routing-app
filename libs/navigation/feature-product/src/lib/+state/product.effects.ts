import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {fetch, navigation} from '@nrwl/angular';

import * as ProductActions from './product.actions';
import * as ProductFeature from './product.reducer';
import {ProductLayoutComponent} from "@navigation/product";
import {HistoryComponent} from "../history/history.component";
import {take} from "rxjs";

@Injectable()
export class ProductEffects {

  navigationToLayout$ = createEffect(() =>
    this.actions$.pipe(
      navigation(ProductLayoutComponent, {
        run: a => {
          debugger;
          console.log('Product params: ', a.params);
        }
      })
    ));

  navigationToHistory$ = createEffect(() =>
    this.actions$.pipe(
      navigation(HistoryComponent, {
        run: a => {
          debugger;
          console.log('History params: ', a.params);
        }
      })
    ));

  constructor(private readonly actions$: Actions) {}
}
