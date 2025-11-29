import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-character-sheet',
  imports: [],
  template: `<p>character-sheet works!</p>`,
  styleUrl: './character-sheet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheet {}
