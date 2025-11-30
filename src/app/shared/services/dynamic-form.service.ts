import { computed, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private form = new FormGroup({});

  getFormGroup(): FormGroup {
    return this.form;
  }

  value = toSignal(this.form.valueChanges.pipe(startWith(this.form.value)));
  status = toSignal(this.form.statusChanges.pipe(startWith(this.form.status)));

  isValid = computed(() => this.form.valid);
  isDirty = computed(() => this.form.dirty);
  rawValue = computed(() => this.value());
}
