import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dm-tools',
  imports: [],
  template: `<p>dm-view works!</p>`,
  styleUrls: ['./dm-view.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmView {}
