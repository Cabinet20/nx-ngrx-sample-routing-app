import { ProductEntity } from './product.models';
import {
  productAdapter,
  ProductPartialState,
  initialProductState,
} from './product.reducer';
import * as ProductSelectors from './product.selectors';

describe('Product Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProductId = (it: ProductEntity) => it.id;
  const createProductEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProductEntity);

  let state: ProductPartialState;

  beforeEach(() => {
    state = {
      product: productAdapter.setAll(
        [
          createProductEntity('PRODUCT-AAA'),
          createProductEntity('PRODUCT-BBB'),
          createProductEntity('PRODUCT-CCC'),
        ],
        {
          ...initialProductState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Product Selectors', () => {
    it('getAllProduct() should return the list of Product', () => {
      const results = ProductSelectors.getAllProduct(state);
      const selId = getProductId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ProductSelectors.getSelected(state) as ProductEntity;
      const selId = getProductId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getProductLoaded() should return the current "loaded" status', () => {
      const result = ProductSelectors.getProductLoaded(state);

      expect(result).toBe(true);
    });

    it('getProductError() should return the current "error" state', () => {
      const result = ProductSelectors.getProductError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
