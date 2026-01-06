import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';

interface Sound {
  name: WritableSignal<string>;
  audio: HTMLAudioElement;
  playing: WritableSignal<boolean>;
}

// TODO: move big chunks of template to separate components
@Component({
  selector: 'app-dm-view',
  imports: [Button, FileUploadModule, InputTextModule, FormsModule],
  template: `<div class="dm-view flex flex-row h-full w-full overflow-hidden">
    <!-- SCEMNES -->
    <div
      class="flex-1 flex flex-col h-full border-r border-[var(--color-gold)] overflow-hidden max-w-90 bg-[var(--color-bg-elevated)]"
    >
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

      <div
        class="p-4 flex-1 overflow-y-auto border-t border-[var(--color-border)] flex flex-col min-h-0"
      >
        <div class="flex justify-between items-center mb-4 shrink-0">
          <h3 class="text-lg font-semibold uppercase tracking-wider">atmosphere</h3>
          <div class="flex items-center">
            <input
              #fileInput
              type="file"
              accept="audio/*"
              class="hidden"
              (change)="onSoundUpload($event)"
            />
            <p-button
              icon="pi pi-upload"
              styleClass="p-button-sm p-button-ghost"
              (onClick)="fileInput.click()"
            ></p-button>
          </div>
        </div>

        <div class="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          @for (sound of sounds(); track $index) {
            <div
              class="flex flex-col p-3 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-md gap-3 shadow-sm"
            >
              <div class="flex items-center gap-2 overflow-hidden">
                <i class="pi pi-volume-up text-[var(--color-gold)] opacity-70"></i>
                <input
                  pInputText
                  class="p-inputtext-sm w-full bg-transparent border-none !p-0 font-medium gold-text focus:shadow-none truncate"
                  [ngModel]="sound.name()"
                  (ngModelChange)="sound.name.set($event)"
                />
              </div>
              <div class="flex items-center gap-2">
                <p-button
                  [icon]="sound.playing() ? 'pi pi-pause' : 'pi pi-play'"
                  styleClass="p-button-rounded p-button-text p-button-sm !w-8 !h-8"
                  (onClick)="toggleSound(sound)"
                ></p-button>
                <p-button
                  icon="pi pi-refresh"
                  styleClass="p-button-rounded p-button-text p-button-sm !w-8 !h-8"
                  (onClick)="stopSound(sound)"
                ></p-button>
                <div
                  class="flex-1 bg-[var(--color-bg)] h-1.5 rounded-full overflow-hidden relative"
                >
                  <div
                    class="h-full bg-[var(--color-gold)] transition-all duration-300"
                    [style.width.%]="0"
                  ></div>
                </div>
              </div>
            </div>
          }
          @if (sounds().length === 0) {
            <div
              class="text-center py-10 text-muted text-sm border-2 border-dashed border-[var(--color-border)] rounded-lg opacity-60"
            >
              <i class="pi pi-headphones mb-3 text-2xl block"></i>
              No sounds yet. Upload first ambient track!
            </div>
          }
        </div>
      </div>

      <div class="p-4 border-t border-[var(--color-border)]">
        <div class="flex flex-row justify-center items-center space-x-2">
          <p-button icon="pi pi-save" label="Save" styleClass="p-button-sm"></p-button>
          <p-button icon="pi pi-download" label="Export" styleClass="p-button-sm"></p-button>
        </div>
      </div>
    </div>

    <!-- BOARD -->
    <div class="flex flex-[2] overflow-y-auto flex-col h-full p-4 space-y-6">
      <div>board-header</div>
      <div>board</div>
      <div>board-tools</div>
      <div>dm-notes</div>
    </div>

    <!-- INITIATIVE AND PLAYERS TOOLS -->
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
    { name: 'The Bloated Dwarf Inn' },
    { name: 'Bandit ambush' },
    { name: 'The Dark Forest - Entrance' },
  ];

  protected readonly sounds = signal<Sound[]>([]);

  onSoundUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      const name = file.name.split('.').slice(0, -1).join('.') || file.name;

      const newSound: Sound = {
        name: signal(name),
        audio: audio,
        playing: signal(false),
      };

      audio.onended = () => newSound.playing.set(false);

      this.sounds.update((s) => [...s, newSound]);

      // Reset input value to allow uploading same file again
      target.value = '';
    }
  }

  toggleSound(sound: Sound) {
    if (sound.playing()) {
      sound.audio.pause();
      sound.playing.set(false);
    } else {
      sound.audio.play();
      sound.playing.set(true);
    }
  }

  stopSound(sound: Sound) {
    sound.audio.pause();
    sound.audio.currentTime = 0;
    sound.playing.set(false);
  }
}
