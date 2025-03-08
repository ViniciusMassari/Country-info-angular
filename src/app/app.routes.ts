import type { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { CountryDetailsComponent } from './screens/country-details/country-details.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'country/:name', component: CountryDetailsComponent },
  {
    path: '**',
    loadComponent: () =>
      import('./screens/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
