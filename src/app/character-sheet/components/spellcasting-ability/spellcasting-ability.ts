import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnDestroy,
  computed,
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

export interface SpellcastingAbilityProps {
  spellcastingAbility: string;
  spellcastingModifier: number;
  spellSaveDC: number;
  spellAttackBonus: number;
}

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
          [(ngModel)]="spellcastingAbility"
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
            inputId="integeronly"
            [inputStyle]="{ width: '4rem', textAlign: 'center' }"
            id="spellcasting-modifier"
            [(ngModel)]="spellcastingModifier"
          />
          <label for="spellcasting-modifier" class="field-label number"
            >Spellcasting Modifier</label
          >
        </div>
        <div class="field my-2">
          <p-inputnumber
            inputId="integeronly"
            [inputStyle]="{ width: '4rem', textAlign: 'center' }"
            id="spell-save-dc"
            [(ngModel)]="spellSaveDC"
          />
          <label for="spell-save-dc" class="field-label number">Spell Save DC</label>
        </div>
        <div class="field my-2">
          <p-inputnumber
            inputId="integeronly"
            [inputStyle]="{ width: '4rem', textAlign: 'center' }"
            id="spell-attack-bonus"
            [(ngModel)]="spellAttackBonus"
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

  spellCastingAbilitiesOptions = Object.values(SpellCastingAbilities).map((ability) => ({
    id: ability,
    name: ability,
  }));

  spellcastingAbility = signal('');
  spellcastingModifier = signal(0);
  spellSaveDC = signal(0);
  spellAttackBonus = signal(0);

  spellCastingAbilityProps = computed(
    (): SpellcastingAbilityProps => ({
      spellcastingAbility: this.spellcastingAbility(),
      spellcastingModifier: this.spellcastingModifier(),
      spellSaveDC: this.spellSaveDC(),
      spellAttackBonus: this.spellAttackBonus(),
    }),
  );

  control = new FormControl<SpellcastingAbilityProps>({
    spellcastingAbility: '',
    spellcastingModifier: 0,
    spellSaveDC: 0,
    spellAttackBonus: 0,
  });
  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.spellCastingAbilityProps());
      },
      { injector: this.injector },
    );

    this.formService.addControl('spellCastingAbility', this.control);
  }
  ngOnDestroy(): void {
    this.formService.removeControl('spellCastingAbility');
  }

  // onClassChange(classType: SpellCastingAbilities | null): void {
  //   // this.subclass.set(null);
  //   // this.class.set(classType);
  // }
}
