import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { DockModule } from 'primeng/dock';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

interface Sound {
  name: WritableSignal<string>;
  audio: HTMLAudioElement;
  playing: WritableSignal<boolean>;
  volume: WritableSignal<number>;
}

// TODO: move big chunks of template to separate components
@Component({
  selector: 'app-dm-view',
  imports: [Button, FileUploadModule, InputTextModule, FormsModule, DockModule, TooltipModule],
  template: `<div class="flex flex-row h-full w-full overflow-hidden">
    <!-- SCEMNES -->
    <div class="left-column flex-1 flex flex-col h-full overflow-hidden max-w-90">
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
          class="flex flex-col space-y-0.5 max-h-80 overflow-y-auto pr-1 custom-scrollbar -mx-2 px-2"
        >
          @for (scene of scenes; track $index) {
            <button
              class="scene-list-item w-full flex items-center gap-3 px-3 py-2.5 text-left group cursor-pointer"
              [class.active]="activeScene().name === scene.name"
              (click)="activeScene.set(scene)"
            >
              <i
                class="scene-icon pi pi-map text-[var(--text-muted)] text-xs group-hover:text-[var(--color-gold-light)] transition-colors"
              ></i>
              <span
                class="scene-name text-sm text-[var(--text-body)] truncate font-medium font-[family-name:var(--font-body)]"
                >{{ scene.name }}</span
              >
            </button>
          }
        </div>
      </div>

      <div
        class="p-5 pt-2 flex-1 overflow-y-auto border-t border-[var(--color-border)] flex flex-col min-h-0"
      >
        <div
          class="flex justify-between items-center mb-4 shrink-0 top-0 bg-[var(--color-bg-elevated)] pt-2 z-10"
        >
          <h3 class="text-sm font-bold uppercase tracking-[0.15em]">Atmosphere</h3>
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
              styleClass="p-button-rounded p-button-text p-button-sm w-7 h-7 !p-0 text-[var(--color-gold)] hover:bg-[var(--color-gold-dark)]/20"
              pTooltip="Upload Ambient Sound"
              (onClick)="fileInput.click()"
            ></p-button>
          </div>
        </div>

        <div class="flex flex-col gap-3 overflow-y-auto pr-1 -mr-1 custom-scrollbar pb-2">
          @for (sound of sounds(); track $index) {
            <div class="sound-card flex flex-col p-3 rounded-md gap-2 relative group">
              @if (sound.playing()) {
                <div
                  class="absolute inset-0 bg-[var(--color-gold)] opacity-5 rounded-md pointer-events-none"
                ></div>
              }

              <div class="flex items-center gap-3 overflow-hidden relative z-10">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
                  [class.bg-[var(--color-gold-dark)]]="sound.playing()"
                  [class.bg-[var(--color-bg)]]="!sound.playing()"
                >
                  <i
                    class="pi text-xs"
                    [class.pi-spin]="sound.playing()"
                    [class.pi-spinner]="sound.playing()"
                    [class.pi-volume-up]="!sound.playing()"
                    [class.text-[var(--color-gold-light)]]="sound.playing()"
                    [class.text-[var(--text-muted)]]="!sound.playing()"
                  ></i>
                </div>

                <input
                  pInputText
                  class="p-inputtext-sm w-full bg-transparent border-none !p-0 font-medium text-[var(--text-body)] focus:text-[var(--color-gold)] focus:shadow-none truncate text-sm"
                  [ngModel]="sound.name()"
                  (ngModelChange)="sound.name.set($event)"
                />
              </div>

              <div class="flex items-center gap-2 pl-11 relative z-10">
                <button
                  class="text-[var(--text-muted)] hover:text-[var(--color-gold)] transition-colors cursor-pointer"
                  (click)="toggleSound(sound)"
                >
                  <i
                    [class]="sound.playing() ? 'pi pi-pause' : 'pi pi-play'"
                    style="font-size: 0.8rem"
                  ></i>
                </button>

                <button
                  class="text-[var(--text-muted)] hover:text-red-400 transition-colors cursor-pointer"
                  (click)="stopSound(sound)"
                >
                  <i class="pi pi-stop" style="font-size: 0.8rem"></i>
                </button>

                <div class="flex items-center gap-2 ml-2 group/volume">
                  <i class="pi pi-volume-down text-[10px] text-[var(--text-muted)]"></i>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    [ngModel]="sound.volume()"
                    (ngModelChange)="onVolumeChange(sound, $event)"
                    class="volume-slider w-16 h-1 bg-[var(--color-bg)] rounded-full appearance-none cursor-pointer accent-[var(--color-gold)]"
                  />
                </div>

                <div class="flex-1 bg-[var(--color-bg)] h-1 rounded-full overflow-hidden ml-2">
                  <div
                    class="h-full bg-[var(--color-gold)] transition-all duration-300 w-0"
                    [class.animate-pulse]="sound.playing()"
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

    <!-- BOARD -->
    <div
      class="flex flex-[2] overflow-hidden flex-col h-full p-0 relative border-r border-[var(--color-gold)] bg-[var(--color-bg)]"
    >
      <div
        class="h-16 px-6 flex flex-row shrink-0 bg-[var(--color-bg-elevated)] items-center gap-4 justify-between border-b border-[var(--color-gold-dark)] shadow-lg z-10"
      >
        <div class="flex items-center gap-2">
          <span class="text-[var(--text-muted)] uppercase tracking-wider text-xs font-semibold"
            >Active Scene:</span
          >
          <span
            class="text-[var(--color-gold-light)] font-[family-name:var(--font-display)] font-bold text-lg truncate min-w-[150px]"
            [title]="activeScene().name"
            >{{ activeScene().name }}</span
          >
        </div>

        <div class="flex items-center gap-3">
          <div class="h-8 w-px bg-[var(--color-border)] mx-2"></div>

          <button
            class="flex items-center gap-3 px-4 py-2 rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--text-muted)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all cursor-pointer"
            [class.!bg-[#2a241d]]="fogOfWar()"
            [class.!text-[var(--color-gold)]]="fogOfWar()"
            [class.!border-[var(--color-gold)]]="fogOfWar()"
            (click)="toggleFogOfWar()"
          >
            <i [class]="fogOfWar() ? 'pi pi-eye-slash' : 'pi pi-eye'" style="font-size: 1.2rem"></i>
            <div class="flex flex-col items-start leading-none gap-0.5">
              <span class="text-[10px] uppercase opacity-70 tracking-wider">Fog of War</span>
              <span class="font-bold text-xs sticky">{{ fogOfWar() ? 'ACTIVE' : 'OFF' }}</span>
            </div>
          </button>

          <button
            class="flex items-center gap-3 px-6 py-2 rounded bg-[var(--color-success)] text-white hover:brightness-110 shadow-lg shadow-green-900/20 transition-all font-semibold tracking-wide cursor-pointer border border-[#ffffff20]"
            [class.animate-pulse]="castingBoard()"
            (click)="toggleCastingBoard()"
          >
            <i class="pi pi-external-link" style="font-size: 1.2rem"></i>
            <div class="flex flex-col items-start leading-none gap-0.5">
              <span class="font-bold text-xs tracking-wider">{{
                castingBoard() ? 'CASTING...' : 'CAST TO BOARD'
              }}</span>
            </div>
          </button>

          <button
            class="w-10 h-10 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer ml-2"
          >
            <i class="pi pi-cog text-xl"></i>
          </button>
        </div>
      </div>

      <div
        class="flex-1 relative overflow-hidden flex items-center justify-center p-8 bg-[var(--color-bg)]"
      >
        <div
          class="absolute inset-0 pointer-events-none opacity-20"
          style="
            background-image: radial-gradient(var(--text-muted) 1px, transparent 1px);
            background-size: 24px 24px;
          "
        ></div>

        <div class="text-center space-y-2">
          <h2
            class="text-xl font-bold tracking-[0.2em] text-[var(--text-muted)] uppercase font-[family-name:var(--font-display)]"
          >
            Map Render Surface
          </h2>
          <p class="text-[var(--text-muted)] italic opacity-60 font-[family-name:var(--font-body)]">
            Players can only see what is revealed via Fog of War brush
          </p>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div
            class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-full px-10 py-4 shadow-2xl flex items-center justify-center relative"
          >
            <p-dock [model]="dockItems" position="bottom" styleClass="custom-dock">
              <ng-template pTemplate="item" let-item>
                <div
                  class="dock-item flex flex-col items-center gap-1 p-2 transition-all duration-200 hover:scale-110 cursor-pointer group relative"
                  [pTooltip]="item.label"
                  tooltipPosition="top"
                  [class.text-[var(--color-gold)]]="activeTool() === item.id"
                  [class.text-[var(--text-muted)]]="activeTool() !== item.id"
                  (click)="setActiveTool(item.id)"
                  (keydown.enter)="setActiveTool(item.id)"
                  tabindex="0"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center shadow-lg group-hover:border-[var(--color-gold)] transition-colors relative z-10"
                    [class.!border-[var(--color-gold)]]="activeTool() === item.id"
                    [class.!bg-[#2a241d]]="activeTool() === item.id"
                  >
                    <i [class]="item.icon" style="font-size: 1.2rem"></i>
                  </div>
                  <span
                    class="text-[9px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 whitespace-nowrap"
                    >{{ item.label }}</span
                  >
                </div>
              </ng-template>
            </p-dock>
          </div>
        </div>
      </div>

      <div
        class="shrink-0 h-40 bg-[var(--color-bg-elevated)] border-t border-[var(--color-gold)] flex flex-col"
      >
        <div class="px-5 py-3 border-b border-[var(--color-border)] flex items-center gap-2">
          <i class="pi pi-book text-[var(--text-muted)]"></i>
          <span class="text-xs font-bold tracking-widest text-[var(--text-muted)] uppercase"
            >Secret DM Notes</span
          >
        </div>
        <textarea
          class="flex-1 w-full bg-transparent border-none resize-none p-4 text-[var(--text-body)] placeholder-[var(--text-muted)] opacity-80 focus:opacity-100 focus:ring-0 outline-none font-[family-name:var(--font-body)]"
          placeholder="Hidden notes for this room... (Traps, DC checks, Loot)"
        ></textarea>
      </div>
    </div>

    <!-- INITIATIVE AND PLAYERS TOOLS -->
    <div
      class="flex flex-1 overflow-hidden h-full p-0 bg-[var(--color-bg-elevated)] border-l border-[var(--color-gold)]"
    >
      <div class="flex flex-col w-full">
        <div class="flex items-center gap-3 p-4 border-b border-[var(--color-border)] w-full">
          <i class="pi pi-users text-[var(--color-gold)]"></i>
          <h3 class="text-sm font-bold uppercase tracking-[0.15em] m-0">Initiative</h3>
          <div class="flex-1"></div>
          <p-button
            label="NEXT"
            icon="pi pi-arrow-right"
            iconPos="right"
            styleClass="p-button-sm p-button-outlined !border-[var(--color-gold-dark)] !text-[var(--color-gold-light)] hover:!bg-[var(--color-gold-dark)]/20"
          ></p-button>
        </div>
        <div class="p-4 flex flex-col gap-4">
          <div class="text-[var(--text-muted)] text-sm italic">No active combat...</div>
          <p-button
            label="Add Combatant"
            icon="pi pi-plus"
            styleClass="p-button-sm p-button-text !text-[var(--color-gold)]"
          ></p-button>
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./dm-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmView implements OnInit {
  scenes = [
    { name: 'The Bloated Dwarf Inn' },
    { name: 'Bandit ambush' },
    { name: 'The Dark Forest - Entrance' },
  ];

  protected readonly sounds = signal<Sound[]>([]);

  protected readonly fogOfWar = signal(false);
  protected readonly castingBoard = signal(false);
  protected readonly activeScene = signal(this.scenes[0]);
  protected readonly activeTool = signal<string>('select');

  dockItems: MenuItem[] = [];

  ngOnInit() {
    this.dockItems = [
      { id: 'select', label: 'Select', icon: 'pi pi-arrow-up' },
      { id: 'brush', label: 'Brush', icon: 'pi pi-pencil' },
      { id: 'erase', label: 'Erase', icon: 'pi pi-eraser' },
      { id: 'ping', label: 'Ping', icon: 'pi pi-map-marker' },
      { id: 'measure', label: 'Measure', icon: 'pi pi-arrows-h' },
    ];
  }

  toggleFogOfWar() {
    this.fogOfWar.set(!this.fogOfWar());
  }

  toggleCastingBoard() {
    this.castingBoard.set(!this.castingBoard());
  }

  setActiveTool(toolId: string) {
    this.activeTool.set(toolId);
  }

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
      this.sounds.update((s) => [...s, newSound]);
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
