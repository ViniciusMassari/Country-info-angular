import {
  Component,
  inject,
  output,
  Output,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports: [FormsModule],
  providers: [NgForm, Router],
})
export class SearchComponent {
  filterValue: OutputEmitterRef<string> = output();
  router = inject(Router);

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.router.navigateByUrl('country/' + form.value['countryName']);
  }

  onChange(select: HTMLSelectElement): void {
    if (!select) return;
    this.filterValue.emit(select.value);
    return;
  }
}
