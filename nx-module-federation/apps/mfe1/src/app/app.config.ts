import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes)
  ],
};
