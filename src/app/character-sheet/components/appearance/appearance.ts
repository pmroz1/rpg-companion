import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { AppearanceState } from './appearance-state';

@Component({
  selector: 'app-appearance',
  imports: [CardModule, TextareaModule, ReactiveFormsModule, DividerModule, DndCard],
  template: `<app-dnd-card title="Appearance">
    <textarea
      pTextarea
      [formControl]="control"
      rows="10"
      class="appearance-textarea p-5"
      placeholder="Enter your appearance here.."
      fluid
    ></textarea>
  </app-dnd-card>`,
  styleUrl: './appearance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appearance implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  readonly state = inject(AppearanceState);

  appearanceState = this.state.state;
  control = new FormControl(this.appearanceState(), { nonNullable: true });

  constructor() {
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.state.setState(value);
    });

    effect(() => {
      const stateValue = this.appearanceState();
      if (this.control.value !== stateValue) {
        this.control.setValue(stateValue, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.formService.addControl('appearance', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('appearance');
  }
}
