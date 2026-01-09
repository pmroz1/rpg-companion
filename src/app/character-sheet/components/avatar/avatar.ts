import { Component } from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [DndCard],
  template: `<app-dnd-card></app-dnd-card> `,
})
export class AvatarComponent {}
