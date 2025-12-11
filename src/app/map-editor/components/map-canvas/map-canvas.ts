import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Canvas as FabricCanvas, FabricText } from 'fabric';

@Component({
  selector: 'app-map-canvas',
  imports: [],
  template: `<canvas id="map-canvas" width="800" height="600"></canvas>`,
  styleUrl: './map-canvas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapCanvas implements OnInit {
  ngOnInit() {
    const mapCanvas = new FabricCanvas('map-canvas');
    const helloWorld = new FabricText('Hello World', {
      left: 100,
      top: 100,
      fontSize: 30,
      fill: 'blue',
    });
    mapCanvas.add(helloWorld);
    mapCanvas.renderAll();
  }
}
