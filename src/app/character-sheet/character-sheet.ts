import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';

import { Appearance } from './components/appearance/appearance';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DndGrid, DndGridCell } from '@app/shared/components/dnd-grid/dnd-grid';
import { Info } from './components/info/info';
import { TabsComponent } from './components/tabs/tabs';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { SpellSlots } from './components/spell-slots/spell-slots';
import { ArmorClass } from './components';
import { ContextMenu } from 'primeng/contextmenu';
import { DndDialogService } from '@app/shared/components/dnd-dialog/dnd-dialog.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fullscreenMap } from './fullscreen.config';

@Component({
  selector: 'app-character-sheet',
  imports: [
    ReactiveFormsModule,
    Appearance,
    Info,
    TabsComponent,
    Proficiencies,
    DndCard,
    DndGrid,
    DndGridCell,
    JsonPipe,
    SpellSlots,
    ArmorClass,
    ContextMenu,
  ],
  template: `<form [formGroup]="form">
      <app-dnd-grid>
        <app-dnd-grid-cell [colspan]="5" [rowspan]="2">
          <app-info (contextmenu)="onContextMenu($event, 'app-info')" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="1" [rowspan]="2">
          <app-armor-class (contextmenu)="onContextMenu($event, 'app-armor-class')" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="6" [rowspan]="2">
          <app-dnd-card title="hitpoints" />
        </app-dnd-grid-cell>

        <app-dnd-grid-cell [colspan]="2">
          <app-dnd-card title="proficiency bonus" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="2">
          <app-dnd-card title="initiative" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="2">
          <app-dnd-card title="speed" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="2">
          <app-dnd-card title="size" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="2">
          <app-dnd-card title="passive perception" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="2">
          <app-dnd-card title="inspiration" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="3" [rowspan]="2">
          <app-dnd-card title="abilities" />
        </app-dnd-grid-cell>

        <app-dnd-grid-cell [colspan]="4">
          <app-dnd-card title="spellcasting ability" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="5">
          <app-spell-slots
            title="spell slots"
            (contextmenu)="onContextMenu($event, 'app-spell-slots')"
          />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="9">
          <app-tabs (contextmenu)="onContextMenu($event, 'app-tabs')" />
        </app-dnd-grid-cell>

        <app-dnd-grid-cell [colspan]="4">
          <app-proficiencies (contextmenu)="onContextMenu($event, 'app-proficiencies')" />
        </app-dnd-grid-cell>

        <app-dnd-grid-cell [colspan]="4">
          <app-appearance (contextmenu)="onContextMenu($event, 'app-appearance')" />
        </app-dnd-grid-cell>

        <app-dnd-grid-cell [colspan]="4">
          <app-dnd-card title="equipment" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="12">
          <app-dnd-card title="Character Sheet Form Value">{{ form.value | json }}</app-dnd-card>
        </app-dnd-grid-cell>
      </app-dnd-grid>
    </form>
    <p-contextmenu #contextMenu [model]="items"></p-contextmenu>`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly dialogService = inject(DndDialogService);
  private readonly characterSheetForm = inject(DynamicFormService);
  private readonly route = inject(ActivatedRoute);
  readonly form = this.characterSheetForm.getFormGroup();

  @ViewChild('contextMenu') contextMenu: ContextMenu | undefined;
  contextTarget?: string;

  items: MenuItem[] = [];

  getMenuItems(target: string): MenuItem[] {
    const config = fullscreenMap.get(target);
    if (!config) return [];
    const items: MenuItem[] = [];

    if (config.enableFullscreen) {
      items.push({
        label: 'Open fullscreen',
        icon: 'pi pi-expand',
        command: () => this.onOpenFullscreen(target),
      });

      items.push({
        label: 'Copy fullscreen URL',
        icon: 'pi pi-copy',
        command: () => this.onCopyUrl(target),
      });
    }

    if (config.enableExplain) {
      items.push({
        label: 'Explain',
        icon: 'pi pi-question',
        command: () => this.onExplain(),
      });
    }

    return items;
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const component = params.get('component');
      if (component && fullscreenMap.has(component)) {
        setTimeout(() => {
          this.dialogService.openFullscreen(`Fullscreen: ${component}`, component, false);
        }, 0);
      }
    });
  }

  onContextMenu(event: MouseEvent, item: string) {
    this.contextTarget = item;
    this.items = this.getMenuItems(item);
    if (this.items && this.items.length > 0) {
      event.preventDefault();
      this.contextMenu?.show(event);
    } else {
      this.contextMenu?.hide?.();
    }
  }

  onOpenFullscreen(target: string) {
    this.dialogService.openFullscreen(`Fullscreen: ${target}`, target);
  }

  onCopyUrl(target?: string) {
    if (target) {
      const url = `${window.location.origin}/character-sheet/fullscreen/${encodeURIComponent(target)}`;
      navigator.clipboard
        .writeText(url)
        .then(() => null)
        .catch(() => {
          console.log('Failed to copy URL to clipboard. Please try again.');
        });
    }
  }

  onExplain() {
    // @TODO @FIXME: Implement explain functionality
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
