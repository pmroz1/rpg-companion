import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-dnd-card',
  imports: [Card],
  template: `
    <p-card [header]="header()" class="dnd-card">
      <div class="dnd-divider"></div>
      <ng-content />
    </p-card>
  `,
  styleUrls: ['./dnd-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DndCard {
  header = input<string | undefined>('');
}
