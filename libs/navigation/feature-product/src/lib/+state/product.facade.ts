import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ProductActions from './product.actions';
import * as ProductFeature from './product.reducer';
import * as ProductSelectors from './product.selectors';

@Injectable()
export class ProductFacade {

  product$ = this.store.pipe(select(ProductSelectors.getProduct));

  constructor(private store: Store) {
  }

  updateProduct(productId: string) {
    this.store.dispatch(ProductActions.updateProduct({ product: productId}));
  }
}
