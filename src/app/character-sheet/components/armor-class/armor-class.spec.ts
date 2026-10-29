import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputNumber } from 'primeng/inputnumber';
import { ArmorClass } from './armor-class';

describe('ArmorClass', () => {
  it('does not add the shield bonus a second time when editing the displayed total', () => {
    const fixture = TestBed.createComponent(ArmorClass);
    fixture.detectChanges();
    fixture.componentInstance.hasShield.set(true);
    fixture.detectChanges();
    fixture.debugElement.query(By.directive(InputNumber)).triggerEventHandler('ngModelChange', 16);
    fixture.detectChanges();
    expect(fixture.componentInstance.effectiveArmorClass()).toBe(16);
    fixture.componentInstance.hasShield.set(false);
    expect(fixture.componentInstance.effectiveArmorClass()).toBe(14);
  });
});
