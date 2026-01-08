import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { Sound } from '@data/models';

@Component({
  selector: 'app-dm-scene-manager',
  standalone: true,
  imports: [Button, InputTextModule, FormsModule, TooltipModule],
  template: `
    <div class="left-column w-80 flex-none flex flex-col h-full overflow-hidden">
      <div class="p-5 pb-2 flex flex-col shrink-0">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-bold uppercase tracking-[0.15em]">Scenes</h3>
          <p-button
            icon="pi pi-plus"
            styleClass="p-button-rounded p-button-text p-button-sm w-7 h-7 !p-0 text-[var(--color-gold)] hover:bg-[var(--color-gold-dark)]/20"
            pTooltip="New Scene"
          ></p-button>
        </div>

        <div
          class="flex flex-col space-y-1 max-h-80 overflow-y-auto pr-1 custom-scrollbar -mx-2 px-2"
        >
          @for (scene of scenes(); track $index) {
            <button
              class="relative w-full flex items-center gap-3 px-3 py-3 text-left group cursor-pointer border border-transparent transition-all duration-200 overflow-hidden"
              [class.bg-[var(--color-gold)]/10]="activeScene().name === scene.name"
              [class.border-[var(--color-gold)]/20]="activeScene().name === scene.name"
              [class.hover:bg-white/5]="activeScene().name !== scene.name"
              (click)="activeSceneChange.emit(scene)"
            >
              @if (activeScene().name === scene.name) {
                <div
                  class="absolute inset-y-0 left-0 w-0.5 bg-[var(--color-gold)] shadow-[0_0_10px_var(--color-gold)]"
                ></div>
              }

              <div
                class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 bg-black/20 group-hover:border-[var(--color-gold)]/30 transition-colors"
                [class.border-[var(--color-gold)]]="activeScene().name === scene.name"
                [class.text-[var(--color-gold)]]="activeScene().name === scene.name"
                [class.text-[var(--text-muted)]]="activeScene().name !== scene.name"
              >
                <i class="pi pi-map text-xs"></i>
              </div>

              <div class="flex-1 min-w-0 flex flex-col gap-0.5">
                <span
                  class="text-sm truncate font-bold font-[family-name:var(--font-display)] tracking-wide transition-colors"
                  [class.text-[var(--color-gold)]]="activeScene().name === scene.name"
                  [class.text-[var(--text-body)]]="activeScene().name !== scene.name"
                  [class.group-hover:text-[var(--color-gold-light)]]="
                    activeScene().name !== scene.name
                  "
                >
                  {{ scene.name }}
                </span>
                <span
                  class="text-[9px] uppercase tracking-wider opacity-50"
                  [class.text-[var(--color-gold)]]="activeScene().name === scene.name"
                  [class.text-[var(--text-muted)]]="activeScene().name !== scene.name"
                  >Location</span
                >
              </div>
            </button>
          }
        </div>
      </div>

      <div
        class="p-5 pt-2 flex-1 overflow-y-auto border-t border-[var(--color-border)] flex flex-col min-h-0 bg-gradient-to-b from-[#1a1410] to-[#16120e]"
      >
        <div class="flex justify-between items-center mb-4 shrink-0 top-0 pt-2 z-10">
          <h3
            class="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)] flex items-center gap-2"
          >
            <i class="pi pi-volume-up text-[10px] opacity-70"></i>
            Atmosphere
          </h3>
          <div class="flex items-center">
            <input
              #fileInput
              type="file"
              accept="audio/*"
              class="hidden"
              (change)="onSoundUpload($event)"
            />
            <button
              class="w-6 h-6 rounded flex items-center justify-center text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-colors"
              pTooltip="Upload Track"
              tooltipPosition="left"
              (click)="fileInput.click()"
            >
              <i class="pi pi-plus text-xs"></i>
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-2 overflow-y-auto pr-1 -mr-1 custom-scrollbar pb-2">
          @for (sound of sounds(); track $index) {
            <div
              class="flex flex-col p-3 rounded border transition-all duration-300 relative group overflow-hidden"
              [class.bg-[#000]/30]="!sound.playing()"
              [class.bg-[#2a1d15]/40]="sound.playing()"
              [class.border-white/5]="!sound.playing()"
              [class.border-[var(--color-gold)]/30]="sound.playing()"
            >
              @if (sound.playing()) {
                <div
                  class="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)]/5 to-transparent pointer-events-none"
                ></div>
                <div
                  class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[var(--color-gold)]/50 to-transparent"
                ></div>
              }

              <div class="flex items-center gap-3 overflow-hidden relative z-10 mb-2">
                <button
                  class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 shadow-lg group/play"
                  [class.bg-[var(--color-gold)]]="sound.playing()"
                  [class.text-black]="sound.playing()"
                  [class.bg-[#000]/50]="!sound.playing()"
                  [class.text-[var(--text-muted)]]="!sound.playing()"
                  [class.hover:text-[var(--color-gold)]]="!sound.playing()"
                  [class.border]="!sound.playing()"
                  [class.border-white/10]="!sound.playing()"
                  (click)="toggleSound(sound)"
                >
                  <i
                    class="pi text-xs transition-transform duration-200"
                    [class.pi-pause]="sound.playing()"
                    [class.pi-play]="!sound.playing()"
                    [class.ml-0.5]="!sound.playing()"
                  ></i>
                </button>

                <div class="flex-1 min-w-0 flex flex-col">
                  <input
                    pInputText
                    class="p-inputtext-sm w-full bg-transparent border-none !p-0 font-bold font-[family-name:var(--font-display)] tracking-wide focus:text-[var(--color-gold)] focus:shadow-none truncate text-xs transition-colors"
                    [class.text-[var(--color-gold-light)]]="sound.playing()"
                    [class.text-[var(--text-body)]]="!sound.playing()"
                    [ngModel]="sound.name()"
                    (ngModelChange)="sound.name.set($event)"
                  />
                  <div class="flex items-center gap-2 mt-1">
                    <span
                      class="text-[8px] uppercase tracking-widest opacity-50"
                      [class.text-[var(--color-gold)]]="sound.playing()"
                      [class.text-[var(--text-muted)]]="!sound.playing()"
                    >
                      {{ sound.playing() ? 'Now Playing' : 'Paused' }}
                    </span>
                  </div>
                </div>

                <button
                  class="text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer w-6 h-6 flex items-center justify-center rounded hover:bg-white/5"
                  (click)="stopSound(sound)"
                  pTooltip="Stop"
                >
                  <i class="pi pi-stop text-[10px]"></i>
                </button>
              </div>

              <div class="flex items-center gap-2 pl-1 relative z-10">
                <i class="pi pi-volume-down text-[10px] text-[var(--text-muted)] opacity-50"></i>
                <div
                  class="flex-1 relative h-1 bg-black/40 rounded-full group/slider overflow-hidden"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    [ngModel]="sound.volume()"
                    (ngModelChange)="onVolumeChange(sound, $event)"
                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div
                    class="absolute left-0 top-0 bottom-0 bg-[var(--color-gold)]/50 rounded-full transition-all duration-100"
                    [style.width.%]="sound.volume() * 100"
                  ></div>
                </div>
              </div>
            </div>
          }

          @if (sounds().length === 0) {
            <div
              class="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-[var(--color-border)] rounded-lg bg-[var(--color-bg)]/30"
            >
              <div
                class="w-12 h-12 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center mb-3"
              >
                <i class="pi pi-headphones text-xl text-[var(--text-muted)] opacity-50"></i>
              </div>
              <p class="text-xs text-[var(--text-muted)] text-center max-w-[150px] leading-relaxed">
                Upload ambient tracks to set the mood
              </p>
            </div>
          }
        </div>
      </div>

      <div class="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] shrink-0">
        <div class="grid grid-cols-2 gap-3">
          <p-button
            icon="pi pi-save"
            label="Save"
            styleClass="p-button-sm p-button-outlined w-full !border-[var(--color-border)] !text-[var(--text-muted)] hover:!text-[var(--color-gold)] hover:!border-[var(--color-gold)]"
          ></p-button>
          <p-button
            icon="pi pi-download"
            label="Export"
            styleClass="p-button-sm p-button-outlined w-full !border-[var(--color-border)] !text-[var(--text-muted)] hover:!text-[var(--color-gold)] hover:!border-[var(--color-gold)]"
          ></p-button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../../dm-view.scss'],
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmSceneManagerComponent {
  scenes = input.required<{ name: string }[]>();
  activeScene = input.required<{ name: string }>();
  activeSceneChange = output<{ name: string }>();

  sounds = input.required<Sound[]>();
  soundsChange = output<Sound[]>();

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
        volume: signal(0.7),
      };

      audio.volume = 0.7;
      audio.onended = () => newSound.playing.set(false);
      this.soundsChange.emit([...this.sounds(), newSound]);
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

  onVolumeChange(sound: Sound, volume: number) {
    sound.volume.set(volume);
    sound.audio.volume = volume;
  }
}
