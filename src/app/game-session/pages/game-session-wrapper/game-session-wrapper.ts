import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GameSessionService, parseGameSession } from '@app/core/session/game-session.service';
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
      @if (error()) {
        <p role="alert" class="mt-4 text-red-400 text-center">{{ error() }}</p>
      }
      <div class="flex flex-row gap-4 mt-4 w-full justify-center">
        <p-button label="Continue" (onClick)="continueGame()" [disabled]="!session()"></p-button>
        <input
          #sessionFile
          type="file"
          accept=".json,application/json"
          class="hidden"
          (change)="loadGame($event)"
        />
        <p-button
          label="Load Session"
          icon="pi pi-upload"
          (onClick)="sessionFile.click()"
        ></p-button>
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
  readonly session = this.sessionsService.session;
  readonly error = signal<string | null>(null);
  private readonly router = inject(Router);

  continueGame(): void {
    if (this.session()) {
      void this.router.navigate(['/game-session/dm-view']);
    }
  }

  async loadGame(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.error.set(null);
    try {
      const session = parseGameSession(await file.text());
      this.sessionsService.setSession(session);
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not read the session file.');
    } finally {
      input.value = '';
    }
  }

  newGame(): void {
    void this.router.navigate(['/game-session/new-session']);
  }
}
