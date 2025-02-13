import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfe2',
  exposes: {
    './Routes': 'apps/mfe2/src/app/remote-entry/entry.routes.ts',
    './Component': 'apps/mfe2/src/app/remote-entry/entry.component.ts',
  },
  // shared: (libraryName, sharedConfig) => {
  //   if (libraryName === '@nx-module-federation/data') {
  //     return { singleton: true, eager: false };
  //   }
  // },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
