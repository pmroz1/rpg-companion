import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { ClassType } from '@data/enums';
import { SelectModule } from 'primeng/select';

export interface CharacterInfo {
  name: string;
  background: string;
  race: string;
  class: ClassType;
  subclass: string;
  level: number;
  xp: number;
}

@Component({
  selector: 'sheet-info',
  imports: [DndCard, SelectModule],
  template: ` <app-dnd-card title="Character Info">
    <!-- <p-select [options]="[]"></p-select> -->
  </app-dnd-card>`,
  styleUrls: ['./info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Info {
  private readonly formService = inject(DynamicFormService);

  characterName = signal('');
  background = signal('');
  race = signal('');
  class = signal(ClassType.Barbarian);
  subclass = signal('');
  level = signal(1);
  xp = signal(0);

  characterInfo = computed(
    (): CharacterInfo => ({
      name: this.characterName(),
      background: this.background(),
      race: this.race(),
      class: this.class(),
      subclass: this.subclass(),
      level: this.level(),
      xp: this.xp(),
    }),
  );

  control = new FormControl<CharacterInfo>({
    name: '',
    background: '',
    race: '',
    class: ClassType.Barbarian,
    subclass: '',
    level: 1,
    xp: 0,
  });

  ngOnInit() {
    effect(() => {
      this.control.setValue(this.characterInfo());
    });

    this.formService.addControl('characterInfo', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('characterInfo');
  }
}
