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
      data: { body: content },
    });
  }

  openSelect(header: string, content: string, options: any[]): DynamicDialogRef<any> | null {
    return this.primengDialog.open(DndDialogComponent, {
      header: header,
      width: '50vw',
      data: { body: content, options: options },
    });
  }
}
