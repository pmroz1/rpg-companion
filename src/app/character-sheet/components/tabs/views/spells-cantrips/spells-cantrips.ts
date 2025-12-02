import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DynamicFormService } from '@app/shared/services';
import { SpellCantrip } from '@data/models';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'tab-spells-cantrips',
  imports: [TableModule],
  template: `<p-table
    [value]="spellsCantrips"
    class="w-full"
    [tableStyle]="{ 'min-width': '50rem' }"
  >
    <ng-template #header let-columns>
      <tr>
        @for (col of headers; track $index) {
          <th>{{ col }}</th>
        }
      </tr>
    </ng-template>
  </p-table>`,
  styleUrls: ['./spells-cantrips.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsCantrips {
  private readonly formService = inject(DynamicFormService);

  spellsCantrips: SpellCantrip[] = [];
  headers = [
    'Level',
    'Name',
    'Category',
    'Casting Time',
    'Range',
    'Concentration',
    'Ritual',
    'Material',
    'Description',
  ];
}
