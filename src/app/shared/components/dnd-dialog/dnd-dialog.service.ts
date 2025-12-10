import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DndDialogComponent } from './dnd-dialog';

@Injectable({
  providedIn: 'root',
})
export class DndDialogService {
  primengDialog = inject(DialogService);

  openSimple(header: string, content: string): DynamicDialogRef<DndDialogComponent> | null {
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
    allOptions: unknown[],
    pickedOptions: unknown[] = [],
  ): DynamicDialogRef<DndDialogComponent> | null {
    return this.primengDialog.open(DndDialogComponent, {
      header: header,
      width: '80vw',
      closeOnEscape: true,
      closable: true,
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
    allOptions: unknown[],
  ): DynamicDialogRef<DndDialogComponent> | null {
    return this.primengDialog.open(DndDialogComponent, {
      header: header,
      width: '30vw',
      closeOnEscape: true,
      closable: true,
      data: {
        body: content,
        dialogType: 'multiselect',
        allOptions: allOptions,
      },
    });
  }

  openFullscreen(header: string, component: string): DynamicDialogRef<DndDialogComponent> | null {
    return this.primengDialog.open(DndDialogComponent, {
      header: header,
      width: '100vw',
      height: '100vh',
      styleClass: 'p-dialog-maximized',
      closeOnEscape: true,
      closable: true,
      data: {
        dialogType: 'fullscreen',
        body: component,
      },
    } as Partial<DynamicDialogConfig> & Record<string, unknown>);
  }
}
