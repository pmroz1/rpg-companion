import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-dnd-card',
  imports: [Card],
  template: `
    <p-card class="dnd-box p-2 ml-1 mr-1 mb-2 mt-2" [style.minHeight]="minHeight()">
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

      <div class="p-2 m-0 dnd-card-content"><ng-content /></div>
    </p-card>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    :host ::ng-deep .p-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    :host ::ng-deep .p-card-body,
    :host ::ng-deep .p-card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .dnd-card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DndCard {
  title = input.required<string>();
  displayTitle = input<boolean>(true);
  displayDivider = input<boolean>(true);
  minHeight = input<string | null>(null);
}
