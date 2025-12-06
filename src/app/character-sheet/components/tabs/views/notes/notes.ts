import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tab-notes',
  template: `
    <div class="p-4">
      <p class="text-center text-gray-400">Notes coming soon...</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesTab {}
