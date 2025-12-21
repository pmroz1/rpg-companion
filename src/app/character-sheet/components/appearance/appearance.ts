import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { AppearanceState } from './appearance-state';

@Component({
  selector: 'app-appearance',
  imports: [CardModule, TextareaModule, ReactiveFormsModule, FormsModule, DividerModule, DndCard],
  template: `<app-dnd-card title="Appearance">
    <textarea
      pTextarea
      [ngModel]="appearanceState()"
      (ngModelChange)="state.setState($event)"
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
  private readonly injector = inject(Injector);
  readonly state = inject(AppearanceState);

  appearanceState = this.state.state;
  control = new FormControl<string>(this.appearanceState());

  ngOnInit() {
    effect(
      () => {
        this.control.setValue(this.appearanceState());
      },
      { injector: this.injector },
    );
    this.formService.addControl('appearance', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('appearance');
  }
}
