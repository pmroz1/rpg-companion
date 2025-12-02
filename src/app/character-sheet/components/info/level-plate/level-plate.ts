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
          [ngModel]="level()"
          (ngModelChange)="level.set($event)"
          min="1"
          max="20"
        />
        <div class="dnd-divider w-20"></div>
        <span class="level-label">LEVEL</span>
      </div>
      <div class="xp-section">
        <input
          type="number"
          class="xp-input"
          [ngModel]="xp()"
          (ngModelChange)="xp.set($event)"
          min="0"
        />
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
}
