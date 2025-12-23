import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameSessionService } from '@app/core/session/game-session.service';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-wrapper',
  imports: [DndCard, ButtonModule, RouterLink],
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
        <p-button label="Continue" routerLink="../dm-tools" [disabled]="!session()"></p-button>
        <p-button label="New Session" routerLink="../new-session"></p-button>
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
export class Wrapper {
  readonly sessionsService = inject(GameSessionService);
  readonly session = computed(() => this.sessionsService.session());
}
