import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { DynamicFormService } from '@app/core/form';
import { BackstoryInfo } from './models/backstory-info';
import { BackstoryState } from './backstory.state';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DND_ALIGNMENTS } from '@data/dictionaries/alignment.dictionary';

@Component({
  selector: 'app-backstory',
  imports: [DndCard, FormsModule, SelectModule, TextareaModule],
  template: `<app-dnd-card title="Backstory">
    <textarea
      pTextarea
      [ngModel]="backstoryInfo().backstoryPersonality"
      (ngModelChange)="state.updateState({ backstoryPersonality: $event })"
      rows="10"
      class="backstory-textarea p-5"
      placeholder="Enter your backstory and personality here.."
      fluid
    ></textarea>
    <div class="grid grid-row-2">
      <span class="mb-2 mt-4">Alignment</span>
      <p-select
        [options]="alignments"
        [ngModel]="backstoryInfo().alignment"
        (ngModelChange)="state.updateState({ alignment: $event })"
        optionLabel="name"
        placeholder="Select an Alignment"
        class="w-full md:w-70"
        id="alignment-select"
      />
    </div>
  </app-dnd-card>`,
  styleUrl: './backstory.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Backstory implements OnInit, OnDestroy {
  state = inject(BackstoryState);
  private readonly injector = inject(Injector);
  private readonly formService = inject(DynamicFormService);
  alignments = [...DND_ALIGNMENTS];
  backstoryInfo = this.state.state;
  control = new FormControl<BackstoryInfo>(this.backstoryInfo());

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.backstoryInfo());
      },
      { injector: this.injector },
    );
    this.formService.addControl('backstory', this.control);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('backstory');
  }
}
