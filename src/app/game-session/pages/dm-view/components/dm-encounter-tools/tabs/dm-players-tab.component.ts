import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameSessionService } from '@app/core/session/game-session.service';

@Component({
  selector: 'app-dm-players-tab',
  imports: [],
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
      <ul class="p-4 space-y-3">
        @for (player of players()?.playerCharacters ?? []; track $index) {
          <li>
            <strong>{{ player.name }}</strong> — Level {{ player.level }}
            {{ player.class || 'character' }}
          </li>
        } @empty {
          <li>No player characters in this session. Import a session JSON file to load a party.</li>
        }
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmPlayersTabComponent {
  private readonly sessionService = inject(GameSessionService);
  readonly players = this.sessionService.session;
}
