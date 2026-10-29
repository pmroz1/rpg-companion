import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DND_MONSTERS } from '@data/dictionaries';
import { DndMonster, Sound } from '@data/models';
import { DmSceneManagerComponent } from './components/dm-scene-manager/dm-scene-manager.component';
import { DmGameBoardComponent } from './components/dm-game-board/dm-game-board.component';
import { DmSecretNotesComponent } from './components/dm-secret-notes/dm-secret-notes.component';
import { DmEncounterToolsComponent } from './components/dm-encounter-tools/dm-encounter-tools.component';

@Component({
  selector: 'app-dm-view',
  imports: [
    DmSceneManagerComponent,
    DmGameBoardComponent,
    DmSecretNotesComponent,
    DmEncounterToolsComponent,
  ],
  template: `
    <div class="flex flex-row h-full w-full overflow-hidden">
      <app-dm-scene-manager
        [scenes]="scenes"
        [activeScene]="activeScene()"
        (activeSceneChange)="activeScene.set($event)"
        [sounds]="sounds()"
        (soundsChange)="sounds.set($event)"
      ></app-dm-scene-manager>

      <app-dm-game-board [activeScene]="activeScene()" [dockItems]="dockItems">
        <app-dm-secret-notes notes></app-dm-secret-notes>
      </app-dm-game-board>

      <app-dm-encounter-tools
        [monsterManual]="monsterManual"
        [selectedMonster]="selectedMonster()"
        (selectedMonsterChange)="selectedMonster.set($event)"
      ></app-dm-encounter-tools>
    </div>
  `,
  styleUrls: ['./dm-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmView {
  readonly scenes = [
    { name: 'The Bloated Dwarf Inn' },
    { name: 'Bandit ambush' },
    { name: 'The Dark Forest - Entrance' },
  ];

  readonly monsterManual = [...DND_MONSTERS];
  protected readonly selectedMonster = signal<DndMonster | null>(null);
  protected readonly sounds = signal<Sound[]>([]);
  protected readonly activeScene = signal(this.scenes[0]);

  readonly dockItems: MenuItem[] = [
    { id: 'select', label: 'Select', icon: 'pi pi-arrow-up', disabled: true },
    { id: 'brush', label: 'Brush', icon: 'pi pi-pencil', disabled: true },
    { id: 'erase', label: 'Erase', icon: 'pi pi-eraser', disabled: true },
    { id: 'ping', label: 'Ping', icon: 'pi pi-map-marker', disabled: true },
    { id: 'measure', label: 'Measure', icon: 'pi pi-arrows-h', disabled: true },
  ];
}
