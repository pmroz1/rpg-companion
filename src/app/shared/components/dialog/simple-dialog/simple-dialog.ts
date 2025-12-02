import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DndCard } from '../../dnd-card/dnd-card';

@Component({
  selector: 'app-simple-dialog',
  imports: [DndCard],
  template: `<app-dnd-card title="{{ title() }}">{{ content() }}</app-dnd-card>`,
  styleUrl: './simple-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDialog {
  title = input.required<string>();
  content = input.required<string>();
}
