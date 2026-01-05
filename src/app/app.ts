import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Skeleton } from 'primeng/skeleton';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Menubar, Skeleton],
  template: `<div class="flex flex-col h-screen overflow-hidden">
    @if (!hideNavbar()) {
      <header
        class="bg-[var(--color-bg-elevated)] border-b-2 border-[var(--color-gold-dark)] px-6 py-2 flex-none"
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
    }
    <main class="flex-1 overflow-y-auto" [class.p-6]="!hideNavbar()">
      @if (isLoading()) {
        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-5"><p-skeleton height="8rem" /></div>
            <div class="col-span-1"><p-skeleton height="8rem" /></div>
            <div class="col-span-6"><p-skeleton height="8rem" /></div>
          </div>
          <div class="grid grid-cols-6 gap-4">
            @for (i of [1, 2, 3, 4, 5, 6]; track i) {
              <p-skeleton height="4rem" />
            }
          </div>
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-3"><p-skeleton height="20rem" /></div>
            <div class="col-span-9 flex flex-col gap-4">
              <p-skeleton height="12rem" />
              <p-skeleton height="12rem" />
            </div>
          </div>
        </div>
      } @else {
        <router-outlet />
      }
    </main>
  </div> `,
})
export class App {
  private readonly router = inject(Router);
  protected readonly isLoading = signal(false);
  protected readonly hideNavbar = signal(false);

  constructor() {
    this.router.events
      .pipe(takeUntilDestroyed())
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe((event) => {
        this.isLoading.set(event instanceof NavigationStart);

        if (event instanceof NavigationEnd) {
          this.hideNavbar.set(event.urlAfterRedirects.includes('game-session/board'));
        }
      });
  }

  menuItems: MenuItem[] = [
    { label: 'Dashboard', routerLink: '/dashboard' },
    { label: 'Character Sheet', routerLink: '/character-sheet' },
    { label: 'Map Editor', routerLink: '/map-editor' },
    { label: 'Game Session', routerLink: '/game-session' },
  ];
}
