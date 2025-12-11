import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { MapCanvas } from './components';
import { MenubarModule } from 'primeng/menubar';
import { MapToolbox } from './components/map-toolbox/map-toolbox';

@Component({
  selector: 'app-map-editor',
  imports: [ReactiveFormsModule, MapCanvas, DndCard, MenubarModule, MapToolbox],
  template: `<app-dnd-card title="Dungeon Map">
    <app-map-toolbox></app-map-toolbox>
    <app-map-canvas></app-map-canvas>
  </app-dnd-card>`,
  styleUrls: ['./map-editor.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapEditor {}
