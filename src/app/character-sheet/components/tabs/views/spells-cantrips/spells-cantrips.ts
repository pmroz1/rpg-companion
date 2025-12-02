import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DynamicFormService } from '@app/shared/services';
import { DND_SPELLS_CANTRIPS } from '@data/dictionaries/spells-cantrips.dictionary';
import { SpellCantrip } from '@data/models';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
@Component({
  selector: 'tab-spells-cantrips',
  imports: [TableModule, Tooltip],
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
    <ng-template let-spellCantrip pTemplate="body">
      <tr pTooltip="{{ spellCantrip.description }}">
        <td>{{ spellCantrip.level }}</td>
        <td>{{ spellCantrip.name }}</td>
        <td>{{ spellCantrip.category }}</td>
        <td>{{ spellCantrip.castingTime }}</td>
        <td>{{ spellCantrip.range }}</td>
        <td>{{ spellCantrip.concentration ? 'Yes' : 'No' }}</td>
        <td>{{ spellCantrip.ritual ? 'Yes' : 'No' }}</td>
        <td>{{ spellCantrip.requiredMaterial ? 'Yes' : 'No' }}</td>
        <td>{{ spellCantrip.description }}</td>
      </tr>
    </ng-template>

    <ng-template pTemplate="footer">
      <div class="flex justify-end p-2">
        <button pButton type="button" label="Add Spell/Cantrip" class="p-button-sm"></button>
      </div>
    </ng-template>
  </p-table>`,
  styleUrls: ['./spells-cantrips.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsCantrips {
  private readonly formService = inject(DynamicFormService);
  spellsCantrips: SpellCantrip[] = [...DND_SPELLS_CANTRIPS];

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
