import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DndDialogComponent } from './dnd-dialog';

@Injectable({
  providedIn: 'root',
}) 
export class DndDialogService {
  primengDialog = inject(DialogService);

  openSimple(header: string, content: string): DynamicDialogRef<any> | null {
    return this.primengDialog.open(DndDialogComponent, {
      header: header,
      width: '50vw',
      closeOnEscape: true,
      data: { body: content },
    });
  }

  openPickList(
    header: string,
    content: string,
    allOptions: any[],
    pickedOptions: any[] = [],
  ): DynamicDialogRef<any> | null {
    return this.primengDialog.open(DndDialogComponent, {
      header: header,
      width: '80vw',
      closeOnEscape: true,
      data: {
        body: content,
        dialogType: 'picklist',
        allOptions: allOptions,
        pickedOptions: pickedOptions,
      },
    });
  }

  openMultiselect(
    header: string,
    content: string,
    allOptions: any[], 
  ): DynamicDialogRef<any> | null {
    return this.primengDialog.open(DndDialogComponent, {
      header: header,
      width: '30vw',
      closeOnEscape: true,
      data: {
        body: content,
        dialogType: 'multiselect',
        allOptions: allOptions,
      },
    });
  }
}
