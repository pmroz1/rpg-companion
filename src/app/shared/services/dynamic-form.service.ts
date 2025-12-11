import { computed, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  private readonly form = new FormGroup({});

  private readonly controlRefs = new Map<
    string,
    { control: FormControl<unknown>; count: number }
  >();

  getFormGroup(): FormGroup {
    return this.form;
  }

  addControl(name: string, control: FormControl<unknown>) {
    const existing = this.controlRefs.get(name);
    if (existing) {
      existing.count++;
      return;
    }

    this.controlRefs.set(name, { control, count: 1 });
    this.form.addControl(name, control);
  }

  removeControl(name: string) {
    const existing = this.controlRefs.get(name);
    if (!existing) return;

    existing.count--;
    if (existing.count <= 0) {
      this.form.removeControl(name);
      this.controlRefs.delete(name);
    }
  }

  value = toSignal(this.form.valueChanges.pipe(startWith(this.form.value)));
  status = toSignal(this.form.statusChanges.pipe(startWith(this.form.status)));

  isValid = computed(() => this.form.valid);
  isDirty = computed(() => this.form.dirty);
  rawValue = computed(() => this.value());
}
