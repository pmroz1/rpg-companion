import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-map-toolbox',
  imports: [Menubar],
  template: `<p-menubar [model]="items"></p-menubar>`,
  styleUrl: './map-toolbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapToolbox {
  items: MenuItem[] = [
    {
      label: 'Add Monster',
      icon: 'pi pi-file',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      disabled: true,
    },
  ];
}
