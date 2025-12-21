import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ProficienciesState } from './proficiencies.state';
import { ProficienciesInfo } from './model/proficiencies-info';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
                [checked]="proficienciesState().armorTrainingTypes.includes(armor)"
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
                  [checked]="proficienciesState().weapons.includes(weapon)"
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
          @for (tool of this.proficienciesState().tools; track tool.id) {
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
  private readonly dndDialogService = inject(DndDialogService);
  readonly state = inject(ProficienciesState);

  armorProficiencies = Object.values(ArmorProficiency);
  weaponProficiencies = Object.values(WeaponProficiency);
  tools = [...DND_TOOLS];

  proficienciesState = this.state.state;
  ref: DynamicDialogRef | undefined | null;
  form = new FormGroup({
    armorTrainingTypes: new FormControl<string[]>([], { nonNullable: true }),
    weapons: new FormControl<string[]>([], { nonNullable: true }),
    tools: new FormControl<DndTool[]>([], { nonNullable: true }),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.state.updateState(value as Partial<ProficienciesInfo>);
    });

    effect(() => {
      const stateValue = this.proficienciesState();
      this.form.patchValue(stateValue, { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.formService.addControl('proficienciesInfo', this.form);
  }

  show() {
    this.ref = this.dndDialogService.openMultiselect(
      'Select tools',
      ' ',
      this.tools.filter((tool) => !this.proficienciesState().tools.includes(tool)),
    );

    this.ref?.onClose.subscribe((selectedTools: DndTool[]) => {
      if (selectedTools && selectedTools.length > 0) {
        const currentTools = this.proficienciesState().tools;
        const newTools = selectedTools.filter(
          (tool) => !currentTools.some((t) => t.name === tool.name),
        );
        this.state.updateState({ tools: [...currentTools, ...newTools] });
      }
    });
  }

  removeTool(tool: DndTool) {
    this.state.updateState({
      tools: this.proficienciesState().tools.filter((t) => t.id !== tool.id),
    });
  }

  onWeaponCheckboxChange(weapon: string) {
    if (this.proficienciesState().weapons.includes(weapon)) {
      this.state.updateState({
        weapons: this.proficienciesState().weapons.filter((a) => a !== weapon),
      });
    } else {
      this.state.updateState({ weapons: [...this.proficienciesState().weapons, weapon] });
    }
  }

  onTrainingCheckboxChange(armor: string) {
    if (this.proficienciesState().armorTrainingTypes.includes(armor)) {
      this.state.updateState({
        armorTrainingTypes: this.proficienciesState().armorTrainingTypes.filter((a) => a !== armor),
      });
    } else {
      this.state.updateState({
        armorTrainingTypes: [...this.proficienciesState().armorTrainingTypes, armor],
      });
    }
  }

  ngOnDestroy(): void {
    this.formService.removeControl('proficienciesInfo');
  }
}
