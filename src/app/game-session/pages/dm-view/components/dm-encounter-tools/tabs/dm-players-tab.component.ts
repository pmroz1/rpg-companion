import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSessionService } from '@app/core/session/game-session.service';

@Component({
  selector: 'app-dm-players-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col h-full">
      <div
        class="flex items-center gap-3 p-4 border-b border-[var(--color-border)] w-full bg-[var(--color-bg-elevated)] shrink-0"
      >
        <h3
          class="text-xs font-bold uppercase tracking-[0.15em] m-0 text-[var(--color-gold-light)]"
        >
          Party Members
        </h3>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmPlayersTabComponent {
  private readonly sessionService = inject(GameSessionService);
  readonly players = this.sessionService.session;
}
