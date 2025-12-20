import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import {
  ActiveSelection,
  Canvas,
  Circle,
  FabricObject,
  FabricObjectProps,
  ObjectEvents,
  SerializedObjectProps,
  Textbox,
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
  private cdr = inject(ChangeDetectorRef);

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
      label: 'Add Text',
      icon: 'pi pi-pencil',
      command: () => {
        this.addTextbox();
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      disabled: false,
      command: () => {
        this.removeActiveObject();
      },
    },
  ];

  ngOnInit() {
    this.initCanvasSize();

    this.mapCanvas = new Canvas('map-canvas');

    this.addOnObjectMovingListener();
    this.addSelectionListeners();
    this.addKeyboardListeners();

    this.addCircle();
    this.addTextbox();
    this.mapCanvas.renderAll();

    // Update button state after initial setup
    this.updateDeleteButtonState();
    // this.addOnObjectScalingListener();
  }

  addCircle() {
    const circle = new Circle({
      radius: 25,
      fill: 'gray',
      snapAngle: 45,
      cornerStyle: 'circle',
      cornerColor: '#d4b33a',
      borderColor: '#d4b33a',
      borderScaleFactor: 1,
    });
    circle.setControlsVisibility({
      bl: false,
      br: false,
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
        left: activeObject.left! + activeObject.width!,
        top: activeObject.top! + activeObject.height!,
      });
    } else {
      this.mapCanvas.centerObject(circle);
    }
    this.snapToGrid(circle);
    this.mapCanvas.setActiveObject(circle);
    this.mapCanvas.renderAll();
  }

  addTextbox() {
    const textbox = new Textbox('New text', {
      fontSize: 24,
      fill: 'white',
      cornerStyle: 'circle',
      cornerColor: '#d4b33a',
      borderColor: '#d4b33a',
    });
    textbox.setControlsVisibility({
      mb: false,
      mt: false,
    });
    this.mapCanvas.add(textbox);
    const activeObject = this.mapCanvas.getActiveObject();
    if (activeObject) {
      textbox.set({
        left: activeObject.left! + activeObject.width!,
        top: activeObject.top! + activeObject.height!,
      });
    } else {
      this.mapCanvas.centerObject(textbox);
    }
    this.mapCanvas.setActiveObject(textbox);
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
  // addOnObjectScalingListener() {
  //   this.mapCanvas.on('object:scaling', (e) => {
  //     const obj = e.target;
  //     if (!obj) return;

  //     const snappedWidth = Math.round((obj.width! * obj.scaleX!) / this.gridSize) * this.gridSize;
  //     const snappedHeight = Math.round((obj.height! * obj.scaleY!) / this.gridSize) * this.gridSize;
  //     obj.set({
  //       scaleX: snappedWidth / obj.width!,
  //       scaleY: snappedHeight / obj.height!,
  //     });
  //     console.log(`Snapped to ${snappedWidth} x ${snappedHeight}`, obj.scaleX, obj.scaleY);
  //   });
  // }

  /**
   * Adds selection event listeners to track when objects are selected or deselected.
   * This enables/disables the delete button accordingly.
   */
  addSelectionListeners() {
    this.mapCanvas.on('selection:created', () => {
      this.updateDeleteButtonState();
    });

    this.mapCanvas.on('selection:updated', () => {
      this.updateDeleteButtonState();
    });

    this.mapCanvas.on('selection:cleared', () => {
      this.updateDeleteButtonState();
    });
  }

  /**
   * Adds keyboard listeners for:
   * - Cmd+A / Ctrl+A: Select all objects on the canvas
   * - Esc: Deselect all objects
   */
  addKeyboardListeners() {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // Select all on Cmd+A (Mac) or Ctrl+A (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
        e.preventDefault();
        this.selectAllObjects();
      }

      // Deselect all on Esc
      if (e.key === 'Escape') {
        this.deselectAllObjects();
      }
    });
  }

  selectAllObjects() {
    const allObjects = this.mapCanvas.getObjects();
    if (allObjects.length > 0) {
      this.mapCanvas.discardActiveObject();
      const selection = new ActiveSelection(allObjects, {
        canvas: this.mapCanvas,
      });
      this.mapCanvas.setActiveObject(selection);
      this.mapCanvas.requestRenderAll();
    }
  }

  deselectAllObjects() {
    this.mapCanvas.discardActiveObject();
    this.mapCanvas.requestRenderAll();
  }

  updateDeleteButtonState() {
    const deleteItem = this.items.find((item) => item.label === 'Delete');
    if (deleteItem) {
      deleteItem.disabled = !this.mapCanvas.getActiveObject();
      // Create new reference to trigger OnPush change detection
      this.items = [...this.items];
      this.cdr.detectChanges();
    }
  }

  snapToGrid(obj: FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents>) {
    obj.set({
      left: Math.round(obj.left / this.gridSize) * this.gridSize,
      top: Math.round(obj.top / this.gridSize) * this.gridSize,
    });
  }
}
