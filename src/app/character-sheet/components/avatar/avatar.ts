import { Component, inject } from '@angular/core';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { AvatarState } from './avatar-state';
import { compressImage } from '@app/shared/utils/image-compress';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [DndCard],
  template: `<app-dnd-card class="w-full h-full" [displayDivider]="false">
    <div
      class="avatar-container h-full"
      (click)="fileInput.click()"
      (keydown.enter)="fileInput.click()"
      (keydown.space)="fileInput.click()"
      tabindex="0"
      role="button"
      aria-label="Change portrait"
    >
      <img [src]="avatar()" alt="Avatar" class="avatar-image" />

      <div class="avatar-overlay">
        <i class="pi pi-camera"></i>
        <span>Change Portrait</span>
      </div>

      <input
        #fileInput
        type="file"
        accept="image/*"
        class="hidden-upload"
        (change)="onFileChange($event)"
      />
    </div>
  </app-dnd-card> `,
  styleUrl: './avatar.scss',
})
export class AvatarComponent {
  private readonly state = inject(AvatarState);
  avatar = this.state.state;

  async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        this.state.setState(compressed);
      } catch (error) {
        console.error('Failed to compress image:', error);
      }
      input.value = '';
    }
  }
}
