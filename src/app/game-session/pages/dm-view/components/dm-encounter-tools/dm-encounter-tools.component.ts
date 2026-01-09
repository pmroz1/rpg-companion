import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
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
  ],
  template: `
    <div
      class="flex flex-col flex-none overflow-hidden h-full p-0 bg-[var(--color-bg-elevated)] border-l border-[var(--color-gold)]"
      style="width: 600px; min-width: 400px;"
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
            class="flex-1 group !p-4 !text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden !text-[var(--text-muted)] data-[p-active=true]:!text-[var(--color-gold)]"
          >
            <div class="relative z-10 flex items-center justify-center gap-2">
              <i class="pi pi-users text-xs"></i>
              Initiative
            </div>
          </p-tab>

          <p-tab
            value="monsters"
            class="flex-1 group !p-4 !text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden !text-[var(--text-muted)] data-[p-active=true]:!text-[var(--color-gold)]"
          >
            <div class="relative z-10 flex items-center justify-center gap-2">
              <i class="pi pi-book text-xs"></i>
              Monsters
            </div>
          </p-tab>

          <p-tab
            value="players"
            class="flex-1 group !p-4 !text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden !text-[var(--text-muted)] data-[p-active=true]:!text-[var(--color-gold)]"
          >
            <div class="relative z-10 flex items-center justify-center gap-2">
              <i class="pi pi-user text-xs"></i>
              Players
            </div>
          </p-tab>
        </p-tablist>

        <p-tabpanels
          class="flex-1 flex flex-col min-h-0 overflow-hidden relative !p-0 !bg-transparent"
        >
          <p-tabpanel value="initiative" class="flex-1 flex flex-col overflow-hidden h-full !p-0">
            <app-dm-initiative-tab
              (endCombat)="endCombat.emit()"
              (addCombatant)="onTabChange('monsters')"
            />
          </p-tabpanel>

          <p-tabpanel value="players" class="flex-1 flex flex-col overflow-hidden h-full !p-0">
            <app-dm-players-tab />
          </p-tabpanel>

          <p-tabpanel value="monsters" class="flex-1 flex flex-col overflow-hidden h-full !p-0">
            <app-dm-monsters-tab
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmEncounterToolsComponent {
  monsterManual = input.required<DndMonster[]>();
  selectedMonster = input.required<DndMonster | null>();
  selectedMonsterChange = output<DndMonster | null>();
  endCombat = output<void>();

  activeTab = signal<'players' | 'initiative' | 'monsters'>('initiative');

  onTabChange(value: string | number | undefined) {
    if (value === 'players' || value === 'initiative' || value === 'monsters') {
      this.activeTab.set(value);
    }
  }
}
