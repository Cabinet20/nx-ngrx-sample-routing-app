import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PRODUCT_FEATURE_KEY,
  ProductState,
  productAdapter,
} from './product.reducer';
import {selectRouteParams, selectUrl} from "./router.selectors";

// Lookup the 'Product' feature state managed by NgRx
export const getProductState =
  createFeatureSelector<ProductState>(PRODUCT_FEATURE_KEY);

const { selectAll, selectEntities } = productAdapter.getSelectors();

export const getProductLoaded = createSelector(
  getProductState,
  (state: ProductState) => state.loaded
);

export const getProductError = createSelector(
  getProductState,
  (state: ProductState) => state.error
);

export const getAllProduct = createSelector(
  getProductState,
  (state: ProductState) => selectAll(state)
);

export const getProductEntities = createSelector(
  getProductState,
  (state: ProductState) => selectEntities(state)
);

export const getProduct = createSelector(
  getProductState,
  (state: ProductState) => state.product
);

// export const getProduct = createSelector(
//   selectUrl,
//   (params) => {
//     debugger;
//     return params;
//   }
// )
