import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { DND_SPELLS_CANTRIPS } from '@data/dictionaries/spells-cantrips.dictionary';
import { SpellCantrip } from '@data/models';
import { Button } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'tab-spells-cantrips',
  imports: [TableModule, CheckboxModule, FormsModule, Button],
  template: `<div class="sc-container">
    <p-table
      [value]="spellsCantrips"
      class="w-full"
      stripedRows
      [paginator]="true"
      [rows]="8"
      [globalFilterFields]="['spellCantrip.name', 'spellCantrip.category']"
      [tableStyle]="{ 'min-width': '50rem' }"
      class="sc-table"
    >
      <ng-template #header let-columns>
        <tr>
          @for (col of headers; track $index) {
            <th>{{ col }}</th>
          }
        </tr>
      </ng-template>
      <ng-template let-spellCantrip pTemplate="body">
        <tr>
          <td>{{ spellCantrip.level }}</td>
          <td>{{ spellCantrip.name }}</td>
          <td>{{ spellCantrip.category }}</td>
          <td>{{ spellCantrip.castingTime }}</td>
          <td>{{ spellCantrip.range }}</td>
          <td>
            <p-checkbox
              [binary]="true"
              [(ngModel)]="spellCantrip.concentration"
              [disabled]="true"
            />
          </td>
          <td>
            <p-checkbox [binary]="true" [(ngModel)]="spellCantrip.ritual" [disabled]="true" />
          </td>
          <td>
            <p-checkbox
              [binary]="true"
              [(ngModel)]="spellCantrip.requiredMaterial"
              [disabled]="true"
            />
          </td>
          <td>
            <p-button label="Description"></p-button>
          </td>
        </tr>
      </ng-template>

      <ng-template pTemplate="footer">
        <div class="flex justify-end p-2">
          <p-button label="Add Spell/Cantrip" class="p-button-sm"></p-button>
        </div>
      </ng-template>
    </p-table>
  </div>`,
  styleUrls: ['./spells-cantrips.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsCantrips {
  private readonly formService = inject(DynamicFormService);
  spellsCantrips: SpellCantrip[] = [...DND_SPELLS_CANTRIPS];
  knownSpellsCantrips: SpellCantrip[] = [];

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
