import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductFacade} from "../+state/product.facade";
import {Router} from "@angular/router";

@Component({
  selector: 'navigation-demo-product-layout',
  templateUrl: './product-layout.component.html',
  styleUrls: ['./product-layout.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ProductLayoutComponent {

  product$ = this.productFacade.product$;

  constructor(
    private productFacade: ProductFacade
  ) {
  }

  updateProduct() {
    this.productFacade.updateProduct(`product-${(new Date()).getMilliseconds()}`);
  }
}
