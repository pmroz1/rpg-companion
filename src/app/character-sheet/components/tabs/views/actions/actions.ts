import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-actions',
  imports: [],
  template: `
    <div class="p-4">
      <p class="text-center text-gray-400">Actions coming soon...</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsTab {}
