import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-dnd-card',
  imports: [Card],
  template: `
    <p-card class="dnd-box p-2 ml-1 mr-1 mb-2 mt-2">
      @if (displayTitle()) {
        <ng-template #header>
          <div class="w-full h-8 text-2xl flex items-center justify-center">
            <span class="dnd-card-header">{{ title() }}</span>
          </div>
        </ng-template>
      }
      @if (displayDivider()) {
        <div class="dnd-divider"></div>
      }

      <div class="p-2 m-0"><ng-content /></div>
    </p-card>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DndCard {
  title = input.required<string>();
  displayTitle = input<boolean>(true);
  displayDivider = input<boolean>(true);
}
