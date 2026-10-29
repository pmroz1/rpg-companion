import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';

@Component({
  selector: 'app-dm-game-board',
  imports: [DockModule],
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
            disabled
            type="button"
            class="flex items-center gap-3 px-4 py-2 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--text-muted)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class="pi pi-eye-slash" style="font-size: 1.2rem"></i>
            <div class="flex flex-col items-start leading-none gap-0.5">
              <span class="text-[10px] uppercase opacity-70 tracking-wider">Fog of War</span>
              <span class="font-bold text-xs sticky">OFF</span>
            </div>
          </button>

          <button
            disabled
            type="button"
            class="flex items-center gap-3 px-6 py-2 rounded bg-[var(--color-success)] text-white shadow-lg shadow-green-900/20 transition-all font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed border border-[#ffffff20]"
          >
            <i class="pi pi-external-link" style="font-size: 1.2rem"></i>
            <div class="flex flex-col items-start leading-none gap-0.5">
              <span class="font-bold text-xs tracking-wider">CAST TO BOARD</span>
            </div>
          </button>

          <button
            disabled
            type="button"
            class="w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-muted)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-2"
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
            Map rendering, fog of war and player casting are not implemented yet.
          </p>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div
            class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full px-10 py-4 shadow-2xl flex items-center justify-center relative"
          >
            <p-dock [model]="dockItems()" position="bottom" styleClass="custom-dock">
              <ng-template pTemplate="item" let-item>
                <button
                  type="button"
                  disabled
                  class="dock-item flex flex-col items-center gap-1 p-2 opacity-50"
                  [title]="item.label"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center shadow-lg relative z-10"
                  >
                    <i [class]="item.icon" style="font-size: 1.2rem"></i>
                  </div>
                  <span
                    class="text-[9px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 whitespace-nowrap"
                  >
                    {{ item.label }}
                  </span>
                </button>
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
  dockItems = input.required<MenuItem[]>();
}
