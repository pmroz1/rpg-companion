import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

export interface SpellCantrip {
  level: number;
  name: string;
  category: string;
  castingTime: string;
  range: string;
  concentration: boolean;
  ritual: boolean;
  requiredMaterial: boolean;
  description: string;
}

@Component({
  selector: 'tab-spells-cantrips',
  imports: [TableModule],
  template: `<p-table
    [value]="spellsCantrips"
    class="w-full"
    [tableStyle]="{ 'min-width': '50rem' }"
  >
    <ng-template #header>
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th>Category</th>
        <th>Quantity</th>
      </tr>
    </ng-template>
  </p-table>`,
  styleUrls: ['./spells-cantrips.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsCantrips {
  spellsCantrips = [];
}
