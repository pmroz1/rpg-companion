import { TestBed } from '@angular/core/testing';
import { SpellSlots } from './spell-slots';

describe('SpellSlots', () => {
  it('renders the table headers and all nine spell levels', async () => {
    const fixture = TestBed.createComponent(SpellSlots);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('thead th').length).toBe(9);
    const rows: HTMLTableRowElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('tbody tr'),
    );
    expect(rows.length).toBe(9);
    expect(rows[0].textContent).toContain('Lvl 1');
    expect(rows[8].textContent).toContain('Lvl 9');
    expect(
      fixture.nativeElement.querySelectorAll('p-inputnumber input, p-input-number input').length,
    ).toBe(9);
  });
});
