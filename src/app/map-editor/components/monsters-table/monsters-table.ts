import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { DND_MONSTERS } from '@data/dictionaries/monsters.dictionary';
import { DndMonster } from '@data/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Chip } from 'primeng/chip';
import { MapEditorStateService } from '@app/map-editor/services/map-editor-state.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-monsters-table',
  imports: [TableModule, ButtonModule, DndCard, KeyValuePipe, Chip],
  template: `
    <app-dnd-card>
      <app-dnd-card>
        @for (monsterCounts of selectedMonsters | keyvalue; track monsterCounts.key) {
          <div>
            <p-chip>
              <span
                class="bg-primary text-primary-contrast rounded-full w-6 h-6 flex items-center justify-center"
              >
                {{ monsterCounts.value.count }}
              </span>
              <span> {{ monsterCounts.value.monster.name }} </span>
              <p-button
                size="small"
                icon="pi pi-minus"
                severity="secondary"
                [rounded]="true"
                (onClick)="removeMonster(monsterCounts.value.monster)"
              />
            </p-chip>
          </div>
        } @empty {
          <h3 style="display: flex; justify-content: center; color: var(--text-muted);">
            Select monsters you wish to add to the dungeon
          </h3>
        }
      </app-dnd-card>
      <p-table
        [value]="monsters"
        dataKey="name"
        [expandedRowKeys]="expandedRows"
        [paginator]="true"
        [rows]="5"
        [rowsPerPageOptions]="[5, 10, 25, 50]"
        sortField="name"
        stripedRows
      >
        <ng-template #caption>
          <div class="flex flex-wrap justify-between gap-2">
            <p-button
              label="Add selected monsters"
              icon="pi pi-check"
              (onClick)="submitMonsters()"
              [disabled]="isSelectedMonstersEmpty()"
            />
            <div class="flex flex-wrap gap-2">
              <p-button label="Expand All" icon="pi pi-plus" text (onClick)="expandAll()" />
              <p-button label="Collapse All" icon="pi pi-minus" text (onClick)="collapseAll()" />
            </div>
          </div>
        </ng-template>
        <ng-template #header>
          <tr>
            <th style="width: 4rem"></th>
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
            <td>
              <p-button
                size="small"
                icon="pi pi-plus"
                severity="secondary"
                (onClick)="addMonster(monster)"
              />
            </td>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonstersTable {
  private mapEditorService = inject(MapEditorStateService);
  private dialogRef = inject(DynamicDialogRef, { optional: true });

  monsters: DndMonster[] = [...DND_MONSTERS];
  selectedMonsters: Record<string, { monster: DndMonster; count: number }> = {};
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

  isSelectedMonstersEmpty(): boolean {
    return Object.keys(this.selectedMonsters).length === 0;
  }

  addMonster(monster: DndMonster) {
    if (this.selectedMonsters[monster.name]) {
      this.selectedMonsters[monster.name].count += 1;
    } else {
      this.selectedMonsters[monster.name] = { monster, count: 1 };
    }
  }

  removeMonster(monster: DndMonster) {
    if (this.selectedMonsters[monster.name]) {
      this.selectedMonsters[monster.name].count -= 1;
      if (this.selectedMonsters[monster.name].count <= 0) {
        delete this.selectedMonsters[monster.name];
      }
    }
  }

  submitMonsters() {
    const monstersArray = Object.values(this.selectedMonsters);
    this.mapEditorService.submitMonsters(monstersArray);
    this.selectedMonsters = {};
    this.dialogRef?.close();
  }
}
