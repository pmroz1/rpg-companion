import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DndGrid, DndGridCell } from './dnd-grid';

@Component({
  standalone: true,
  template: `
    <app-dnd-grid>
      <app-dnd-grid-cell [colspan]="colspan" [rowspan]="rowspan">
        <span class="test-content">Test Content</span>
      </app-dnd-grid-cell>
    </app-dnd-grid>
  `,
  imports: [DndGrid, DndGridCell],
})
class TestHostComponent {
  colspan = 4;
  rowspan = 3;
}

describe('DndGrid', () => {
  let fixture: ComponentFixture<DndGrid>;
  let component: DndGrid;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DndGrid],
    }).compileComponents();
    fixture = TestBed.createComponent(DndGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('DndGrid content projection and cell classes', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });
  it('should render projected content', () => {
    const content = fixture.nativeElement.querySelector('.test-content');
    expect(content).toBeTruthy();
    expect(content.textContent).toContain('Test Content');
  });
  it('should have dnd-grid wrapper', () => {
    const grid = fixture.nativeElement.querySelector('.dnd-grid');
    expect(grid).toBeTruthy();
  });

  it('should apply correct row and col span classes to grid cell', () => {
    const cellDiv = fixture.nativeElement.querySelector('app-dnd-grid-cell');
    expect(cellDiv.classList.contains('dnd-grid-col-span-4')).toBe(true);
    expect(cellDiv.classList.contains('dnd-grid-row-span-3')).toBe(true);
  });
});
