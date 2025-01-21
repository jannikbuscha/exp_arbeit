import {loadRemote} from '@module-federation/enhanced/runtime';
import {NxWelcomeComponent} from './nx-welcome.component';
import {Route} from '@angular/router';
import {Type} from "@angular/core";

export const appRoutes: Route[] = [
  {
    path: 'mfe2',
    loadChildren: () =>
      loadRemote<typeof import('mfe1/Routes')>('mfe1/Routes').then(
        (m) => m!.remoteRoutes
      )
  },
  {
    path: 'mfe1',
    loadChildren: () =>
      loadRemote<typeof import('mfe2/Routes')>('mfe2/Routes').then(
        (m) => m!.remoteRoutes
      )
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
