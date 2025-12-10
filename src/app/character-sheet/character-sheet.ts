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
    JsonPipe,
    SpellSlots,
    ArmorClass,
    ContextMenu,
  ],
  template: `<form [formGroup]="form" class="sheet-grid">
      <app-info class="span-5 row-span-2" (contextmenu)="onContextMenu($event, 'app-info')" />
      <app-armor-class
        class="span-1 row-span-2"
        (contextmenu)="onContextMenu($event, 'app-armor-class')"
      />
      <app-dnd-card
        title="hitpoints"
        class="span-6 row-span-2"
        (contextmenu)="onContextMenu($event, 'hitpoints')"
      />

      <app-dnd-card title="proficiency bonus" class="span-2" />
      <app-dnd-card title="initiative" class="span-2" />
      <app-dnd-card title="speed" class="span-2" />
      <app-dnd-card title="size" class="span-2" />
      <app-dnd-card title="passive perception" class="span-2" />
      <app-dnd-card title="inspiration" class="span-2" />
      <app-dnd-card title="abilities" class="span-3 row-span-2" />

      <app-dnd-card
        title="spellcasting ability"
        class="span-4"
        (contextmenu)="onContextMenu($event, 'app-dnd-card-spellcasting-ability')"
      />

      <app-spell-slots
        title="spell slots"
        class="span-5"
        (contextmenu)="onContextMenu($event, 'app-spell-slots')"
      />

      <app-tabs class="span-9" (contextmenu)="onContextMenu($event, 'app-tabs')" />

      <app-proficiencies
        class="span-4"
        (contextmenu)="onContextMenu($event, 'app-proficiencies')"
      />

      <app-appearance class="span-4" (contextmenu)="onContextMenu($event, 'app-appearance')" />

      <app-dnd-card title="equipment" class="span-4" />
      <app-dnd-card title="Character Sheet Form Value" class="span-12">{{
        form.value | json
      }}</app-dnd-card>
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
        });
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
        .then(() => {
          window.alert('URL copied to clipboard!');
        })
        .catch(() => {
          window.alert('Failed to copy URL to clipboard. Please try again.');
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
