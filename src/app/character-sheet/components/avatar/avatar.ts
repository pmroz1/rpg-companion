import { Component, inject } from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { AvatarState } from './avatar-state';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [DndCard],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class AvatarComponent {
  private readonly state = inject(AvatarState);
  avatar = this.state.state;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.state.setState(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      // Reset input to allow selecting the same file again
      input.value = '';
    }
  }
}
