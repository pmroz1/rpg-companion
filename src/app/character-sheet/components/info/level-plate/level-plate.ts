import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-level-plate',
  imports: [FormsModule],
  template: `
    <div class="plate dnd-box">
      <div class="level-section">
        <input
          type="number"
          class="level-input"
          [value]="level()"
          (input)="onLevelInput($event)"
          min="1"
          max="20"
        />
        <div class="dnd-divider w-20"></div>
        <span class="level-label">LEVEL</span>
      </div>
      <div class="xp-section">
        <input type="number" class="xp-input" [value]="xp()" (input)="onXpInput($event)" min="0" />
        <div class="dnd-divider w-20"></div>
        <span class="xp-label">XP</span>
      </div>
    </div>
  `,
  styleUrl: './level-plate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelPlate {
  level = model(1);
  xp = model(0);
  maxLevel = 20;
  minLevel = 1;
  minXp = 0;
  maxXp = 999999;

  onLevelInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const parsed = Number(input.value);
    const clamped = Number.isFinite(parsed)
      ? Math.min(this.maxLevel, Math.max(this.minLevel, parsed))
      : this.minLevel;
    this.level.set(clamped);
    input.value = String(clamped);
  }

  onXpInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const parsed = Number(input.value);
    const clamped = Number.isFinite(parsed)
      ? Math.max(this.minXp, Math.min(this.maxXp, parsed))
      : this.minXp;
    this.xp.set(clamped);
    input.value = String(clamped);
  }
}
