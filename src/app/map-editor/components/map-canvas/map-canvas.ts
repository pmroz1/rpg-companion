import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Canvas, Circle, FabricText } from 'fabric';

@Component({
  selector: 'app-map-canvas',
  imports: [],
  template: `<div class="map-canvas-container">
    <canvas id="map-canvas" class="map-canvas"></canvas>
  </div>`,
  styleUrl: './map-canvas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapCanvas implements OnInit {
  mapCanvas!: Canvas;

  ngOnInit() {
    this.initCanvasSize();

    this.mapCanvas = new Canvas('map-canvas');
    const helloWorld = new FabricText('Hello World', {
      left: 100,
      top: 100,
      fontSize: 30,
      fill: 'blue',
    });
    this.mapCanvas.add(helloWorld);
    this.mapCanvas.renderAll();

    this.addCanvasResizeOnObjectDragListener();
  }

  initCanvasSize() {
    const canvasElement = document.getElementById('map-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;
    const parentElement = canvasElement.parentElement;
    if (!parentElement) return;
    canvasElement.width = parentElement.clientWidth - 2 * 20;
    canvasElement.height = parentElement.clientHeight;
  }

  addCanvasResizeOnObjectDragListener() {
    this.mapCanvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj) return;
      const padding = 40; // extra space beyond object
      const right = obj.left + obj.width * obj.scaleX;
      const bottom = obj.top + obj.height * obj.scaleY;
      let resized = false;
      let desiredWidth = this.mapCanvas.width!;
      let desiredHeight = this.mapCanvas.height!;
      // Check right edge
      if (right > this.mapCanvas.width!) {
        desiredWidth = right + padding;
        resized = true;
      }
      // Check bottom edge
      if (bottom > this.mapCanvas.height!) {
        desiredHeight = bottom + padding;
        resized = true;
      }
      if (resized) {
        this.mapCanvas.setDimensions({ width: desiredWidth, height: desiredHeight });
        this.mapCanvas.renderAll();
      }
    });
  }

  addCircle(radius: number) {
    const circle = new Circle({
      radius: radius,
      fill: 'gray',
    });
    this.mapCanvas.add(circle);
    this.mapCanvas.centerObject(circle);
    this.mapCanvas.setActiveObject(circle);
    this.mapCanvas.renderAll();
  }
}
