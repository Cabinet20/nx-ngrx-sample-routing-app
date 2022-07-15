import {Injectable} from '@angular/core';
import {createEffect, Actions, ofType, concatLatestFrom} from '@ngrx/effects';
import {fetch, navigation} from '@nrwl/angular';

import * as ClientActions from './client.actions';
import * as ClientFeature from './client.reducer';
import {select, Store} from "@ngrx/store";
import {getSelectors} from "@ngrx/router-store";
import {LayoutComponent} from "@navigation/shell";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {delay, map, of, switchMap} from "rxjs";

@Injectable()
export class ClientEffects {

  loadClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActions.loadClient),
      switchMap(a => of(a.client).pipe(
        delay(2000),
        map(client => {
          debugger;
          return ClientActions.loadClientSuccess({client: a.client})
        })
      ))
    ));

  navigation$ = createEffect(() =>
    this.actions$.pipe(
      // concatLatestFrom(() => [
      //   this.store.pipe(select(getSelectors().selectUrl))
      // ]),
      navigation(LayoutComponent, {
        run: ((a: ActivatedRouteSnapshot) => {
            console.log(a.params);
            debugger;
            return ClientActions.loadClient({ client: a.params['clientId']});
            // this.router.navigate([],{
            //   relativeTo: this.route
            // })
          }
        ),
        onError(a: ActivatedRouteSnapshot, e: any): any {
          console.log(e);
          debugger;
        }
      })
    ))

  constructor(
    private readonly actions$: Actions,
    private store: Store
  ) {
  }
}
