import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-dm-game-board',
  standalone: true,
  imports: [DockModule, TooltipModule],
  template: `
    <div
      class="flex-1 min-w-0 overflow-hidden flex flex-col h-full p-0 relative border-r border-[var(--color-gold)] bg-[var(--color-bg)]"
    >
      <div
        class="h-16 px-6 flex flex-row shrink-0 bg-[var(--color-bg-elevated)] items-center gap-4 justify-between border-b border-[var(--color-gold-dark)] shadow-lg z-10"
      >
        <div class="flex items-center gap-2">
          <span class="text-[var(--text-muted)] uppercase tracking-wider text-xs font-semibold"
            >Active Scene:</span
          >
          <span
            class="text-[var(--color-gold-light)] font-[family-name:var(--font-display)] font-bold text-lg truncate min-w-[150px]"
            [title]="activeScene().name"
          >
            {{ activeScene().name }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <div class="h-8 w-px bg-[var(--color-border)] mx-2"></div>

          <button
            class="flex items-center gap-3 px-4 py-2 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all cursor-pointer"
            [class.!bg-[#2a241d]]="fogOfWar()"
            [class.!text-[var(--color-gold)]]="fogOfWar()"
            [class.!border-[var(--color-gold)]]="fogOfWar()"
            (click)="toggleFogOfWar.emit()"
          >
            <i [class]="fogOfWar() ? 'pi pi-eye-slash' : 'pi pi-eye'" style="font-size: 1.2rem"></i>
            <div class="flex flex-col items-start leading-none gap-0.5">
              <span class="text-[10px] uppercase opacity-70 tracking-wider">Fog of War</span>
              <span class="font-bold text-xs sticky">{{ fogOfWar() ? 'ACTIVE' : 'OFF' }}</span>
            </div>
          </button>

          <button
            class="flex items-center gap-3 px-6 py-2 rounded bg-[var(--color-success)] text-white hover:brightness-110 shadow-lg shadow-green-900/20 transition-all font-semibold tracking-wide cursor-pointer border border-[#ffffff20]"
            [class.animate-pulse]="castingBoard()"
            (click)="toggleCastingBoard.emit()"
          >
            <i class="pi pi-external-link" style="font-size: 1.2rem"></i>
            <div class="flex flex-col items-start leading-none gap-0.5">
              <span class="font-bold text-xs tracking-wider">{{
                castingBoard() ? 'CASTING...' : 'CAST TO BOARD'
              }}</span>
            </div>
          </button>

          <button
            class="w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer ml-2"
          >
            <i class="pi pi-cog text-xl"></i>
          </button>
        </div>
      </div>

      <div
        class="flex-1 relative overflow-hidden flex items-center justify-center p-8 bg-[var(--color-bg)]"
      >
        <div
          class="absolute inset-0 pointer-events-none opacity-20"
          style="background-image: radial-gradient(var(--text-muted) 1px, transparent 1px); background-size: 24px 24px;"
        ></div>

        <div class="text-center space-y-2">
          <h2
            class="text-xl font-bold tracking-[0.2em] text-[var(--text-muted)] uppercase font-[family-name:var(--font-display)]"
          >
            Map Render Surface
          </h2>
          <p class="text-[var(--text-muted)] italic opacity-60 font-[family-name:var(--font-body)]">
            Players can only see what is revealed via Fog of War brush
          </p>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div
            class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full px-10 py-4 shadow-2xl flex items-center justify-center relative"
          >
            <p-dock [model]="dockItems()" position="bottom" styleClass="custom-dock">
              <ng-template pTemplate="item" let-item>
                <div
                  class="dock-item flex flex-col items-center gap-1 p-2 transition-all duration-200 hover:scale-110 cursor-pointer group relative"
                  [pTooltip]="item.label"
                  tooltipPosition="top"
                  [class.text-[var(--color-gold)]]="activeTool() === item.id"
                  [class.text-[var(--text-muted)]]="activeTool() !== item.id"
                  (click)="activeToolChange.emit(item.id)"
                  (keydown.enter)="activeToolChange.emit(item.id)"
                  tabindex="0"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center shadow-lg group-hover:border-[var(--color-gold)] transition-colors relative z-10"
                    [class.!border-[var(--color-gold)]]="activeTool() === item.id"
                    [class.!bg-[#2a241d]]="activeTool() === item.id"
                  >
                    <i [class]="item.icon" style="font-size: 1.2rem"></i>
                  </div>
                  <span
                    class="text-[9px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 whitespace-nowrap"
                  >
                    {{ item.label }}
                  </span>
                </div>
              </ng-template>
            </p-dock>
          </div>
        </div>
      </div>

      <ng-content select="[notes]"></ng-content>
    </div>
  `,
  styleUrls: ['../../dm-view.scss'],
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmGameBoardComponent {
  activeScene = input.required<{ name: string }>();
  fogOfWar = input.required<boolean>();
  toggleFogOfWar = output<void>();
  castingBoard = input.required<boolean>();
  toggleCastingBoard = output<void>();
  dockItems = input.required<MenuItem[]>();
  activeTool = input.required<string>();
  activeToolChange = output<string>();
}
