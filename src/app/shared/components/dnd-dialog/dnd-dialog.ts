import { Component, inject, OnInit, signal, Type } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgComponentOutlet, TitleCasePipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

export type DndDialogType = 'simple' | 'picklist' | 'multiselect' | 'fullscreen';

@Component({
  selector: 'app-dnd-dynamic-dialog',
  imports: [
    Button,
    PickListModule,
    MultiSelectModule,
    TitleCasePipe,
    NgComponentOutlet,
    FormsModule,
    DragDropModule,
    NgStyle,
  ],
  template: `
    <div>
      <div class="p-4 text-lg">
        @if (dialogType() !== 'fullscreen') {
          @if (dialogType() === 'simple') {
            <div class="whitespace-pre-wrap break-words">{{ content() }}</div>
          } @else {
            <div class="font-medium mb-2">
              Select {{ dialogType() === 'picklist' ? 'items' : 'tools' }}:
            </div>
          }
        }
      </div>
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
        @case ('fullscreen') {
          <ng-container *ngComponentOutlet="fullscreenComponent()"></ng-container>
        }
        @default {
          <div
            [class]="
              dialogType() === 'simple'
                ? 'flex flex-row absolute right-10 bottom-5 pt-10 justify-end'
                : 'p-4 flex justify-end'
            "
          >
            @if (dialogType() === 'simple') {
              <p-button severity="secondary" class="pr-2" label="copy" (click)="copy()"></p-button>
            }
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
  allOptions = signal<unknown[]>([]);
  pickedOptions = signal<unknown[]>([]);
  fullscreenComponent = signal<Type<unknown> | null>(null);

  async ngOnInit(): Promise<void> {
    this.dialogType.set(this.config.data?.dialogType || 'simple');
    this.content.set(this.config.data?.body || 'Dialog content goes here.');
    this.allOptions.set(this.config.data?.allOptions || []);
    this.pickedOptions.set(this.config.data?.pickedOptions || []);

    if (this.dialogType() === 'fullscreen') {
      const { fullscreenMap } = await import('@app/character-sheet/fullscreen.config');
      const config = fullscreenMap.get(this.content());
      this.fullscreenComponent.set(config?.component ?? null);
    }
  }

  cancel() {
    this.ref.close();
  }

  async copy(): Promise<void> {
    const html = this.content();
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent ?? tmp.innerText ?? '';

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {
        console.error('Copy to clipboard failed.');
      }
      textarea.remove();
    }
  }

  close() {
    if (this.dialogType() === 'picklist' || this.dialogType() === 'multiselect') {
      this.ref.close([...this.pickedOptions()]);
    } else {
      this.ref.close();
    }
  }
}
