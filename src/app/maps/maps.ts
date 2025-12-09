import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Canvas } from './components';

@Component({
  selector: 'app-maps',
  imports: [ReactiveFormsModule, Canvas, DndCard],
  template: `<app-dnd-card title="Dungeon Map">
    <app-canvas></app-canvas>
  </app-dnd-card>`,
  styleUrls: ['./maps.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Maps {}
