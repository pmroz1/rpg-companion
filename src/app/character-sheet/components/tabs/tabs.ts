import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { ActionsTab } from './views/actions/actions';
import { SpellsCantrips } from './views/spells-cantrips/spells-cantrips';
import { InventoryTab } from './views/inventory/inventory';
import { FeaturesTab } from './views/features/features';
import { TraitsTab } from './views/traits/traits';
import { NotesTab } from './views/notes/notes';

@Component({
  selector: 'sheet-tabs',
  imports: [
    TabsModule,
    DndCard,
    UpperCasePipe,
    ActionsTab,
    SpellsCantrips,
    InventoryTab,
    FeaturesTab,
    TraitsTab,
    NotesTab,
  ],
  template: `
    <app-dnd-card title="Character Sheet Tabs" [displayDivider]="false" [displayTitle]="false">
      <p-tabs [value]="1" class="w-full" scrollable>
        <p-tablist>
          @for (item of tabs; track $index) {
            <p-tab [value]="$index" class="flex-1">
              <span>{{ item.label | uppercase }}</span>
            </p-tab>
          }
        </p-tablist>
        <p-tabpanel [value]="0">
          <tab-actions></tab-actions>
        </p-tabpanel>
        <p-tabpanel [value]="1">
          <tab-spells-cantrips></tab-spells-cantrips>
        </p-tabpanel>
        <p-tabpanel [value]="2">
          <tab-inventory></tab-inventory>
        </p-tabpanel>
        <p-tabpanel [value]="3">
          <tab-features></tab-features>
        </p-tabpanel>
        <p-tabpanel [value]="4">
          <tab-traits></tab-traits>
        </p-tabpanel>
        <p-tabpanel [value]="5">
          <tab-notes></tab-notes>
        </p-tabpanel>
      </p-tabs>
    </app-dnd-card>
  `,
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs {
  tabs = [
    { label: 'Actions' },
    { label: 'Spells & Cantrips' },
    { label: 'Inventory' },
    { label: 'Features' },
    { label: 'Traits' },
    { label: 'Notes' },
  ];
}
