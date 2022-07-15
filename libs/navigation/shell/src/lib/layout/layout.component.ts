import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ClientFacade} from "../+state/client.facade";

@Component({
  selector: 'navigation-demo-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LayoutComponent implements OnInit {

  loaded$ = this.clientFacade.loaded$;
  client$ = this.clientFacade.client$;

  constructor(
    private clientFacade: ClientFacade
  ) {
  }

  ngOnInit(): void {}
}
