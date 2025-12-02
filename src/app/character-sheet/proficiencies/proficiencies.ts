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
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicFormService } from '@app/shared/services';
import { ArmorProficiency } from '@data/enums/proficiency.enum';
import { TitleCasePipe } from '@angular/common';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DND_WEAPONS } from '@data/dictionaries';
import { MultiSelectModule } from 'primeng/multiselect';
import { DndWeapon } from '@data/models';
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
  ],
  template: `<app-dnd-card title="Proficiencies">
    <div class="flex">
      <div>
        <label class="field-label">Armor Training</label>
        <div class="p-2"></div>

        <div class="flex flex-col">
          @for (armor of armorProficiencies; let i = $index; track i) {
            <div class="flex items-center p-1">
              <p-checkbox
                [inputId]="armor"
                [name]="armor"
                [value]="armor"
                (onChange)="onTrainingCheckboxChange(armor)"
              />
              <label class="pl-1"> {{ armor | titlecase }} </label>
            </div>
          }
        </div>
      </div>
      <div class="dnd-divider-vertical mx-3.5 my-4 mt-8"></div>
      <div>
        <label class="field-label">Weapons</label>
        <div class="p-1"></div>
        <div class="flex flex-wrap gap-2">
          <p-multiselect
            [options]="weapons"
            [(ngModel)]="weaponTypes"
            optionLabel="name"
            placeholder="Select weapons"
            [maxSelectedLabels]="10"
            class="w-full md:w-100"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          @for (weapon of weapons; let i = $index; track i) {
            <div class="flex items-center p-1">
              <p-checkbox
                [inputId]="weapon.id"
                [name]="weapon.name"
                [value]="weapon.name"
                (onChange)="onWeaponCheckboxChange(weapon)"
              />
              <label class="pl-1"> {{ weapon.name | titlecase }} </label>
            </div>
          }
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
  armorProficiencies = Object.values(ArmorProficiency);
  weapons = [...DND_WEAPONS];
  formModel: any[] = [];
  armorTrainingTypes = signal<string[]>([]);
  weaponTypes = signal<DndWeapon[]>([]);
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
  onWeaponCheckboxChange(weapon: DndWeapon) {
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
  weapons: DndWeapon[];
  tools: string[];
}
