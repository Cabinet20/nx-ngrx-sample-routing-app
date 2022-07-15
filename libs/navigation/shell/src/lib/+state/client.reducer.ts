import {createReducer, on, Action} from '@ngrx/store';

import * as ClientActions from './client.actions';

export const CLIENT_FEATURE_KEY = 'client';

export interface ClientState {
  client?: string | number; // which Client record has been selected
  loaded: boolean; // has the Client list been loaded
  error?: string | null; // last known error (if any)
}

export interface ClientPartialState {
  readonly [CLIENT_FEATURE_KEY]: ClientState;
}

export const initialClientState: ClientState = {
  // set initial required properties
  loaded: false,
};

const reducer = createReducer(
  initialClientState,
  on(ClientActions.loadClient, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ClientActions.loadClientSuccess, (state, {client}) =>
    ({...state, client: client, loaded: true})
  ),
  on(ClientActions.loadClientFailure, (state, {error}) => ({
    ...state,
    error,
  }))
);

export function clientReducer(state: ClientState | undefined, action: Action) {
  return reducer(state, action);
}
