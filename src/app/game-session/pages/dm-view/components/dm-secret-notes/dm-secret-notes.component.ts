import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dm-secret-notes',
  standalone: true,
  template: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmSecretNotesComponent {}
