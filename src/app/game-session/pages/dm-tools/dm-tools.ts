import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dm-tools',
  imports: [],
  template: `<p>dm-tools works!</p>`,
  styleUrl: './dm-tools.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DmTools {}
