import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CLIENT_FEATURE_KEY,
  ClientState,
} from './client.reducer';
import {getSelectors, RouterReducerState} from "@ngrx/router-store";


export const routerFeatureKey = 'router';
export const selectRouter = createFeatureSelector<RouterReducerState>(routerFeatureKey);

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
  selectTitle, // Select the title if available
} = getSelectors(selectRouter);

// import {selectRouteParams} from "./router.reducer";

// Lookup the 'Client' feature state managed by NgRx
export const getClientState =
  createFeatureSelector<ClientState>(CLIENT_FEATURE_KEY);

export const getClientLoaded = createSelector(
  getClientState,
  (state: ClientState) => state.loaded
);

export const getClientError = createSelector(
  getClientState,
  (state: ClientState) => state.error
);

// export const getClient = createSelector(
//   getClientState,
//   (state: ClientState) => {
//     return state.client
//   });

export const getClient = createSelector(
  getClientState,
  selectRouteParams,
  (state: ClientState, {clientId}) => {
    debugger;
    return state.client
  }
);
