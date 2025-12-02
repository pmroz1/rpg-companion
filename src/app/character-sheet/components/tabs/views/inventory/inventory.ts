import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tab-inventory',
  template: `
    <div class="p-4">
      <p class="text-center text-gray-400">Inventory coming soon...</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryTab {}
