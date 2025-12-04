import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DND_TOOLS } from '@data/dictionaries';
import { MultiSelectModule } from 'primeng/multiselect';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DndTool } from '@data/models';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
@Component({
  template: `
    <app-dnd-card title="Select Tool Proficiencies">
      <div class="flex justify-center my-2">
        <p-multiselect
          [options]="tools"
          optionLabel="name"
          placeholder="Select tools"
          [maxSelectedLabels]="1"
          [(ngModel)]="selectedTools"
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
      <div class="py-32"></div>
      <div class="flex justify-center gap-2">
        <p-button type="button" label="OK" (click)="close(true)"></p-button>
        <p-button type="button" label="Cancel" (click)="close(false)"></p-button>
      </div>
    </app-dnd-card>
  `,
  providers: [],
  imports: [MultiSelectModule, DndCard, Button, FormsModule, TitleCasePipe],
})
export class AddToolDialog {
  selectedTools: DndTool[] = [];
  dialogRef = inject(DynamicDialogRef);
  dialogConfig = inject(DynamicDialogConfig);
  tools: DndTool[] = [...DND_TOOLS].filter(
    (tool) => !this.dialogConfig.data.existingTools.includes(tool),
  );
  close = (confirm: boolean) => {
    if (confirm) {
      this.dialogRef.close(this.selectedTools);
    } else {
      this.dialogRef.close();
    }
  };
}
