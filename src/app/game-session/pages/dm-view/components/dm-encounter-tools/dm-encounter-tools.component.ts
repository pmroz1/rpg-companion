import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { DndMonster } from '@data/models';
import { CommonModule } from '@angular/common';
import { MonsterStatBlockComponent } from '../monster-stat-block/monster-stat-block.component';

@Component({
  selector: 'app-dm-encounter-tools',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    SelectModule,
    FormsModule,
    TooltipModule,
    MonsterStatBlockComponent,
  ],
  template: `
    <div
      class="flex flex-col flex-none overflow-hidden h-full p-0 bg-[var(--color-bg-elevated)] border-l border-[var(--color-gold)]"
      style="width: 600px; min-width: 400px;"
    >
      <div
        class="flex border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] sticky top-0 z-10"
      >
        <button
          class="flex-1 py-4 px-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group overflow-hidden"
          [class.text-[var(--color-gold)]]="activeTab() === 'initiative'"
          [class.text-[var(--text-muted)]]="activeTab() !== 'initiative'"
          (click)="activeTab.set('initiative')"
        >
          <div
            class="absolute inset-0 bg-[var(--color-gold)]/5 scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"
            [class.scale-y-100]="activeTab() === 'initiative'"
          ></div>

          <div class="relative z-10 flex items-center justify-center gap-2">
            <i class="pi pi-users text-xs"></i>
            Initiative
          </div>

          <div
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-gold)] transform scale-x-0 transition-transform duration-300"
            [class.scale-x-100]="activeTab() === 'initiative'"
          ></div>
        </button>

        <button
          class="flex-1 py-4 px-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group overflow-hidden"
          [class.text-[var(--color-gold)]]="activeTab() === 'monsters'"
          [class.text-[var(--text-muted)]]="activeTab() !== 'monsters'"
          (click)="activeTab.set('monsters')"
        >
          <div
            class="absolute inset-0 bg-[var(--color-gold)]/5 scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"
            [class.scale-y-100]="activeTab() === 'monsters'"
          ></div>

          <div class="relative z-10 flex items-center justify-center gap-2">
            <i class="pi pi-book text-xs"></i>
            Monsters
          </div>

          <div
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-gold)] transform scale-x-0 transition-transform duration-300"
            [class.scale-x-100]="activeTab() === 'monsters'"
          ></div>
        </button>
      </div>

      <div class="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        @if (activeTab() === 'initiative') {
          <div class="flex flex-col h-full bg-[#1a1612]">
            <div
              class="flex items-center gap-3 p-4 border-b border-[var(--color-border)] w-full bg-[var(--color-bg-elevated)] shrink-0"
            >
              <h3
                class="text-[10px] font-bold uppercase tracking-[0.15em] m-0 text-[var(--color-gold-light)]"
              >
                Combat Status
              </h3>
              <div class="flex-1"></div>
              <p-button
                icon="pi pi-times"
                styleClass="p-button-rounded p-button-text !text-[var(--color-gold)] w-8 h-8 hover:!bg-[var(--color-gold-dark)]/10"
                pTooltip="End Combat"
                tooltipPosition="left"
                (click)="endCombat.emit()"
              ></p-button>
              <p-button
                icon="pi pi-arrow-right"
                styleClass="p-button-rounded p-button-outlined !border-[var(--color-gold-dark)] !text-[var(--color-gold-light)] w-8 h-8 hover:!bg-[var(--color-gold-dark)]/20"
                pTooltip="Next Turn"
                tooltipPosition="left"
              ></p-button>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
              <div
                class="h-full flex flex-col items-center justify-center p-8 text-center opacity-40 select-none"
              >
                <div
                  class="w-20 h-20 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center mb-6 bg-[var(--color-bg)] shadow-inner"
                >
                  <i class="pi pi-shield text-4xl text-[var(--color-gold-dark)] opacity-50"></i>
                </div>
                <h3
                  class="text-xs font-bold uppercase tracking-widest mb-3 text-[var(--color-gold)]"
                >
                  Battlefield Empty
                </h3>
                <p class="text-[11px] leading-relaxed max-w-[200px] text-[var(--text-muted)]">
                  The initiative order is currently empty. Add creatures from the Monster Manual to
                  begin.
                </p>
                <div class="mt-8 flex flex-col gap-2 w-full max-w-[180px]">
                  <p-button
                    label="Add Combatant"
                    icon="pi pi-plus"
                    styleClass="p-button-sm p-button-outlined w-full !border-[var(--color-gold)]/50 !text-[var(--color-gold)] hover:!bg-[var(--color-gold)]/10 font-bold tracking-widest text-[10px]"
                    (onClick)="activeTab.set('monsters')"
                  ></p-button>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <div class="flex flex-col h-full bg-[#16120e]">
            <div
              class="p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] shrink-0 shadow-sm z-10"
            >
              <div class="relative">
                <i
                  class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-gold)] text-xs z-10 pointer-events-none"
                ></i>
                <p-select
                  [options]="monsterManual()"
                  optionLabel="name"
                  [ngModel]="selectedMonster()"
                  (ngModelChange)="selectedMonsterChange.emit($event)"
                  class="w-full custom-select"
                  [filter]="true"
                  filterBy="name"
                  placeholder="Search Bestiary..."
                  styleClass="w-full !pl-8 !py-2 !text-xs !bg-[var(--color-bg)] !border-[var(--color-border)] focus:!border-[var(--color-gold)] focus:!shadow-[0_0_0_1px_var(--color-gold)] transition-all"
                  [appendTo]="'body'"
                >
                  <ng-template pTemplate="selectedItem" let-selectedOption>
                    @if (selectedOption) {
                      <div class="flex items-center gap-2">
                        <span
                          class="font-bold text-xs text-[var(--color-gold-light)] uppercase tracking-wide"
                          >{{ selectedOption.name }}</span
                        >
                        <span
                          class="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-border)] text-[var(--text-muted)] font-mono"
                          >CR {{ selectedOption.challengeRating }}</span
                        >
                      </div>
                    }
                  </ng-template>
                  <ng-template pTemplate="item" let-monster>
                    <div
                      class="flex flex-col py-1.5 px-1 border-b border-white/5 last:border-0 hover:bg-white/5 -mx-2 px-2 transition-colors"
                    >
                      <span class="font-bold text-xs text-[var(--color-gold-light)] mb-1">{{
                        monster.name
                      }}</span>
                      <div class="flex items-center justify-between">
                        <span
                          class="text-[9px] text-[var(--text-muted)] uppercase tracking-wider opacity-70"
                          >{{ monster.type }}</span
                        >
                        <span class="text-[9px] px-1.5 rounded bg-white/5 text-[var(--text-muted)]"
                          >CR {{ monster.challengeRating }}</span
                        >
                      </div>
                    </div>
                  </ng-template>
                </p-select>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar">
              @if (selectedMonster(); as monster) {
                <app-monster-stat-block [monster]="monster"></app-monster-stat-block>

                <div
                  class="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_-8px_16px_rgba(0,0,0,0.3)] shrink-0"
                >
                  <p-button
                    label="Add to Combat"
                    icon="pi pi-plus-circle"
                    styleClass="p-button-sm w-full !bg-[var(--color-gold)] !border-[var(--color-gold)] !text-black hover:!bg-[var(--color-gold-light)] font-bold uppercase tracking-widest"
                  ></p-button>
                </div>
              } @else {
                <div
                  class="h-full flex flex-col items-center justify-center p-10 text-center bg-[#1a1612]"
                >
                  <div
                    class="w-16 h-16 rounded-full border border-[var(--color-border)]/50 flex items-center justify-center mb-5 opacity-40 shadow-inner bg-black/20"
                  >
                    <i class="pi pi-book text-2xl text-[var(--color-gold-dark)]"></i>
                  </div>
                  <h4
                    class="text-sm font-bold text-[var(--color-gold-dark)] uppercase tracking-[0.2em] mb-3"
                  >
                    Monster Manual
                  </h4>
                  <p class="text-xs text-[var(--text-muted)] opacity-60 leading-relaxed px-6">
                    Search the compendium to view creature details and add them to the initiative
                    tracker.
                  </p>
                </div>
              }
            </div>
          </div>
        }
      </div>
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

  activeTab = signal<'initiative' | 'monsters'>('initiative');
}
