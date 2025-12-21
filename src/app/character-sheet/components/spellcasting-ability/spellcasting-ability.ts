import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  effect,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SpellCastingAbilities } from '@data/enums';
import { SelectModule } from 'primeng/select';
import { SpellcastingAbilityState } from './spellcasting-ability.state';
import { SpellcastingStats } from './model/spellcasting';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-spellcasting-ability',
  imports: [
    DndCard,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    ReactiveFormsModule,
  ],
  template: `<app-dnd-card title="Spellcasting Ability">
    <div class="spellcasting-grid">
      <div class="field col-gap  my-1">
        <label for="spellcasting-ability" class="field-label">Spellcasting Ability</label>
        <p-select
          id="spellcasting-ability"
          [options]="spellCastingAbilitiesOptions"
          [formControl]="form.controls['spellcastingAbility']"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a spellcasting ability"
        />
      </div>
      <div class="my-1 relative"><div class="dnd-divider w-auto"></div></div>
      <div class="spellcasting-stats relative">
        <div class="my-1"><div class="dnd-divider-vertical"></div></div>
        <div class="field my-2">
          <p-inputnumber
            [inputStyle]="{ width: '4rem', textAlign: 'center' }"
            id="spellcasting-modifier"
            [formControl]="form.controls['spellcastingModifier']"
          />
          <label for="spellcasting-modifier" class="field-label number"
            >Spellcasting Modifier</label
          >
        </div>
        <div class="field my-2">
          <p-inputnumber
            [inputStyle]="{ width: '4rem', textAlign: 'center' }"
            id="spell-save-dc"
            [formControl]="form.controls['spellSaveDC']"
          />
          <label for="spell-save-dc" class="field-label number">Spell Save DC</label>
        </div>
        <div class="field my-2">
          <p-inputnumber
            [inputStyle]="{ width: '4rem', textAlign: 'center' }"
            id="spell-attack-bonus"
            [formControl]="form.controls['spellAttackBonus']"
          />
          <label for="spell-attack-bonus" class="field-label number">Spell Attack Bonus</label>
        </div>
      </div>
    </div>
  </app-dnd-card>`,
  styleUrl: './spellcasting-ability.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellcastingAbility implements OnDestroy, OnInit {
  private readonly formService = inject(DynamicFormService);
  readonly state = inject(SpellcastingAbilityState);

  spellCastingAbilitiesOptions = Object.values(SpellCastingAbilities).map((ability) => ({
    id: ability,
    name: ability,
  }));

  spellCastingState = this.state.state;

  form = new FormGroup({
    spellcastingAbility: new FormControl<SpellCastingAbilities>(
      SpellCastingAbilities.Intelligence,
      { nonNullable: true },
    ),
    spellcastingModifier: new FormControl<number>(0, { nonNullable: true }),
    spellSaveDC: new FormControl<number>(0, { nonNullable: true }),
    spellAttackBonus: new FormControl<number>(0, { nonNullable: true }),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.state.updateState(value as Partial<SpellcastingStats>);
    });

    effect(() => {
      const currentState = this.spellCastingState();
      this.form.controls['spellcastingAbility'].setValue(
        currentState.spellcastingAbility as SpellCastingAbilities,
        { emitEvent: false },
      );
      this.form.controls['spellcastingModifier'].setValue(currentState.spellcastingModifier, {
        emitEvent: false,
      });
      this.form.controls['spellSaveDC'].setValue(currentState.spellSaveDC, { emitEvent: false });
      this.form.controls['spellAttackBonus'].setValue(currentState.spellAttackBonus, {
        emitEvent: false,
      });
    });
  }

  ngOnInit(): void {
    this.formService.addControl('spellCastingAbility', this.form);
  }
  ngOnDestroy(): void {
    this.formService.removeControl('spellCastingAbility');
  }
}
