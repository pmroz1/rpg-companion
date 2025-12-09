import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  Injector,
  OnInit,
  OnDestroy,
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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DND_TOOLS } from '@data/dictionaries';
import { DndTool } from '@data/models';
import { DndDialogService } from '@app/shared/components/dnd-dialog/dnd-dialog.service';
import { DndCheckbox } from '@app/shared/components/dnd-checkbox/dnd-checkbox';

export interface ProficienciesInfo {
  armorTrainingTypes: string[];
  weapons: string[];
  tools: DndTool[];
}

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
    DndCheckbox,
  ],
  providers: [DialogService],
  template: `<app-dnd-card title="Proficiencies">
    <div class="flex flex-column">
      <div class="flex flex-col gap-6 items-center w-full">
        <span class="field-label">Armor Training</span>
        <div class="flex flex-row gap-6">
          @for (armor of armorProficiencies; let i = $index; track i) {
            <div class="flex w-full items-center">
              <app-dnd-checkbox
                class="flex w-full items-center"
                (click)="onTrainingCheckboxChange(armor)"
                label="{{ armor | titlecase }} "
              ></app-dnd-checkbox>
            </div>
          }
        </div>

        <div class="flex flex-col gap-2 items-center w-full">
          <span class="field-label">Weapons</span>
          <div class="flex flex-row gap-6">
            @for (weapon of weaponProficiencies; let i = $index; track i) {
              <div class="flex w-full items-center">
                <app-dnd-checkbox
                  class="h-100screen mt-2 mb-auto"
                  (click)="onWeaponCheckboxChange(weapon)"
                  label="{{ weapon | titlecase }}"
                ></app-dnd-checkbox>
              </div>
            }
          </div>
        </div>
        <div class="flex flex-col gap-5 items-center">
          <span class="field-label">Tools</span>
        </div>
        <div class="flex flex-row flex-wrap items-center">
          @for (tool of toolTypes(); track tool.id) {
            <p-chip
              [removable]="true"
              (onRemove)="removeTool(tool)"
              [label]="tool.name | titlecase"
              class="mr-2 mb-2 rounded-md cursor-pointer"
            />
          }
          <p-chip label="Add tool" (click)="show()" class="add-tool-chip mb-2" />
        </div>
      </div>
    </div>
  </app-dnd-card>`,
  styleUrl: './proficiencies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Proficiencies implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);
  private readonly dndDialogService = inject(DndDialogService);
  private readonly control = new FormControl<ProficienciesInfo>({
    armorTrainingTypes: [],
    weapons: [],
    tools: [],
  });

  fn = this.onWeaponCheckboxChange;

  ref: DynamicDialogRef | undefined | null;

  armorProficiencies = Object.values(ArmorProficiency);
  weaponProficiencies = Object.values(WeaponProficiency);
  tools = [...DND_TOOLS];
  armorTrainingTypes = signal<string[]>([]);
  weaponTypes = signal<string[]>([]);
  toolTypes = signal<DndTool[]>([]);

  proficienciesInfo = computed(
    (): ProficienciesInfo => ({
      armorTrainingTypes: this.armorTrainingTypes(),
      weapons: this.weaponTypes(),
      tools: this.toolTypes(),
    }),
  );

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.proficienciesInfo());
      },
      { injector: this.injector },
    );

    this.formService.addControl('proficienciesInfo', this.control);
  }

  show() {
    this.ref = this.dndDialogService.openMultiselect(
      'Select tools',
      ' ',
      this.tools.filter((tool) => !this.toolTypes().includes(tool)),
    );

    this.ref?.onClose.subscribe((selectedTools: DndTool[]) => {
      if (selectedTools && selectedTools.length > 0) {
        const currentTools = this.toolTypes();
        const newTools = selectedTools.filter(
          (tool) => !currentTools.some((t) => t.name === tool.name),
        );
        this.toolTypes.set([...this.toolTypes(), ...newTools]);
      }
    });
  }

  removeTool(tool: DndTool) {
    this.toolTypes.set(this.toolTypes().filter((t) => t.id !== tool.id));
  }

  onWeaponCheckboxChange(weapon: string) {
    console.log(weapon);
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

  ngOnDestroy(): void {
    this.formService.removeControl('proficienciesInfo');
  }
}
