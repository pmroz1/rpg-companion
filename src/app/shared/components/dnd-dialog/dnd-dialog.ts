import { AfterViewInit, Component, inject, input, signal } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
export type DndDialogType = 'simple' | 'selection';

@Component({
  selector: '<app-dnd-dynamic-dialog>',
  template: `
    <div>
      <div class="p-4 text-lg">{{ content() }}</div>
      @if (options.length !== 0) {
        select here xdd
      }
      <div class="px-4 flex justify-end">
        <p-button label="Ok" (click)="close()"></p-button>
      </div>
    </div>
  `,
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
  options = this.config?.data?.options || [];

  content = signal<string>('');

  ngAfterViewInit(): void {
    this.content.set(this.config?.data?.body || 'Dialog content goes here.');
  }

  close() {
    this.ref.close();
  }
}
