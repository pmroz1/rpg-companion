import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GameSessionService } from '@app/core/session/game-session.service';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-new-session',
  imports: [FormsModule, RouterLink, DndCard, Button, InputText],
  template: `<app-dnd-card title="New Session" class="block max-w-xl mx-auto mt-4">
    <form (ngSubmit)="createSession()" class="flex flex-col gap-4 p-4">
      <label for="session-name">Session Name</label>
      <input pInputText id="session-name" name="sessionName" [(ngModel)]="name" required />
      <div class="flex gap-4 items-center">
        <p-button type="submit" label="Create Session" [disabled]="!name().trim()" />
        <a routerLink="/game-session/wrapper">Cancel</a>
      </div>
    </form>
  </app-dnd-card>`,
  styleUrl: './new-session.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewSession {
  private readonly sessionService = inject(GameSessionService);
  private readonly router = inject(Router);
  readonly name = signal('');

  createSession(): void {
    const name = this.name().trim();
    if (!name) return;
    this.sessionService.setSession({ name, playerCharacters: [] });
    void this.router.navigate(['/game-session/dm-view']);
  }
}
