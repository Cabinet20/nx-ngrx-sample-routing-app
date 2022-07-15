import { createAction, props } from '@ngrx/store';

export const loadClient = createAction('[Client Page] Init',
  props<{client: string | number}>());

export const loadClientSuccess = createAction(
  '[Client/API] Load Client Success',
  props<{ client: string | number }>()
);

export const loadClientFailure = createAction(
  '[Client/API] Load Client Failure',
  props<{ error: any }>()
);
