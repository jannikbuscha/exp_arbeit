import {loadRemote} from '@module-federation/enhanced/runtime';
import {Route} from '@angular/router';
import {Type} from "@angular/core";

export const appRoutes: Route[] = [
  {
    path: 'mfe2',
    loadChildren: () =>
      loadRemote<typeof import('mfe2/Routes')>('mfe2/Routes').then(
        (m) => m!.remoteRoutes
      )
  },
  {
    path: 'mfe1',
    loadComponent: () => loadRemote('mfe1/Component') as Promise<Type<unknown>>
    // loadComponent: () =>
    //   loadRemote<typeof import('mfe1/Component')>('mfe1/Component').then(
    //     (m) => m!.RemoteEntryComponent
    //   )
  },
];
