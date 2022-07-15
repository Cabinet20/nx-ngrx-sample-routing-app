import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ClientActions from './client.actions';
import * as ClientFeature from './client.reducer';
import * as ClientSelectors from './client.selectors';

@Injectable()
export class ClientFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ClientSelectors.getClientLoaded));
  client$ = this.store.pipe(select(ClientSelectors.getClient));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  // init() {
  //   this.store.dispatch(ClientActions.loadClient());
  // }
}
