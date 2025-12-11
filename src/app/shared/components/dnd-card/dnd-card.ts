import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-dnd-card',
  imports: [Card],
  host: {
    class: 'h-full',
    style: 'display:flex;flex-direction:column;height:100%',
  },
  template: `
    <p-card class="dnd-card p-2" [style.minHeight]="minHeight()">
      @if (displayTitle()) {
        <ng-template #header>
          <div class="dnd-divider"></div>
          <div class="w-full h-auto text-2xl flex items-center justify-center select-none">
            <span class="dnd-card-header w-full">{{ title() }}</span>
          </div>
          @if (displayDivider()) {
            <div class="dnd-divider"></div>
          }
        </ng-template>
      }

      <div class="pl-2 m-0 dnd-card-content"><ng-content /></div>
    </p-card>
  `,
  styleUrls: ['./dnd-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DndCard {
  title = input.required<string>();
  displayTitle = input<boolean>(true);
  displayDivider = input<boolean>(true);
  minHeight = input<string | null>(null);
}
