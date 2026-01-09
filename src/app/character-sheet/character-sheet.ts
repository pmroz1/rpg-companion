import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '@core/form/dynamic-form.service';

import { Appearance } from './components/appearance/appearance';
import { Abilities } from './components/abilities/abilities';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DndGrid, DndGridCell } from '@app/shared/components/dnd-grid/dnd-grid';
import { Info } from './components/info/info';
import { TabsComponent } from './components/tabs/tabs';
import { Proficiencies } from './components/proficiencies/proficiencies';
import { SpellSlots } from './components/spell-slots/spell-slots';
import { ArmorClass } from './components';
import { Hitpoints } from './components/hitpoints/hitpoints';
import { SpellcastingAbility } from './components/spellcasting-ability/spellcasting-ability';
import { ContextMenu } from 'primeng/contextmenu';
import { DndDialogService } from '@app/shared/components/dnd-dialog/dnd-dialog.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fullscreenMap } from './fullscreen.config';
import { Coins } from './components/coins/coins';
import { Languages } from './components/languages/languages';
import { CharacterSheetStateService } from './services/character-sheet.state';

@Component({
  selector: 'app-character-sheet',
  imports: [
    ReactiveFormsModule,
    Appearance,
    Abilities,
    Info,
    TabsComponent,
    Proficiencies,
    DndCard,
    DndGrid,
    DndGridCell,
    SpellSlots,
    ArmorClass,
    ContextMenu,
    Hitpoints,
    SpellcastingAbility,
    Coins,
    Languages,
  ],
  providers: [CharacterSheetStateService],
  template: `<form [formGroup]="form" (contextmenu)="onContextMenu($event, '')">
      <app-dnd-grid>
        <app-dnd-grid-cell [colspan]="5" [rowspan]="2">
          <app-info (contextmenu)="onContextMenu($event, 'app-info')" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="1" [rowspan]="2">
          <app-armor-class (contextmenu)="onContextMenu($event, 'app-armor-class')" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="6" [rowspan]="2">
          <app-hitpoints (contextmenu)="onContextMenu($event, 'app-hitpoints')" />
        </app-dnd-grid-cell>

        <!-- to najlepiej do jakiegoś jednego komponentu 'quickstats' wyciągnąć-->
        <app-dnd-grid-cell [colspan]="2">
          <app-dnd-card title="proficiency" />
          <!-- wartość modyfikatora eg +2; -1; 0; +14 -->
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
          <app-dnd-card title="perception" />
          <!--  wartość modyfikatora eg +2; -1; 0; +14 -->
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="2">
          <app-dnd-card title="inspiration" />
          <!--  checkbox jest/lub nie -->
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="3" [rowspan]="2">
          <app-abilities (contextmenu)="onContextMenu($event, 'app-abilities')" />
        </app-dnd-grid-cell>

        <app-dnd-grid-cell [colspan]="4">
          <app-spellcasting-ability
            (contextmenu)="onContextMenu($event, 'app-spellcasting-ability')"
          />
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
        <app-dnd-grid-cell [colspan]="4">
          <app-coins (contextmenu)="onContextMenu($event, 'app-coins')" />
        </app-dnd-grid-cell>
        <app-dnd-grid-cell [colspan]="4">
          <app-languages (contextmenu)="onContextMenu($event, 'app-languages')" />
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
  private readonly route = inject(ActivatedRoute);
  protected readonly state = inject(CharacterSheetStateService);
  protected readonly formService = inject(DynamicFormService);

  readonly form = this.formService.getFormGroup();

  @ViewChild('contextMenu') contextMenu: ContextMenu | undefined;
  contextTarget?: string;

  items: MenuItem[] = [];

  getMenuItems(target: string): MenuItem[] {
    const config = fullscreenMap.get(target);
    const items: MenuItem[] = [];

    items.push({
      label: `Show form`,
      icon: 'pi pi-file',
      command: () =>
        this.dialogService.openSimple(
          'Character Sheet Form Value',
          `${JSON.stringify(this.form.value, null, 2)}`,
        ),
    });

    items.push({
      label: 'Export Character',
      icon: 'pi pi-download',
      command: () => this.onExport(),
    });

    if (config?.enableFullscreen) {
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

    if (config?.enableExplain) {
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
    event.preventDefault();
    this.contextMenu?.show(event);
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
    // @TODO @FIXME: implement explain functionality
  }

  onExport() {
    const data = this.form.value;
    const characterName = this.form.get('characterInfo.name')?.value || 'character';
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${characterName}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
