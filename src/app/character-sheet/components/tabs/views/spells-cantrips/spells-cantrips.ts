import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DndDialogComponent } from '@app/shared/components/dnd-dialog/dnd-dialog';
import { DndDialogService } from '@app/shared/components/dnd-dialog/dnd-dialog.service';
import { DynamicFormService } from '@app/shared/services';
import { DND_SPELLS_CANTRIPS } from '@data/dictionaries/spells-cantrips.dictionary';
import { SpellCantrip } from '@data/models';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'tab-spells-cantrips',
  imports: [TableModule, CheckboxModule, FormsModule, ButtonModule],

  template: `<div class="sc-container">
    <p-table
      [value]="spellsCantrips"
      class="w-full"
      stripedRows
      [paginator]="true"
      [rows]="8"
      [globalFilterFields]="['spellCantrip.name', 'spellCantrip.category']"
      [tableStyle]="{ 'min-width': '30rem' }"
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
              [binary]="true"
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
            <p-button
              icon="pi pi-align-center"
              (onClick)="showSpellDescription(spellCantrip.name, spellCantrip.description)"
            ></p-button>
          </td>
        </tr>
      </ng-template>

      <ng-template pTemplate="footer" class="flex justify-end ">
        <div class="p-2 table-footer">
          <p-button label="{{ addSpellButtonText }}" (onClick)="showAddSpellDialog()"></p-button>
        </div>
      </ng-template>
    </p-table>
  </div>`,
  styleUrls: ['./spells-cantrips.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsCantrips implements OnDestroy {
  private readonly formService = inject(DynamicFormService);
  spellsCantrips: SpellCantrip[] = [...DND_SPELLS_CANTRIPS];
  knownSpellsCantrips: SpellCantrip[] = [];
  addSpellButtonText = 'Add Spell';

  dialogService = inject(DndDialogService);
  ref: DynamicDialogRef | undefined | null;

  showSpellDescription(title: string, content: string) {
    this.ref = this.dialogService.openSimple(title, content);
  }

  showAddSpellDialog() {
    this.ref = this.dialogService.openSelect(
      'Add Spell',
      'Spell adding functionality coming soon!',
      this.spellsCantrips,
    );
  }

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

  ngOnDestroy(): void {
    this.ref?.close();
  }
}
