import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AbilityType } from '@data/enums';
import { DND_SKILLS } from '@data/dictionaries';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { DndSkill } from '@data/models';

@Component({
  selector: 'app-ability',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputNumberModule, CheckboxModule],
  template: `
    <div [formGroup]="form" class="ability-container p-3 h-full flex flex-col">
      <div class="text-center font-bold uppercase mb-3 text-[var(--color-gold)] tracking-wider">
        {{ abilityType }}
      </div>

      <div class="flex items-center justify-center gap-6 mb-4">
        <div
          class="flex flex-col items-center border border-[var(--color-border)] rounded-lg p-3 min-w-[5rem] bg-[var(--color-bg-elevated)]"
        >
          <span class="text-[0.65rem] font-bold text-[var(--text-muted)] mb-1 tracking-wide"
            >MODIFIER</span
          >
          <span
            class="text-3xl font-bold"
            [class.text-green-500]="modifier > 0"
            [class.text-red-500]="modifier < 0"
          >
            {{ formatModifier(modifier) }}
          </span>
        </div>

        <div class="flex flex-col items-center">
          <span class="text-[0.65rem] font-bold text-[var(--text-muted)] mb-1 tracking-wide"
            >SCORE</span
          >
          <p-inputNumber
            formControlName="score"
            [showButtons]="true"
            buttonLayout="horizontal"
            spinnerMode="horizontal"
            inputStyleClass="w-12 text-center p-1 font-bold"
            [min]="1"
            [max]="30"
            class="ability-input"
          >
            <ng-template pTemplate="incrementbuttonicon">
              <span class="pi pi-plus text-xs"></span>
            </ng-template>
            <ng-template pTemplate="decrementbuttonicon">
              <span class="pi pi-minus text-xs"></span>
            </ng-template>
          </p-inputNumber>
        </div>
      </div>

      <div
        class="flex items-center gap-3 mb-2 p-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
        formGroupName="savingThrow"
      >
        <p-checkbox formControlName="proficient" [binary]="true"></p-checkbox>
        <p-inputNumber
          formControlName="value"
          [min]="-10"
          [max]="30"
          inputStyleClass="w-12 text-center p-1 text-sm"
          placeholder="-"
        ></p-inputNumber>
        <span class="font-semibold text-sm uppercase tracking-wide text-[var(--text-body)]"
          >Saving Throw</span
        >
      </div>

      <div class="flex flex-col gap-1 mt-2" formGroupName="skills">
        @for (skill of associatedSkills; track skill.id) {
          <div
            [formGroupName]="skill.id"
            class="flex items-center gap-3 p-2 rounded-md hover:bg-[var(--color-hover)] transition-colors"
          >
            <p-checkbox formControlName="proficient" [binary]="true"></p-checkbox>
            <p-inputNumber
              formControlName="value"
              [min]="-10"
              [max]="30"
              inputStyleClass="w-12 text-center p-1 text-sm"
              placeholder="-"
            ></p-inputNumber>
            <span class="text-sm text-[var(--text-body)]">{{ skill.name }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .ability-container {
        border: 1px solid var(--color-border);
        border-radius: 6px;
        background-color: transparent;
      }
      :host ::ng-deep .ability-input .p-inputnumber-input {
        width: 3rem;
        padding: 0.25rem;
        text-align: center;
        background: var(--color-bg);
        color: var(--text-heading);
        border: 1px solid var(--color-border);
      }
      :host ::ng-deep .ability-input .p-button {
        width: 1.5rem;
        padding: 0;
        background: var(--color-bg-elevated);
        border: 1px solid var(--color-border);
        color: var(--text-muted);
      }
      :host ::ng-deep .ability-input .p-button:hover {
        background: var(--color-hover);
        color: var(--color-gold);
      }
      :host ::ng-deep .p-checkbox .p-checkbox-box {
        background: var(--color-bg);
        border: 1px solid var(--color-border);
      }
      :host ::ng-deep .p-checkbox.p-checkbox-checked .p-checkbox-box {
        background: var(--color-gold-dark);
        border-color: var(--color-gold);
        color: var(--text-heading);
      }
      :host ::ng-deep .p-inputnumber-input {
        background: var(--color-bg);
        color: var(--text-body);
        border: 1px solid var(--color-border);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbilityComponent implements OnInit {
  @Input({ required: true }) abilityType!: AbilityType;
  @Input({ required: true }) form!: FormGroup;

  associatedSkills: DndSkill[] = [];

  ngOnInit() {
    this.associatedSkills = DND_SKILLS.filter(
      (skill) => skill.associatedAbility === this.abilityType,
    );
  }

  get modifier(): number {
    const score = this.form.get('score')?.value;
    if (score === undefined || score === null) return 0;
    return Math.floor((score - 10) / 2);
  }

  formatModifier(mod: number): string {
    return (mod > 0 ? '+' : '') + mod;
  }
}
