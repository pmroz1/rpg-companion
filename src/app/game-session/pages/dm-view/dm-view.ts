import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-dm-view',
  imports: [Button],
  template: `<div class="dm-view flex flex-row h-full w-full overflow-hidden">
    <div class="flex-1 flex flex-col h-full border-r border-[var(--color-gold)] overflow-hidden">
      <div class="p-4 flex flex-col shrink-0">
        <h3 class="text-lg font-semibold uppercase tracking-wider mb-2">scenes</h3>
        <div class="flex flex-col space-y-1 pl-2 max-h-80 overflow-y-auto pr-1">
          @for (scene of scenes; track $index) {
            <p-button
              styleClass="w-full !justify-start !text-sm !whitespace-nowrap !overflow-hidden p-button-ghost"
              icon="pi pi-map"
              label="{{ scene.name }}"
            ></p-button>
          }
          <p-button
            styleClass="w-full !justify-start !text-sm !whitespace-nowrap !overflow-hidden p-button-ghost !text-[var(--color-parchment)]"
            icon="pi pi-plus"
            label="New Scene"
          ></p-button>
        </div>
      </div>

      <div class="p-4 flex-1 overflow-y-auto border-t border-[var(--color-border)]">
        <h3 class="text-lg font-semibold uppercase tracking-wider mb-2">atmosphere / music</h3>
        <div class="text-sm text-muted">Awaiting atmospheric controls...</div>
      </div>

      <div class="p-4 border-t border-[var(--color-border)]">
        <div class="flex flex-row justify-center items-center space-x-2">
          <p-button icon="pi pi-save" label="Save" styleClass="p-button-sm"></p-button>
          <p-button icon="pi pi-download" label="Export" styleClass="p-button-sm"></p-button>
        </div>
      </div>
    </div>
    <div class="flex flex-[2] overflow-y-auto flex-col h-full p-4 space-y-6">
      <div>board-header</div>
      <div>board</div>
      <div>board-tools</div>
      <div>dm-notes</div>
    </div>
    <div class="flex flex-1 overflow-y-auto flex-col h-full p-4 space-y-6">
      <div>initiative-header</div>
      <div>initiative</div>
      <div>Add Combatant</div>
    </div>
  </div>`,
  styleUrls: ['./dm-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmView {
  scenes = [
    {
      name: 'The Bloated Dwarf Inn',
    },
    {
      name: 'Bandit ambush',
    },
    {
      name: 'The Dark Forest - Entrance',
    },
  ];
}
