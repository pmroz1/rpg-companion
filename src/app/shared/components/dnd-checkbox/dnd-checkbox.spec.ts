import { TestBed } from '@angular/core/testing';
import { DndCheckbox } from './dnd-checkbox';

describe('DndCheckbox', () => {
  it('toggles once when clicking the input or its label', async () => {
    const fixture = TestBed.createComponent(DndCheckbox);
    fixture.componentRef.setInput('label', 'Shield');
    fixture.detectChanges();
    await fixture.whenStable();
    const checkbox: HTMLInputElement =
      fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkbox.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.checked()).toBe(true);
    expect(checkbox.checked).toBe(true);
    checkbox.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.checked()).toBe(false);
    const label: HTMLElement = fixture.nativeElement.querySelector('.dnd-checkbox');
    label.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.checked()).toBe(true);
    expect(checkbox.checked).toBe(true);
    expect(
      fixture.nativeElement.querySelectorAll('[role="checkbox"], input[type="checkbox"]').length,
    ).toBe(1);
  });
});
