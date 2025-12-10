import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';

@Component({
  selector: 'app-abilities',
  imports: [DndCard],
  template: `
    <app-dnd-card title="abilities" class="h-full" [hideHeader]="true">
      <!-- Abilities content goes here -->
    </app-dnd-card>
  `,
  styleUrl: './abilities.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Abilities implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);
  private readonly control = new FormControl('');

  ngOnInit(): void {
    effect(
      () => {
        this.formService.addControl('abilities', this.control);
      },
      { injector: this.injector },
    );
  }

  ngOnDestroy(): void {
    this.formService.removeControl('abilities');
  }
}
