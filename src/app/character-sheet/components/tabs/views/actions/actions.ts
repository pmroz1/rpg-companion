import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';

@Component({
  selector: 'tab-actions',
  imports: [],
  template: `
    <div class="p-4">
      <p class="text-center text-gray-400">Actions coming soon...</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsTab {}
