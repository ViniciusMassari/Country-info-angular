import {
  Component,
  EventEmitter,
  output,
  Output,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports: [FormsModule],
  providers: [NgForm],
})
export class SearchComponent {
  filterValue: OutputEmitterRef<string> = output();

  onSubmit(form: NgForm) {
    if (form.invalid) return;
  }

  onChange(select: HTMLSelectElement): void {
    if (!select) return;
    this.filterValue.emit(select.value);
    return;
  }
}
