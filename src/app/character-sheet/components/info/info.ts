import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  signal,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DynamicFormService } from '@app/shared/services';
import { ClassType, SubclassType } from '@data/enums';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DND_CLASSES, DND_SUBCLASSES } from '@data/dictionaries';

export interface CharacterInfo {
  name: string;
  background: string;
  race: string;
  class: ClassType | null;
  subclass: SubclassType | null;
  level: number;
  xp: number;
}

@Component({
  selector: 'sheet-info',
  imports: [DndCard, FormsModule, SelectModule, InputTextModule, InputNumberModule],
  template: ` <app-dnd-card title="Character Info">
    <div class="info-grid">
      <div class="field col-span-2">
        <label for="name" class="field-label">Character Name</label>
        <input
          pInputText
          id="name"
          [ngModel]="characterName()"
          (ngModelChange)="characterName.set($event)"
        />
      </div>

      <div class="field">
        <label for="class-select" class="field-label">Class</label>
        <p-select
          id="class-select"
          [options]="classOptions"
          [ngModel]="class()"
          optionLabel="name"
          optionValue="id"
          (ngModelChange)="onClassChange($event)"
        />
      </div>

      <div class="field">
        <label for="subclass" class="field-label">Subclass</label>
        <p-select
          id="subclass"
          [options]="subclassOptions()"
          [ngModel]="subclass()"
          optionLabel="name"
          optionValue="id"
          (ngModelChange)="subclass.set($event)"
          [disabled]="!class()"
          placeholder="Select a subclass"
        />
      </div>
    </div>
  </app-dnd-card>`,
  styleUrls: ['./info.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Info {
  private readonly formService = inject(DynamicFormService);
  private readonly injector = inject(Injector);

  classOptions = [...DND_CLASSES];
  subclassOptions = computed(() => {
    const currentClass = this.class();
    return DND_SUBCLASSES.filter((s) => s.parentClass === currentClass);
  });

  characterName = signal('');
  background = signal('');
  race = signal('');
  class = signal<null | ClassType>(null);
  subclass = signal<null | SubclassType>(null);
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
    class: ClassType.None,
    subclass: SubclassType.None,
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

  onClassChange(classType: ClassType | null): void {
    this.subclass.set(null);
    this.class.set(classType);
  }
}
