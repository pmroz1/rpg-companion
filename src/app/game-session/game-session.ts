import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-session',
  imports: [],
  template: `<p>game-session works!</p>`,
  styleUrl: './game-session.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSession {}
