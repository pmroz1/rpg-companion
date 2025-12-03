import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  Injector,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicFormService } from '@app/shared/services';
import { ArmorProficiency, WeaponProficiency } from '@data/enums/proficiency.enum';
import { TitleCasePipe } from '@angular/common';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { AddToolDialog } from './dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-proficiencies',
  imports: [
    FormsModule,
    TitleCasePipe,
    CardModule,
    DividerModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CheckboxModule,
    DndCard,
    ChipModule,
  ],
  providers: [DialogService],
  template: `<app-dnd-card title="Proficiencies">
    <div class="flex flex-column">
      <div class="flex flex-col gap-6 items-center w-full">
        <label class="field-label">Armor Training</label>
        <div class="flex flex-row gap-6">
          @for (armor of armorProficiencies; let i = $index; track i) {
            <div class="flex w-full items-center">
              <p-checkbox
                [inputId]="armor"
                [name]="armor"
                [value]="armor"
                (onChange)="onTrainingCheckboxChange(armor)"
              />
              <label class="pl-2"> {{ armor | titlecase }} </label>
            </div>
          }
        </div>

        <!-- Weapons Section -->

        <div class="flex flex-col gap-2 items-center w-full">
          <label class="field-label">Weapons</label>
          <div class="flex flex-row gap-6">
            @for (weapon of weaponProficiencies; let i = $index; track i) {
              <div class="flex w-full items-center">
                <p-checkbox
                  [inputId]="weapon"
                  [name]="weapon"
                  [value]="weapon"
                  (onChange)="onWeaponCheckboxChange(weapon)"
                />
                <label class="pl-2"> {{ weapon | titlecase }} </label>
              </div>
            }
          </div>
        </div>
        <div class="flex flex-col gap-2 items-center w-full">
          <label class="field-label">Tools</label>
        </div>
        <div class="flex flex-row items-center w-full">
          @for (weapon of weaponProficiencies; let i = $index; track i) {
            <div class="flex items-center">
              <p-chip [label]="weapon | titlecase" />
            </div>
          }
          <div class="flex items-center">
            <p-chip label="Add tool" (click)="show()" class="add-tool-chip" />
          </div>
        </div>
      </div>
    </div>
  </app-dnd-card>`,
  styleUrl: './proficiencies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Proficiencies {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(DialogService);
  armorProficiencies = Object.values(ArmorProficiency);
  weaponProficiencies = Object.values(WeaponProficiency);
  formModel: any[] = [];
  armorTrainingTypes = signal<string[]>([]);
  weaponTypes = signal<string[]>([]);
  toolTypes = signal<string[]>([]);

  control = new FormControl<ProficienciesInfo>({
    armorTrainingTypes: [],
    weapons: [],
    tools: [],
  });

  proficienciesInfo = computed(
    (): ProficienciesInfo => ({
      armorTrainingTypes: this.armorTrainingTypes(),
      weapons: this.weaponTypes(),
      tools: this.toolTypes(),
    }),
  );
  ref: DynamicDialogRef | undefined | null;

  show() {
    this.ref = this.dialogService.open(AddToolDialog, {
      header: 'Select a tool',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 5000,
      closable: true,
    });
  }
  onWeaponCheckboxChange(weapon: string) {
    if (this.weaponTypes().includes(weapon)) {
      this.weaponTypes.set(this.weaponTypes().filter((a) => a !== weapon));
    } else {
      this.weaponTypes.set([...this.weaponTypes(), weapon]);
    }
  }
  onTrainingCheckboxChange(armor: string) {
    if (this.armorTrainingTypes().includes(armor)) {
      this.armorTrainingTypes.set(this.armorTrainingTypes().filter((a) => a !== armor));
    } else {
      this.armorTrainingTypes.set([...this.armorTrainingTypes(), armor]);
    }
  }
  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.proficienciesInfo());
      },
      { injector: this.injector },
    );

    this.formService.addControl('proficienciesInfo', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('proficienciesInfo');
  }
}

export interface ProficienciesInfo {
  armorTrainingTypes: string[];
  weapons: string[];
  tools: string[];
}
