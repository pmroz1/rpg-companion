import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DND_MONSTERS } from '@data/dictionaries/monsters.dictionary';
import { DndMonster } from '@data/models';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-monsters-table',
  imports: [TableModule],
  template: `
    <p-table
      [value]="monsters"
      [paginator]="true"
      [rows]="5"
      [rowsPerPageOptions]="[5, 10, 25, 50]"
      sortField="name"
    >
      <ng-template #header>
        <tr>
          <th pSortableColumn="name">
            <div class="flex items-center gap-2">
              Name
              <p-sortIcon field="name"></p-sortIcon>
            </div>
          </th>
          <th pSortableColumn="type">
            <div class="flex items-center gap-2">
              Type
              <p-sortIcon field="type"></p-sortIcon>
            </div>
          </th>
          <th pSortableColumn="size">
            <div class="flex items-center gap-2">
              Size
              <p-sortIcon field="size"></p-sortIcon>
            </div>
          </th>
          <th pSortableColumn="habitat">
            <div class="flex items-center gap-2">
              Habitat
              <p-sortIcon field="habitat"></p-sortIcon>
            </div>
          </th>
          <th pSortableColumn="challengeRating">
            <div class="flex items-center gap-2">
              Challenge Rating
              <p-sortIcon field="challengeRating"></p-sortIcon>
            </div>
          </th>
          <th pSortableColumn="armorClass">
            <div class="flex items-center gap-2">
              Armor Class
              <p-sortIcon field="armorClass"></p-sortIcon>
            </div>
          </th>
          <th pSortableColumn="hitPoints">
            <div class="flex items-center gap-2">
              Hit Points
              <p-sortIcon field="hitPoints"></p-sortIcon>
            </div>
          </th>
        </tr>
      </ng-template>
      <ng-template #body let-monster>
        <tr>
          <td>{{ monster.name }}</td>
          <td>{{ monster.type }}</td>
          <td>{{ monster.size }}</td>
          <td>{{ monster.habitat }}</td>
          <td>{{ monster.challengeRating }}</td>
          <td>{{ monster.armorClass }}</td>
          <td>{{ monster.hitPoints }} ({{ monster.hitPointsFormula }})</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styleUrls: ['./monsters-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonstersTable implements OnInit {
  monsters: DndMonster[] = [...DND_MONSTERS];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
