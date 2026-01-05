import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameSessionService } from '@app/core/session/game-session.service';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-wrapper',
  imports: [DndCard, ButtonModule],
  template: `<div
    class="flex flex-col w-full h-full bg-dnd-darken justify-center items-center align-center p-4"
  >
    <div class="flex-grow flex items-center justify-center"></div>
    <app-dnd-card title="Game Session" class="w-1/2 mt-4 mb-auto">
      @if (session()) {
        <div class="flex flex-col gap-4 w-full">
          <p class="text-lg font-semibold">Session Name: {{ session()?.name }}</p>
          <p class="text-md font-medium">Player Characters:</p>
          <ul class="list-disc list-inside">
            @for (character of session()?.playerCharacters || []; track $index) {
              <li>{{ character.name }}</li>
            }
          </ul>
        </div>
      } @else {
        <p class="text-center">No active game session. Please create or load a session.</p>
      }
      <div class="flex flex-row gap-4 mt-4 w-full justify-center">
        <p-button label="Continue" (onClick)="continueGame()" [disabled]="!session()"></p-button>
        <p-button label="Load Session" (onClick)="loadGame()"></p-button>
        <p-button label="New Session" (onClick)="newGame()"></p-button>
      </div>
    </app-dnd-card>
  </div>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSessionWrapper {
  readonly sessionsService = inject(GameSessionService);
  readonly session = computed(() => this.sessionsService.session());
  private readonly router = inject(Router);

  continueGame() {
    console.log('Continuing game session:', this.session()?.name);
  }

  loadGame() {
    console.log('Navigating to load session page');
  }

  newGame() {
    this.openGameViews();
  }

  private openGameViews() {
    window.open('/game-session/board', '_blank');
    this.router.navigate(['/game-session/dm-view']);
  }
}
