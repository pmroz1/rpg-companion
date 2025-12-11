import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'app-dnd-grid',
  imports: [],
  template: `<ng-content />`,
  styleUrls: ['./dnd-grid.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DndGrid {
  @HostBinding('class.dnd-grid') hostClass = true;
}

@Component({
  selector: 'app-dnd-grid-cell',
  imports: [],
  template: `<ng-content />`,
  styles: `
    :host {
      display: grid;
    }

    :host > * {
      grid-area: 1 / 1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DndGridCell {
  colspan = input<number>(12);
  rowspan = input<number>(1);

  @HostBinding('class')
  get hostClasses(): string {
    return this.mapColSpanAndRowSpanToClasses(this.colspan(), this.rowspan());
  }

  mapColSpanAndRowSpanToClasses(colspan: number, rowspan: number): string {
    const intColspan = Math.floor(colspan);
    const intRowspan = Math.floor(rowspan);
    const colspanStr = intColspan < 1 ? '1' : intColspan > 12 ? '12' : intColspan.toString();
    const rowspanStr = intRowspan < 1 ? '1' : intRowspan > 12 ? '12' : intRowspan.toString();
    return `dnd-grid-col-span-${colspanStr} dnd-grid-row-span-${rowspanStr}`;
  }
}
