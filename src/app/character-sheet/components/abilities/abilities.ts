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
import { AbilitiesForm } from './models/abilities-form';

@Component({
  selector: 'app-abilities',
  imports: [DndCard, AbilityCard],
  template: `
    <app-dnd-card title="abilities" class="h-full" [hideHeader]="true">
      @for (ability of abilityKeys; track ability) {
        <app-ability-card [(ability)]="abilities()[ability]"></app-ability-card>
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
    strength: {
      name: 'Strength',
      score: 10,
      modifier: 0,
      savingThrowProficient: false,
      proficient: false,
    },
    dexterity: {
      name: 'Dexterity',
      score: 11,
      modifier: 0,
      savingThrowProficient: false,
      proficient: false,
    },
    constitution: {
      name: 'Constitution',
      score: 12,
      modifier: 0,
      savingThrowProficient: false,
      proficient: false,
    },
    intelligence: {
      name: 'Intelligence',
      score: 13,
      modifier: 0,
      savingThrowProficient: false,
      proficient: false,
    },
    wisdom: {
      name: 'Wisdom',
      score: 14,
      modifier: 0,
      savingThrowProficient: false,
      proficient: false,
    },
    charisma: {
      name: 'Charisma',
      score: 15,
      modifier: 0,
      savingThrowProficient: false,
      proficient: false,
    },
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
