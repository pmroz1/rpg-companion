import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicFormService } from '@app/shared/services';
import { ArmorProficiency } from '@data/enums/proficiency.enum';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-proficiencies',
  imports: [
    FormsModule,
    TitleCasePipe,
    CardModule,
    DividerModule,
    ReactiveFormsModule,
    CheckboxModule,
  ],
  template: `<p-card class="dnd-box p-1 appearance-header" header="ARMOR TRAINING">
    <p-divider class="dnd-divider" />
    @for (armor of armorProficiencies; let i = $index; track i) {
      <div class="flex items-center p-1">
        <p-checkbox
          [formControl]="control"
          [inputId]="armor"
          name="group"
          [value]="armor"
          checkboxIcon="pi-flag-fill"
        />
        <label class="pl-1"> {{ armor | titlecase }} </label>
      </div>
    }
  </p-card>`,
  styleUrl: './proficiencies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Proficiencies {
  private readonly formService = inject(DynamicFormService);
  armorProficiencies = Object.values(ArmorProficiency);
  formModel: any[] = [];
  control = new FormControl('', Validators.required);

  ngOnInit() {
    this.formService.addControl('proficiencies', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('proficiencies');
  }
}
