import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-session',
  imports: [],
  template: `<p>new-session works!</p>`,
  styleUrl: './new-session.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewSession {}
