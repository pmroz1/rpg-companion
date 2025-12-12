import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  effect,
  Injector,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SpellCastingAbilities } from '@data/enums';
import { SelectModule } from 'primeng/select';
import { SpellcastingAbilityState } from './spellcasting-ability.state';
import { SpellcastingStats } from './model/spellcasting';

@Component({
  selector: 'app-spellcasting-ability',
  imports: [DndCard, FormsModule, InputTextModule, InputNumberModule, SelectModule],
  template: `<app-dnd-card title="Spellcasting Ability">
    <div class="spellcasting-grid">
      <div class="field col-gap  my-1">
        <label for="spellcasting-ability" class="field-label">Spellcasting Ability</label>
        <p-select
          id="spellcasting-ability"
          [options]="spellCastingAbilitiesOptions"
          [ngModel]="spellCastingState().spellcastingAbility"
          (ngModelChange)="state.updateState({ spellcastingAbility: $event })"
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
            [ngModel]="spellCastingState().spellcastingModifier"
            (ngModelChange)="state.updateState({ spellcastingModifier: $event })"
          />
          <label for="spellcasting-modifier" class="field-label number"
            >Spellcasting Modifier</label
          >
        </div>
        <div class="field my-2">
          <p-inputnumber
            [inputStyle]="{ width: '4rem', textAlign: 'center' }"
            id="spell-save-dc"
            [ngModel]="spellCastingState().spellSaveDC"
            (ngModelChange)="state.updateState({ spellSaveDC: $event })"
          />
          <label for="spell-save-dc" class="field-label number">Spell Save DC</label>
        </div>
        <div class="field my-2">
          <p-inputnumber
            [inputStyle]="{ width: '4rem', textAlign: 'center' }"
            id="spell-attack-bonus"
            [ngModel]="spellCastingState().spellAttackBonus"
            (ngModelChange)="state.updateState({ spellAttackBonus: $event })"
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
  private readonly injector = inject(Injector);
  readonly state = inject(SpellcastingAbilityState);

  spellCastingAbilitiesOptions = Object.values(SpellCastingAbilities).map((ability) => ({
    id: ability,
    name: ability,
  }));

  spellCastingState = this.state.state;

  control = new FormControl<SpellcastingStats>(this.spellCastingState());
  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.spellCastingState());
      },
      { injector: this.injector },
    );

    this.formService.addControl('spellCastingAbility', this.control);
  }
  ngOnDestroy(): void {
    this.formService.removeControl('spellCastingAbility');
  }
}
