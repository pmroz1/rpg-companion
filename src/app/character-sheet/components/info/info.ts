import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Inject,
  inject,
  Injector,
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
    <!-- <p-select [options]="classTypes" [(ngModel)]="class()"></p-select> -->
  </app-dnd-card>`,
  styleUrls: ['./info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Info {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);
  classTypes = Object.values(ClassType).map((value) => ({ label: value, value }));

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
    effect(
      () => {
        this.control.setValue(this.characterInfo());
      },
      { injector: this.injector },
    );

    this.formService.addControl('characterInfo', this.control);
  }

  ngOnDestroy() {
    this.formService.removeControl('characterInfo');
  }
}
