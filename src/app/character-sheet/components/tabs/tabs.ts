import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
@Component({
  selector: 'sheet-tabs',
  imports: [TabsModule, DndCard, UpperCasePipe],
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
