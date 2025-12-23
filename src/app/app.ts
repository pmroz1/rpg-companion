import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ButtonModule, Menubar],
  template: `<div class="min-h-screen">
    <header
      class="bg-[var(--color-bg-elevated)] border-b-2 border-[var(--color-gold-dark)] px-6 py-2"
    >
      <p-menubar [model]="menuItems">
        <ng-template #start>
          <h1 class="text-2xl gold-text tracking-wide">D&D 5e Companion</h1>
        </ng-template>
        <ng-template #item let-item>
          <a
            [routerLink]="item.routerLink"
            class="p-menubar-item-link"
            routerLinkActive="active-route"
          >
            <span class="p-menubar-item-label">{{ item.label }}</span>
          </a>
        </ng-template>
      </p-menubar>
    </header>
    <main class="p-6"><router-outlet /></main>
  </div> `,
})
export class App {
  protected readonly title = signal('rpg-companion');

  menuItems: MenuItem[] = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Character Sheet', routerLink: '/character-sheet' },
    { label: 'Map Editor', routerLink: '/map-editor' },
    { label: 'Game Session', routerLink: '/game-session' },
  ];
}
