import { Component, inject, OnInit, signal } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { MultiSelectModule } from 'primeng/multiselect';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
export type DndDialogType = 'simple' | 'picklist' | 'multiselect';

@Component({
  selector: 'app-dnd-dynamic-dialog',
  imports: [Button, PickListModule, MultiSelectModule, TitleCasePipe, FormsModule, DragDropModule],
  template: `
    <div>
      <div class="p-4 text-lg">{{ content() }}</div>
      @switch (dialogType()) {
        @case ('picklist') {
          <p-pickList
            [dragdrop]="true"
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
        @case ('multiselect') {
          <div class="h-75">
            <div class="flex justify-center">
              <p-multiselect
                [options]="allOptions()"
                [(ngModel)]="pickedOptions"
                optionLabel="name"
                placeholder="Select tools"
                [maxSelectedLabels]="5"
                class="w-full md:w-80"
              >
                <ng-template let-tool pTemplate="item">
                  {{ tool.name | titlecase }}
                </ng-template>
                <ng-template let-tool pTemplate="selectedItem">
                  {{ tool.name | titlecase }}
                </ng-template>
              </p-multiselect>
            </div>
          </div>
          <div class="flex justify-end">
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
    if (this.dialogType() === 'picklist' || this.dialogType() === 'multiselect') {
      this.ref.close([...this.pickedOptions()]);
    } else {
      this.ref.close();
    }
  }
}
