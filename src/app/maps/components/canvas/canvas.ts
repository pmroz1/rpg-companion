import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Canvas as FabricCanvas, FabricText } from 'fabric';

@Component({
  selector: 'app-canvas',
  imports: [],
  template: `<canvas id="maincanvas" width="800" height="600"></canvas>`,
  styleUrl: './canvas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Canvas {
  ngOnInit() {
    const canvas = new FabricCanvas('maincanvas');
    const helloWorld = new FabricText('Hello World', {
      left: 100,
      top: 100,
      fontSize: 30,
      fill: 'blue',
    });
    canvas.add(helloWorld);
    canvas.renderAll();
  }

  ngOnDestroy() {}
}
