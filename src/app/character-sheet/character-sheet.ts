import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@shared/services/dynamic-form.service';

import { Appearance } from './components/appearance/appearance';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Info } from './components/info/info';
import { Tabs } from './components/tabs/tabs';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { SpellSlots } from './components/spell-slots/spell-slots';
import { ArmorClass } from './components';
import { ContextMenu } from 'primeng/contextmenu';
import { DndDialogService } from '@app/shared/components/dnd-dialog/dnd-dialog.service';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

@Component({
  selector: 'app-character-sheet',
  imports: [
    ReactiveFormsModule,
    Appearance,
    Info,
    Tabs,
    Proficiencies,
    DndCard,
    JsonPipe,
    SpellSlots,
    ArmorClass,
    ContextMenu,
  ],
  template: `<form [formGroup]="form" class="sheet-grid" #grid>
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

      <app-dnd-card title="spellcasting ability" class="span-4" />
      <app-spell-slots title="spell slots" class="span-5" />
      <app-tabs class="span-9" />
      <app-proficiencies class="span-4" />
      <app-appearance class="span-4" />
      <app-dnd-card title="equipment" class="span-4" />
      <app-dnd-card title="Character Sheet Form Value" class="span-12">{{
        form.value | json
      }}</app-dnd-card>
    </form>
    <p-contextmenu #contextMenu [target]="grid" [model]="items" />`,
  styleUrls: ['./character-sheet.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {
  private readonly dialogService = inject(DndDialogService);
  private readonly characterSheetForm = inject(DynamicFormService);
  readonly form = this.characterSheetForm.getFormGroup();

  @ViewChild('contextMenu') contextMenu: ContextMenu | undefined;

  contextTarget?: string;

  items: MenuItem[] = [
    {
      label: 'Open fullscreen',
      icon: 'pi pi-expand',
      command: (event: MenuItemCommandEvent) => this.onOpenFullscreen(event, this.contextTarget),
    },
    { label: 'Explain', icon: 'pi pi-question', command: () => console.log('explain') },
  ];

  onContextMenu(event: MouseEvent, item: string) {
    this.contextTarget = item;
    this.contextMenu?.show(event);
  }

  onOpenFullscreen(event: MenuItemCommandEvent, target?: string) {
    const menuItem = event.item;
    console.log('menu item used to open:', menuItem);

    if (target) {
      console.log('would open component for target:', target);
      console.log(typeof Info);

      // this.dialogService.openFullscreen(`Fullscreen: ${target}`, );
    }
  }
}
