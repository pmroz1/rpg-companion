import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import {
  Canvas,
  Circle,
  FabricObject,
  FabricObjectProps,
  FabricText,
  ObjectEvents,
  SerializedObjectProps,
} from 'fabric';

@Component({
  selector: 'app-map-editor',
  imports: [ReactiveFormsModule, DndCard, MenubarModule],
  template: `<app-dnd-card title="Dungeon Map">
    <p-menubar [model]="items"></p-menubar>
    <div class="map-canvas-container">
      <canvas id="map-canvas" class="map-canvas"></canvas>
    </div>
  </app-dnd-card>`,
  styleUrls: ['./map-editor.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapEditor implements OnInit {
  mapCanvas!: Canvas;
  gridSize = 50;
  items: MenuItem[] = [
    {
      label: 'Add Monster',
      icon: 'pi pi-plus',
      command: () => {
        this.addCircle();
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      disabled: false, // FIXME: this.mapCanvas ? !this.mapCanvas.getActiveObject() : true,
      command: () => {
        this.removeActiveObject();
      },
    },
  ];

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

    this.addOnObjectMovingListener();
    this.addOnObjectScalingListener();
  }

  addCircle() {
    const circle = new Circle({
      radius: 25,
      fill: 'gray',
      snapAngle: 45,
      cornerStyle: 'circle',
    });
    circle.setControlsVisibility({
      bl: false,
      mb: false,
      ml: false,
      mr: false,
      mt: false,
      tl: false,
      tr: false,
    });
    this.mapCanvas.add(circle);
    const activeObject = this.mapCanvas.getActiveObject();
    if (activeObject) {
      circle.set({
        left: activeObject.left! + 40,
        top: activeObject.top! + 40,
      });
    } else {
      this.mapCanvas.centerObject(circle);
    }
    this.snapToGrid(circle);
    this.mapCanvas.setActiveObject(circle);
    this.mapCanvas.renderAll();
  }

  removeActiveObject() {
    const activeObject = this.mapCanvas.getActiveObject();
    if (activeObject) {
      this.mapCanvas.remove(activeObject);
      this.mapCanvas.renderAll();
    }
  }

  initCanvasSize() {
    const canvasElement = document.getElementById('map-canvas') as HTMLCanvasElement;
    if (!canvasElement) return;
    const parentElement = canvasElement.parentElement;
    if (!parentElement) return;
    canvasElement.width = parentElement.clientWidth - 2 * 20;
    canvasElement.height = parentElement.clientHeight;
  }

  /**
   * Adds an on-object-moving listener that:
   * - resizes the canvas if an object is dragged beyond its current bounds,
   * - snaps objects to a grid while dragging.
   */
  addOnObjectMovingListener() {
    this.mapCanvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj) return;

      this.snapToGrid(obj);

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

  /**
   * Adds an on-object-scaling listener that snaps objects to a grid while resizing.
   */
  addOnObjectScalingListener() {
    this.mapCanvas.on('object:scaling', (e) => {
      const obj = e.target;
      if (!obj) return;

      const snappedWidth = Math.round((obj.width! * obj.scaleX!) / this.gridSize) * this.gridSize;
      const snappedHeight = Math.round((obj.height! * obj.scaleY!) / this.gridSize) * this.gridSize;
      obj.set({
        scaleX: snappedWidth / obj.width!,
        scaleY: snappedHeight / obj.height!,
      });
      console.log(`Snapped to ${snappedWidth} x ${snappedHeight}`, obj.scaleX, obj.scaleY);
    });
  }

  snapToGrid(obj: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>) {
    obj.set({
      left: Math.round(obj.left / this.gridSize) * this.gridSize,
      top: Math.round(obj.top / this.gridSize) * this.gridSize,
    });
  }
}
