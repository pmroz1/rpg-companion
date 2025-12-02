import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';

@Component({
  selector: 'sheet-tabs',
  imports: [TabsModule, DndCard],
  template: `
    <app-dnd-card title="Character Sheet Tabs" [displayDivider]="false" [displayTitle]="false">
      <p-tabs>
        <p-tablist>
          @for (item of tabs; track $index) {
            <p-tab [value]="$index">
              <span>{{ item.label }}</span>
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
    { label: 'Info', icon: 'pi pi-user' },
    { label: 'Appearance', icon: 'pi pi-image' },
    { label: 'Stats', icon: 'pi pi-chart-bar' },
    { label: 'Abilities', icon: 'pi pi-star' },
    { label: 'Inventory', icon: 'pi pi-briefcase' },
    { label: 'Spells', icon: 'pi pi-book' },
    { label: 'Features', icon: 'pi pi-cog' },
    { label: 'Proficiencies', icon: 'pi pi-check' },
    { label: 'Notes', icon: 'pi pi-pencil' },
  ];
}
