import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dm-view',
  imports: [],
  template: `<div class="dm-view flex flex-row h-screen w-full">
    <div class="flex flex-1 flex-col h-full">
      <div>scenes</div>
      <div>atmosphere / music</div>
      <div>save/export</div>
    </div>
    <div class="flex flex-[2] flex-col h-full">
      <div>board-header</div>
      <div>board</div>
      <div>board-tools</div>
      <div>dm-notes</div>
    </div>
    <div class="flex flex-1 flex-col h-full">
      <div>initiative-header</div>
      <div>initiative</div>
      <div>Add Combatant</div>
    </div>
  </div>`,
  styleUrls: ['./dm-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmView {}
