import { AfterViewChecked, AfterViewInit, Component, inject, input, signal } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DndCard } from '../dnd-card/dnd-card';

@Component({
  selector: '<app-dnd-dynamic-dialog>',
  imports: [DndCard],
  template: `
    <app-dnd-card [title]="header()" [displayDivider]="true" [displayTitle]="false">
      <div class="p-4 text-lg">{{ content() }}</div>
      <div class="w-full flex justify-end p-4"></div>
    </app-dnd-card>
  `,
})
export class DndDialogComponent implements AfterViewInit {
  ref: DynamicDialogRef | undefined;
  config = inject(DynamicDialogConfig);

  header = signal<string>('');
  content = signal<string>('');

  ngAfterViewInit(): void {
    console.log('DndDialogComponent config data:', this.config?.data);
    this.header.set(this.config?.data?.displayHeader || 'Dialog');
    this.content.set(this.config?.data?.displayText || 'Dialog content goes here.');
  }

  close() {
    this.ref?.close({ result: 'ok' });
  }
}
