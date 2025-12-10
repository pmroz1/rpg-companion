import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormService } from '@app/shared/services';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { AbilityCard } from './components/ability-card';

export interface AbilitiesForm {
  strength: AbilityFormDetail;
  dexterity: AbilityFormDetail;
  constitution: AbilityFormDetail;
  intelligence: AbilityFormDetail;
  wisdom: AbilityFormDetail;
  charisma: AbilityFormDetail;
}

export interface AbilityFormDetail {
  score: number;
  modifier: number;
  savingThrowProficient: boolean;
}

@Component({
  selector: 'app-abilities',
  imports: [DndCard, AbilityCard],
  template: `
    <app-dnd-card title="abilities" class="h-full" [hideHeader]="true">
      @for (ability of abilityKeys; track ability) {
        <app-ability-card
          [abilityName]="ability"
          [abilityScore]="this.abilities()[ability].score"
          [abilityModifier]="this.abilities()[ability].modifier"
        ></app-ability-card>
      }
    </app-dnd-card>
  `,
  styleUrls: ['./abilities.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Abilities implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);
  private readonly control = new FormControl<AbilitiesForm | null>(null);

  defaultAbilities = {
    strength: { score: 10, modifier: 0, savingThrowProficient: false },
    dexterity: { score: 11, modifier: 0, savingThrowProficient: false },
    constitution: { score: 12, modifier: 0, savingThrowProficient: false },
    intelligence: { score: 13, modifier: 0, savingThrowProficient: false },
    wisdom: { score: 14, modifier: 0, savingThrowProficient: false },
    charisma: { score: 15, modifier: 0, savingThrowProficient: false },
  };

  abilityKeys = Object.keys(this.defaultAbilities) as (keyof AbilitiesForm)[];
  abilities = signal<AbilitiesForm>(this.defaultAbilities);

  ngOnInit(): void {
    this.formService.addControl('abilities', this.control);
    effect(
      () => {
        this.control.setValue(this.abilities());
      },
      { injector: this.injector },
    );
  }

  ngOnDestroy(): void {
    this.formService.removeControl('abilities');
  }
}
