import { AfterViewInit, Component, inject, input, signal } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';

@Component({
  selector: '<app-dnd-dynamic-dialog>',
  template: ` <div>
    <div class="p-4 text-lg">{{ content() }}</div>
    <div class="px-4 flex justify-end">
      <p-button label="Ok" (click)="close()"></p-button>
    </div>
  </div>`,
  styles: `
    :host {
      display: block;
    }
  `,
  imports: [Button],
})
export class DndDialogComponent implements AfterViewInit {
  ref = inject(DynamicDialogRef);
  config = inject(DynamicDialogConfig);

  content = signal<string>('');

  ngAfterViewInit(): void {
    console.log('DndDialogComponent config data:', this.config?.data);
    this.content.set(this.config?.data?.displayText || 'Dialog content goes here.');
  }

  close() {
    this.ref.close();
  }
}
