import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DND_MONSTERS } from '@data/dictionaries/monsters.dictionary';
import { DndMonster } from '@data/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';

@Component({
  selector: 'app-monsters-table',
  imports: [TableModule, ButtonModule, DndCard],
  template: `
    <app-dnd-card title="Monsters" [displayTitle]="false">
      <app-dnd-card title="Selected Monsters" [displayTitle]="false">
        @for (sm of selectedMonsters; track sm.name) {
          <div class="selected-monster">
            <span>{{ sm.name }} (CR: {{ sm.challengeRating }})</span>
          </div>
        } @empty {
          <h3 style="display: flex; justify-content: center; color: var(--text-muted);">
            Select monsters you wish to add to the dungeon
          </h3>
        }
      </app-dnd-card>
      <p-table
        [value]="monsters"
        [(selection)]="selectedMonsters"
        dataKey="name"
        [expandedRowKeys]="expandedRows"
        [paginator]="true"
        [rows]="5"
        [rowsPerPageOptions]="[5, 10, 25, 50]"
        sortField="name"
        stripedRows
      >
        <ng-template #caption>
          <div class="flex flex-wrap justify-end gap-2">
            <p-button label="Expand All" icon="pi pi-plus" text (onClick)="expandAll()" />
            <p-button label="Collapse All" icon="pi pi-minus" text (onClick)="collapseAll()" />
          </div>
        </ng-template>
        <ng-template #header>
          <tr>
            <th style="width: 4rem"><p-tableHeaderCheckbox /></th>
            <th style="width: 5rem"></th>
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
        <ng-template #body let-monster let-expanded="expanded">
          <tr>
            <td><p-tableCheckbox [value]="monster" /></td>
            <td>
              <p-button
                type="button"
                pRipple
                [pRowToggler]="monster"
                [text]="true"
                severity="secondary"
                [rounded]="true"
                [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
              />
            </td>
            <td>{{ monster.name }}</td>
            <td>{{ monster.type }}</td>
            <td>{{ monster.size }}</td>
            <td>{{ monster.habitat }}</td>
            <td>{{ monster.challengeRating }}</td>
            <td>{{ monster.armorClass }}</td>
            <td>{{ monster.hitPoints }} ({{ monster.hitPointsFormula }})</td>
          </tr>
        </ng-template>
        <ng-template #expandedrow let-monster>
          <tr>
            <td colspan="2"></td>
            <td colspan="6">
              <p-table [value]="[monster]" class="inner-table">
                <ng-template #header>
                  <tr>
                    <th>Strength</th>
                    <th>Dexterity</th>
                    <th>Constitution</th>
                    <th>Intelligence</th>
                    <th>Wisdom</th>
                    <th>Charisma</th>
                  </tr>
                </ng-template>
                <ng-template #body>
                  <tr>
                    <td>{{ monster.strength }}</td>
                    <td>{{ monster.dexterity }}</td>
                    <td>{{ monster.constitution }}</td>
                    <td>{{ monster.intelligence }}</td>
                    <td>{{ monster.wisdom }}</td>
                    <td>{{ monster.charisma }}</td>
                  </tr>
                </ng-template>
              </p-table>
              <table>
                <tr>
                  <th style="text-align: right; padding-right: 1rem; color: var(--text-muted);">
                    Alignment:
                  </th>
                  <td>{{ monster.alignment }}</td>
                </tr>
                <tr>
                  <th style="text-align: right; padding-right: 1rem; color: var(--text-muted);">
                    Speed:
                  </th>
                  <td>{{ monster.speed }}</td>
                </tr>
                <tr>
                  <th style="text-align: right; padding-right: 1rem; color: var(--text-muted);">
                    Languages:
                  </th>
                  <td>{{ monster.languages.join(', ') }}</td>
                </tr>
                <tr>
                  <th style="text-align: right; padding-right: 1rem; color: var(--text-muted);">
                    Actions:
                  </th>
                  <td>{{ monster.actions.join(', ') }}</td>
                </tr>
                <tr>
                  <th style="text-align: right; padding-right: 1rem; color: var(--text-muted);">
                    Gear:
                  </th>
                  <td>{{ monster.gear.join(', ') }}</td>
                </tr>
              </table>
            </td>
            <td colspan="1"></td>
          </tr>
        </ng-template>
      </p-table>
    </app-dnd-card>
  `,
  styleUrls: ['./monsters-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonstersTable {
  monsters: DndMonster[] = [...DND_MONSTERS];
  selectedMonsters: DndMonster[] = [];
  expandedRows: Record<string, boolean> = {};

  expandAll() {
    this.expandedRows = this.monsters.reduce(
      (acc, m) => {
        acc[m.name] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
  }

  collapseAll() {
    this.expandedRows = {};
  }
}
