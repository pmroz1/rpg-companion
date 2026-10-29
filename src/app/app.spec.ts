import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { App } from './app';

@Component({ template: '<input aria-label="Draft" />' })
class Page {}

describe('App navigation', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('preserves the current page and its edits when a navigation is cancelled', async () => {
    vi.stubGlobal('matchMedia', (media: string) => ({
      media,
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    let finishNavigation!: (allowed: boolean) => void;
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'page', component: Page },
          {
            path: 'blocked',
            component: Page,
            canActivate: [
              () =>
                new Promise<boolean>((resolve) => {
                  finishNavigation = resolve;
                }),
            ],
          },
        ]),
      ],
    });
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await router.navigateByUrl('/page');
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'Unsaved draft';
    const navigation = router.navigateByUrl('/blocked');
    await vi.waitFor(() => expect(finishNavigation).toBeDefined());
    fixture.detectChanges();
    finishNavigation(false);
    await navigation;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('input')).toBe(input);
    expect(input.value).toBe('Unsaved draft');
  });
});
