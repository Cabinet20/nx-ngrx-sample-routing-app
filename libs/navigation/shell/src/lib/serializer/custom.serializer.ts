import {ActivatedRouteSnapshot, Params, RouterStateSnapshot} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    debugger;
    let route: ActivatedRouteSnapshot = routerState.root;
    let {params, url, queryParams} = route;

    while (route.firstChild) {
      route = route.firstChild;
      params = {
        ...params,
        ...route.params
      };
    }

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url: url.toString(), params, queryParams };
  }
}
