import * as fromClients from './client.reducer';
import {routerReducer, RouterReducerState} from "@ngrx/router-store";
import {Action, ActionReducerMap, combineReducers} from "@ngrx/store";
import * as fromRouter from '@ngrx/router-store';

export const NAVIGATION_SHELL_KEY = 'shell'

// export interface NavigationShellState {
//   [fromClients.CLIENT_FEATURE_KEY]: fromClients.ClientState;
//   router: RouterReducerState
// }
//
// export interface State {
//   [NAVIGATION_SHELL_KEY]: NavigationShellState,
// }
//
// export function reducers(state: NavigationShellState | undefined, action: Action) {
//   return combineReducers({
//     [fromClients.CLIENT_FEATURE_KEY]: fromClients.clientReducer,
//     router: routerReducer
//   })(state, action);
// }
export interface NavigationShellState {
  [fromClients.CLIENT_FEATURE_KEY]: fromClients.ClientState;
  routerReducer: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<NavigationShellState> = {
  [fromClients.CLIENT_FEATURE_KEY]: fromClients.clientReducer,
  routerReducer: fromRouter.routerReducer,
};
