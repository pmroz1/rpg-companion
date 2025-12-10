import { inject, Injectable, Injector, ApplicationRef } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DndDialogComponent } from './dnd-dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DndDialogService {
  private primengDialog = inject(DialogService);
  private router = inject(Router);
  private location = inject(Location);
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private document = inject(DOCUMENT);

  private isFullscreenOpen = false;
  private secondaryDialog: DialogService | null = null;

  private ensureSecondaryDialog(): void {
    if (this.isFullscreenOpen && !this.secondaryDialog) {
      this.secondaryDialog = new DialogService(this.appRef, this.injector, this.document);
    }
  }

  private getDialogService(): DialogService {
    return this.isFullscreenOpen && this.secondaryDialog
      ? this.secondaryDialog
      : this.primengDialog;
  }

  openSimple(header: string, content: string): DynamicDialogRef<DndDialogComponent> | null {
    this.ensureSecondaryDialog();
    return this.getDialogService().open(DndDialogComponent, {
      header,
      width: '50vw',
      closeOnEscape: true,
      baseZIndex: 10000,
      data: { body: content },
    });
  }

  openPickList(
    header: string,
    content: string,
    allOptions: unknown[],
    pickedOptions: unknown[] = [],
  ): DynamicDialogRef<DndDialogComponent> | null {
    this.ensureSecondaryDialog();
    return this.getDialogService().open(DndDialogComponent, {
      header,
      width: '80vw',
      closeOnEscape: true,
      closable: true,
      baseZIndex: 10000,
      modal: true,
      appendTo: 'body',
      data: {
        body: content,
        dialogType: 'picklist',
        allOptions,
        pickedOptions,
      },
    });
  }

  openMultiselect(
    header: string,
    content: string,
    allOptions: unknown[],
  ): DynamicDialogRef<DndDialogComponent> | null {
    this.ensureSecondaryDialog();
    return this.getDialogService().open(DndDialogComponent, {
      header,
      width: '30vw',
      closeOnEscape: true,
      closable: true,
      baseZIndex: 10000,
      modal: true,
      appendTo: 'body',
      data: {
        body: content,
        dialogType: 'multiselect',
        allOptions,
      },
    });
  }

  openFullscreen(
    header: string,
    component: string,
    updateUrl = true,
  ): DynamicDialogRef<DndDialogComponent> | null {
    if (updateUrl) {
      this.router.navigate(['/character-sheet/fullscreen', component]);
    }

    this.isFullscreenOpen = true;

    const ref = this.primengDialog.open(DndDialogComponent, {
      header,
      width: '100vw',
      height: '100vh',
      styleClass: 'p-dialog-maximized',
      closeOnEscape: true,
      closable: true,
      baseZIndex: 1000,
      modal: false,
      dismissableMask: false,
      data: {
        dialogType: 'fullscreen',
        body: component,
      },
    } as Partial<DynamicDialogConfig> & Record<string, unknown>);

    if (ref) {
      ref.onDestroy.subscribe(() => {
        this.isFullscreenOpen = false;
        if (updateUrl) {
          this.location.replaceState('/character-sheet');
        }
      });
    }

    return ref;
  }
}
