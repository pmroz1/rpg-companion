import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-dnd-grid',
  imports: [],
  template: `<ng-content />`,
  styleUrls: ['./dnd-grid.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DndGrid {
  @HostBinding('class.dnd-grid') hostClass = true;
}

@Component({
  selector: 'app-dnd-grid-cell',
  imports: [],
  template: `<ng-content />`,
  styleUrls: ['./dnd-grid.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DndGridCell {
  colspan = input<number>(12);
  rowspan = input<number>(1);

  @HostBinding('class')
  get hostClasses(): string {
    return this.mapColSpanAndRowSpanToClasses(this.colspan(), this.rowspan());
  }

  mapColSpanAndRowSpanToClasses(colspan: number, rowspan: number): string {
    const colspanStr = colspan < 1 ? '1' : colspan > 12 ? '12' : colspan.toString();
    const rowspanStr = rowspan < 1 ? '1' : rowspan > 12 ? '12' : rowspan.toString();
    return `dnd-grid-col-span-${colspanStr} dnd-grid-row-span-${rowspanStr}`;
  }
}

export { DndGrid, DndGridCell };
