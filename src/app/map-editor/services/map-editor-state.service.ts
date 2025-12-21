import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DndMonster } from '@data/models';

// TODO: Rewrite this to use Core State Management instead of RxJS Subjects
@Injectable({
  providedIn: 'root',
})
export class MapEditorStateService {
  private monstersSubmittedSubject = new Subject<{ monster: DndMonster; count: number }[]>();

  monstersSubmitted$ = this.monstersSubmittedSubject.asObservable();

  submitMonsters(monsters: { monster: DndMonster; count: number }[]) {
    this.monstersSubmittedSubject.next(monsters);
  }
}
