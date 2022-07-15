import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {Route, RouterModule} from '@angular/router';
import {LayoutComponent, NavigationShellModule} from '@navigation/shell';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {FullRouterStateSerializer, StoreRouterConnectingModule, routerReducer} from '@ngrx/router-store';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('@navigation/shell')
      .then(m => m.NavigationShellModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,
      {
        enableTracing: true
      }),
    NavigationShellModule,
    StoreModule.forRoot(
      {
        // 'my-router': routerReducer
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: false,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: FullRouterStateSerializer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
