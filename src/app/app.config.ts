import {
  type ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch()),
    provideTanStackQuery(new QueryClient()),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
  ],
};
