import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { deepEqual } from '@app/shared/utils/deep-equal';
import { DndDialogService } from '@app/shared/components/dnd-dialog/dnd-dialog.service';
import { DynamicFormService } from '@app/shared/services';
import { DND_SPELLS_CANTRIPS } from '@data/dictionaries/spells-cantrips.dictionary';
import { SpellCantrip } from '@data/models';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { SpellsCantripsState } from './spell-cantrips.state';

@Component({
  selector: 'app-spells-cantrips',
  imports: [
    TableModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PopoverModule,
  ],
  template: `<div class="sc-container">
    <p-table
      [value]="knownSpellsCantrips()"
      stripedRows
      [paginator]="true"
      [rows]="8"
      class="sc-table"
    >
      <ng-template pTemplate="header" sortField="level">
        <tr>
          <th pSortableColumn="level">
            <div class="flex items-center gap-2">
              level
              <p-sortIcon field="level" />
            </div>
          </th>

          <th pSortableColumn="name">
            <div class="flex items-center gap-2">
              name
              <p-sortIcon field="name" />
            </div>
          </th>
          <th pSortableColumn="category">
            <div class="flex items-center gap-2">
              category
              <p-sortIcon field="category" />
            </div>
          </th>

          <th pSortableColumn="castingTime">
            <div class="flex items-center gap-2">
              casting time
              <p-sortIcon field="castingTime" />
            </div>
          </th>
          <th pSortableColumn="range">
            <div class="flex items-center gap-2">
              range
              <p-sortIcon field="range" />
            </div>
          </th>
          <th>concentration</th>
          <th>ritual</th>
          <th>material</th>
          <th>actions</th>
        </tr>
      </ng-template>
      <ng-template let-spellCantrip pTemplate="body">
        <tr [class.sc-row-active]="selectedSpellName() === spellCantrip.name">
          <td>{{ spellCantrip.level }}</td>
          <td>{{ spellCantrip.name }}</td>
          <td>{{ spellCantrip.category }}</td>
          <td>{{ spellCantrip.castingTime }}</td>
          <td>{{ spellCantrip.range }}</td>
          <td>
            <p-checkbox [binary]="true" [ngModel]="spellCantrip.concentration" [disabled]="true" />
          </td>
          <td>
            <p-checkbox [binary]="true" [ngModel]="spellCantrip.ritual" [disabled]="true" />
          </td>
          <td>
            <p-checkbox
              [binary]="true"
              [ngModel]="spellCantrip.requiredMaterial"
              [disabled]="true"
            />
          </td>
          <td>
            <p-button
              icon="pi pi-info-circle"
              (onClick)="onInfoClick(op, spellCantrip, $event)"
            ></p-button>

            <p-popover #op (onHide)="clearSelection(spellCantrip.name)">
              <div class="flex flex-column gap-2">
                <p-button
                  label="View Description"
                  icon="pi pi-eye"
                  (onClick)="showSpellDescription(spellCantrip.name, spellCantrip.description)"
                ></p-button>
                <p-button
                  label="Remove Spell"
                  icon="pi pi-trash"
                  (onClick)="removeSpell(spellCantrip)"
                ></p-button>
              </div>
            </p-popover>
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
export class SpellsCantrips implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly zone = inject(NgZone);
  readonly state = inject(SpellsCantripsState);

  knownSpellsCantrips = this.state.state;
  spellsCantrips = computed(() => {
    const knownNames = this.knownSpellsCantrips().map((sc) => sc.name);
    return DND_SPELLS_CANTRIPS.filter((sc) => !knownNames.includes(sc.name));
  });
  addSpellButtonText = 'Add Spell';
  selectedSpellName = signal<string | null>(null);

  form = new FormGroup({
    knownSpells: new FormControl<SpellCantrip[]>([], { nonNullable: true }),
  });

  dialogService = inject(DndDialogService);
  ref: DynamicDialogRef | undefined | null;

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (value.knownSpells) {
        this.state.setState(value.knownSpells);
      }
    });

    effect(() => {
      const stateValue = this.knownSpellsCantrips();
      const currentValue = this.form.controls.knownSpells.value;
      if (!deepEqual(currentValue, stateValue)) {
        this.form.patchValue({ knownSpells: stateValue }, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.formService.addControl('knownSpells', this.form);
  }

  onInfoClick(popover: Popover, spellCantrip: SpellCantrip, event: Event) {
    this.selectedSpellName.set(spellCantrip.name);
    popover.toggle(event);
  }

  clearSelection(name: string) {
    if (this.selectedSpellName() === name) {
      this.selectedSpellName.set(null);
    }
  }

  showSpellDescription(title: string, displayText: string) {
    this.ref = this.dialogService.openSimple(title, displayText);
  }

  showAddSpellDialog() {
    this.ref = this.dialogService.openPickList(
      'Add Spell',
      'Select spells to add to your known spells list.',
      this.spellsCantrips(),
      this.knownSpellsCantrips(),
    );

    this.ref?.onClose.subscribe((pickedSpellsCantrips: SpellCantrip[]) => {
      if (pickedSpellsCantrips) {
        this.zone.run(() => {
          this.form.controls.knownSpells.setValue(pickedSpellsCantrips);
        });
      }
    });
  }

  removeSpell(spellCantrip: SpellCantrip) {
    const current = this.form.controls.knownSpells.value;
    const updatedList = current.filter((sc) => sc.name !== spellCantrip.name);
    this.form.controls.knownSpells.setValue(updatedList);
  }

  ngOnDestroy(): void {
    this.formService.removeControl('knownSpells');
    this.ref?.close();
  }
}
