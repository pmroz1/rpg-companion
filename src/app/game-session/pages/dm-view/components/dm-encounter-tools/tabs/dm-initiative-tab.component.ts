import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dm-initiative-tab',
  standalone: true,
  imports: [Button, TooltipModule],
  template: `
    <div class="flex flex-col h-full bg-[#1a1612]">
      <div
        class="flex items-center gap-3 p-4 border-b border-[var(--color-border)] w-full bg-[var(--color-bg-elevated)] shrink-0"
      >
        <h3
          class="text-xs font-bold uppercase tracking-[0.15em] m-0 text-[var(--color-gold-light)]"
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
          <h3 class="text-sm font-bold uppercase tracking-widest mb-3 text-[var(--color-gold)]">
            Battlefield Empty
          </h3>
          <p class="text-xs leading-relaxed max-w-[200px] text-[var(--text-muted)]">
            The initiative order is currently empty. Add creatures from the Monster Manual to begin.
          </p>
          <div class="mt-8 flex flex-col gap-2 w-full max-w-[180px]">
            <p-button
              label="Add Combatant"
              icon="pi pi-plus"
              styleClass="p-button-sm p-button-outlined w-full !border-[var(--color-gold)]/50 !text-[var(--color-gold)] hover:!bg-[var(--color-gold)]/10 font-bold tracking-widest text-xs"
              (onClick)="addCombatant.emit()"
            ></p-button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmInitiativeTabComponent {
  endCombat = output<void>();
  addCombatant = output<void>();
}
