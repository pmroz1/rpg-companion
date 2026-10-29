import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { vi } from 'vitest';
import { DndDialogService } from './dnd-dialog.service';

describe('DndDialogService', () => {
  afterEach(() => vi.restoreAllMocks());

  it('opens a secondary dialog from fullscreen using an injection context', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([]), DialogService] });
    const open = vi.spyOn(DialogService.prototype, 'open').mockReturnValue(new DynamicDialogRef());
    const primary = TestBed.inject(DialogService);
    const service = TestBed.inject(DndDialogService);
    service.openFullscreen('Sheet', 'app-info', false);
    service.openSimple('Details', 'Example');
    expect(open).toHaveBeenCalledTimes(2);
    expect(open.mock.contexts[0]).toBe(primary);
    expect(open.mock.contexts[1]).toBeInstanceOf(DialogService);
    expect(open.mock.contexts[1]).not.toBe(primary);
  });
});
