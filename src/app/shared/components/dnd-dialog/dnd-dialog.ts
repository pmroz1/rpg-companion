import { Component, inject, OnInit, signal } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';

export type DndDialogType = 'simple' | 'picklist';

@Component({
  selector: 'app-dnd-dynamic-dialog',
  imports: [Button, PickListModule],
  template: `
    <div>
      <div class="p-4 text-lg">{{ content() }}</div>
      @switch (dialogType()) {
        @case ('picklist') {
          <p-pickList
            [source]="allOptions()"
            [target]="pickedOptions()"
            filterBy="name"
          ></p-pickList>

          <div class="py-4 flex justify-end">
            <p-button
              severity="secondary"
              class="pr-2"
              label="cancel"
              (click)="cancel()"
            ></p-button>
            <p-button label="save" (click)="close()"></p-button>
          </div>
        }
        @default {
          <div class="px-4 flex justify-end">
            <p-button label="close" (click)="close()"></p-button>
          </div>
        }
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class DndDialogComponent implements OnInit {
  ref = inject(DynamicDialogRef);
  config = inject(DynamicDialogConfig);
  options = signal<any[]>([]);
  dialogType = signal<DndDialogType>('simple');
  content = signal<string>('');
  allOptions = signal<any[]>([]);
  pickedOptions = signal<any[]>([]);

  ngOnInit(): void {
    this.dialogType.set(this.config.data?.dialogType || 'simple');
    this.content.set(this.config.data?.body || 'Dialog content goes here.');
    this.allOptions.set(this.config.data?.allOptions || []);
    this.pickedOptions.set(this.config.data?.pickedOptions || []);
  }

  cancel() {
    this.ref.close();
  }

  close() {
    if (this.dialogType() === 'picklist') {
      this.ref.close([...this.pickedOptions()]);
    } else {
      this.ref.close();
    }
  }
}
