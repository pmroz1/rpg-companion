import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DndMonster } from '@data/models';
import { CommonModule } from '@angular/common';
import { DmInitiativeTabComponent } from './tabs/dm-initiative-tab.component';
import { DmMonstersTabComponent } from './tabs/dm-monsters-tab.component';
import { DmPlayersTabComponent } from './tabs/dm-players-tab.component';

@Component({
  selector: 'app-dm-encounter-tools',
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    DmInitiativeTabComponent,
    DmMonstersTabComponent,
    DmPlayersTabComponent,
    ButtonModule,
    TooltipModule,
  ],
  template: `
    <div
      class="flex flex-col flex-none overflow-hidden h-full p-0 bg-[var(--color-bg-elevated)] border-l border-[var(--color-gold)] transition-all duration-300 ease-in-out shadow-2xl z-50"
      [class.absolute]="isExpanded()"
      [class.right-0]="isExpanded()"
      [class.w-full]="isExpanded()"
      [style.width]="isExpanded() ? '100%' : '600px'"
      [style.min-width]="isExpanded() ? '100%' : '400px'"
    >
      <p-tabs
        [value]="activeTab()"
        (valueChange)="onTabChange($event)"
        class="flex-1 flex flex-col overflow-hidden"
      >
        <p-tablist
          class="bg-[var(--color-bg-elevated)] sticky top-0 z-10 border-b border-[var(--color-border)]"
        >
          <p-tab
            value="initiative"
            class="flex-1 group !p-4 !text-xs font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden !text-[var(--text-muted)] data-[p-active=true]:!text-[var(--color-gold)]"
          >
            <div class="relative z-10 flex items-center justify-center gap-2">
              <i class="pi pi-users text-sm"></i>
              Initiative
            </div>
          </p-tab>

          <p-tab
            value="monsters"
            class="flex-1 group !p-4 !text-xs font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden !text-[var(--text-muted)] data-[p-active=true]:!text-[var(--color-gold)]"
          >
            <div class="relative z-10 flex items-center justify-center gap-2">
              <i class="pi pi-book text-sm"></i>
              Monsters
            </div>
          </p-tab>

          <p-tab
            value="players"
            class="flex-1 group !p-4 !text-xs font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden !text-[var(--text-muted)] data-[p-active=true]:!text-[var(--color-gold)]"
          >
            <div class="relative z-10 flex items-center justify-center gap-2">
              <i class="pi pi-user text-sm"></i>
              Players
            </div>
          </p-tab>

          <div class="flex items-center px-2 border-l border-[var(--color-border)]">
            <p-button
              [icon]="isExpanded() ? 'pi pi-angle-double-right' : 'pi pi-angle-double-left'"
              styleClass="p-button-text p-button-sm !text-[var(--color-gold)] hover:!bg-[var(--color-gold-dark)]/10"
              (onClick)="toggleExpand()"
              [pTooltip]="isExpanded() ? 'Collapse' : 'Expand'"
              tooltipPosition="left"
            ></p-button>
          </div>
        </p-tablist>

        <p-tabpanels
          class="flex-1 flex flex-col min-h-0 overflow-hidden relative !p-0 !bg-transparent"
        >
          <p-tabpanel
            value="initiative"
            class="flex-1 flex flex-col overflow-hidden h-full !p-0 w-full"
          >
            <app-dm-initiative-tab
              class="w-full h-full block"
              (endCombat)="endCombat.emit()"
              (addCombatant)="onTabChange('monsters')"
            />
          </p-tabpanel>

          <p-tabpanel
            value="players"
            class="flex-1 flex flex-col overflow-hidden h-full !p-0 w-full"
          >
            <app-dm-players-tab class="w-full h-full block" />
          </p-tabpanel>

          <p-tabpanel
            value="monsters"
            class="flex-1 flex flex-col overflow-hidden h-full !p-0 w-full"
          >
            <app-dm-monsters-tab
              class="w-full h-full block"
              [monsterManual]="monsterManual()"
              [selectedMonster]="selectedMonster()"
              (selectedMonsterChange)="selectedMonsterChange.emit($event)"
            />
          </p-tabpanel>
        </p-tabpanels>
      </p-tabs>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
    :host ::ng-deep {
      .p-tabpanel {
        height: 100%;
      }
      .p-tabpanels {
        height: 100%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmEncounterToolsComponent {
  monsterManual = input.required<DndMonster[]>();
  selectedMonster = input.required<DndMonster | null>();
  selectedMonsterChange = output<DndMonster | null>();
  endCombat = output<void>();

  activeTab = signal<'players' | 'initiative' | 'monsters'>('initiative');
  isExpanded = signal(false);

  onTabChange(value: string | number | undefined) {
    if (value === 'players' || value === 'initiative' || value === 'monsters') {
      this.activeTab.set(value);
    }
  }

  toggleExpand() {
    this.isExpanded.update((v) => !v);
  }
}
