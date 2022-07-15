import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {filter, first, map, mergeMap, Observable, tap} from 'rxjs';
import {ClientFacade} from "@navigation/shell";

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {


  constructor(
    private clientFacade: ClientFacade
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.clientFacade.loaded$.pipe(
      tap(loaded => console.log('Pre-filter client loaded = ', loaded)),
      filter(loaded => loaded),
      tap(loaded => console.log('Post-filter client loaded = ', loaded)),
      map(loaded => {
        debugger;
        return loaded
      }),
      first()
    );
  }

}
