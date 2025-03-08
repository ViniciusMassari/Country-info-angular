import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `<section class="text-center">
    <h1 class="text-5xl mt-1 mb-4">404: Page not found</h1>
    <a [routerLink]="['/']" replaceUrl="true"
      >Click here to return to main page</a
    >
  </section>`,
})
export class NotFoundComponent {
  constructor() {
    console.log('Logic added');
  }
}
