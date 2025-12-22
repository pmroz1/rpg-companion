import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameSessionService } from '@app/core/session/session.service';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';

@Component({
  selector: 'app-game-session',
  imports: [DndCard],
  template: `<div
    class="flex flex-col w-full h-full bg-dnd-darken justify-center items-center align-center p-4"
  >
    <h1 class="text-2xl text-center text-white mt-4">Game Session</h1>
    <div class="flex-grow flex items-center justify-center">
      @if (sessionsService.session.length == 0) {
        <span class="text-white">Session Data Loaded</span>
      }
    </div>
    <app-dnd-card
      title=""
      [displayTitle]="false"
      [displayDivider]="false"
      class="w-1/2 mt-4 mb-auto"
    >
      <span>cyce</span>
    </app-dnd-card>
  </div>`,
  styleUrl: './game-session.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSession {
  readonly sessionsService = inject(GameSessionService);
}
