import { Component, inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
      data: {
        body: content,
        dialogType: 'multiselect',
        allOptions: allOptions,
      },
    });
  }

  openFullscreen(
    header: string,
    component: Component,
  ): DynamicDialogRef<DndDialogComponent> | null {
    return this.primengDialog.open(DndDialogComponent, {
      header: header,
      width: '100vw',
      height: '100vh',
      maximizable: true,
      closeOnEscape: true,
      data: {
        dialogType: 'fullscreen',
        component: component,
      },
    });
  }
}
