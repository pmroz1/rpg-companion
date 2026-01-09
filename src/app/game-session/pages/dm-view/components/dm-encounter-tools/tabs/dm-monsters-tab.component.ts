import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DndMonster } from '@data/models';
import { CommonModule } from '@angular/common';
import { MonsterStatBlockComponent } from '../../monster-stat-block/monster-stat-block.component';

@Component({
  selector: 'app-dm-monsters-tab',
  standalone: true,
  imports: [CommonModule, Button, SelectModule, FormsModule, MonsterStatBlockComponent],
  template: `
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
            styleClass="w-full !pl-8 !py-2 !text-sm !bg-[var(--color-bg)] !border-[var(--color-border)] focus:!border-[var(--color-gold)] focus:!shadow-[0_0_0_1px_var(--color-gold)] transition-all"
            [appendTo]="'body'"
          >
            <ng-template pTemplate="selectedItem" let-selectedOption>
              @if (selectedOption) {
                <div class="flex items-center gap-2">
                  <span
                    class="font-bold text-sm text-[var(--color-gold-light)] uppercase tracking-wide"
                    >{{ selectedOption.name }}</span
                  >
                  <span
                    class="text-xs px-1.5 py-0.5 rounded bg-[var(--color-border)] text-[var(--text-muted)] font-mono"
                    >CR {{ selectedOption.challengeRating }}</span
                  >
                </div>
              }
            </ng-template>
            <ng-template pTemplate="item" let-monster>
              <div
                class="flex flex-col py-1.5 px-1 border-b border-white/5 last:border-0 hover:bg-white/5 -mx-2 px-2 transition-colors"
              >
                <span class="font-bold text-sm text-[var(--color-gold-light)] mb-1">{{
                  monster.name
                }}</span>
                <div class="flex items-center justify-between">
                  <span
                    class="text-xs text-[var(--text-muted)] uppercase tracking-wider opacity-70"
                    >{{ monster.type }}</span
                  >
                  <span class="text-xs px-1.5 rounded bg-white/5 text-[var(--text-muted)]"
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
              class="text-base font-bold text-[var(--color-gold-dark)] uppercase tracking-[0.2em] mb-3"
            >
              Monster Manual
            </h4>
            <p class="text-sm text-[var(--text-muted)] opacity-60 leading-relaxed px-6">
              Search the compendium to view creature details and add them to the initiative tracker.
            </p>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmMonstersTabComponent {
  monsterManual = input.required<DndMonster[]>();
  selectedMonster = input.required<DndMonster | null>();
  selectedMonsterChange = output<DndMonster | null>();
}
