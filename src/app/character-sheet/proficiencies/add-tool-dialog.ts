import { Component, inject, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DND_TOOLS } from '@data/dictionaries';
import { MultiSelectModule } from 'primeng/multiselect';
import { DndCard } from "@app/shared/components/dnd-card/dnd-card";
import { DndTool } from '@data/models';
import { Button } from "primeng/button";
import { FormsModule } from '@angular/forms';
@Component({
  template: `
    <app-dnd-card title="Select Tool Proficiencies">
      <p-multiselect
        [options]="tools"
        optionLabel="name"
        placeholder="Select tools"
        [maxSelectedLabels]="1"
        [(ngModel)]="selectedTools"
        class="w-full md:w-80"
      />
      <div class="mt-4 flex justify-end gap-2">
        <p-button type="button" label="Cancel" (click)="close(false)"></p-button>
        <p-button type="button" label="OK" (click)="close(true)"></p-button>
      </div>
      <div class="m-50"></div>
    </app-dnd-card>
  `,
  providers: [DialogService],
  imports: [MultiSelectModule, DndCard, Button, FormsModule],
})
export class AddToolDialog {
  selectedTools: DndTool[] = [];
  tools = [...DND_TOOLS];
  dialogRef = inject(DynamicDialogRef);
  close = (confirm: boolean) => {
    if (confirm) {
      this.dialogRef.close(this.selectedTools);
    } else {
      this.dialogRef.close();
    }
  };
}
