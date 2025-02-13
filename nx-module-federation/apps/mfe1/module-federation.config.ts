import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'mfe1',
  exposes: {
    './Routes': 'apps/mfe1/src/app/remote-entry/entry.routes.ts',
    './Component': 'apps/mfe1/src/app/remote-entry/entry.component.ts',
  },
  // shared: {
  //   "@angular/core": { singleton: false, requiredVersion: "15.2.0" },
  //   "@angular/common": { singleton: false, requiredVersion: "15.2.0" },
  //   "@angular/router": { singleton: false, requiredVersion: "15.2.0" }
  // }

  // shared: (libraryName, defaultConfig) => {
  //   if (libraryName.startsWith('@angular')) {
  //     return {
  //       ...defaultConfig,
  //       singleton: true,
  //       strictVersion: false,
  //       requiredVersion: '15.2.10',
  //     };
  //   }
  //   return defaultConfig;
  // }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
