import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { DND_MONSTERS } from '@data/dictionaries/monsters.dictionary';
import { DndMonster } from '@data/models';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { Chip } from 'primeng/chip';
import { MapEditorStateService } from '@app/map-editor/services/map-editor-state.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-monsters-table',
  imports: [DataViewModule, ButtonModule, DndCard, KeyValuePipe, Chip, SelectModule],
  template: `
    <app-dnd-card title="Monsters" [displayTitle]="false">
      <app-dnd-card title="Selected Monsters" [displayTitle]="false">
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
      <p-dataview
        #dv
        [value]="monsters"
        dataKey="name"
        layout="list"
        [paginator]="true"
        [rows]="10"
        [rowsPerPageOptions]="[5, 10, 15, 25, 50]"
        [sortField]="sortField"
        [sortOrder]="sortOrder"
      >
        <ng-template #header>
          <div class="flex flex-col md:flex-row md:justify-between">
            <p-select
              id="sortField-select"
              [options]="sortOptions"
              formControlName="sortField"
              placeholder="Sort By"
              (onChange)="onSortChange($event)"
              class="mb-2 md:mb-0"
            />
          </div>
        </ng-template>
        <ng-template #list let-monsters>
          <div class="grid grid-cols-12 gap-4 grid-nogutter">
            @for (monster of monsters; track monster.name) {
              <div class="col-span-12">
                <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
                  <div
                    class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
                  >
                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                      <div>
                        <span class="font-medium text-secondary text-sm">{{ monster.type }}</span>
                        <div class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2">
                          {{ monster.name }}
                        </div>
                      </div>
                      <div
                        class="bg-surface-100 dark:bg-surface-700 p-1"
                        style="border-radius: 30px"
                      >
                        <div
                          class="bg-surface-0 dark:bg-surface-900 flex items-center gap-2 justify-center py-1 px-2"
                          style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                        >
                          <span class="text-surface-900 dark:text-surface-0 font-medium text-sm">{{
                            monster.rating
                          }}</span>
                          <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col md:items-end gap-8">
                      <span class="text-xl font-semibold text-surface-900 dark:text-surface-0">{{
                        '$' + monster.price
                      }}</span>
                      <div class="flex flex-row-reverse md:flex-row gap-2">
                        <p-button icon="pi pi-heart" [outlined]="true" />
                        <p-button
                          icon="pi pi-shopping-cart"
                          class="flex-auto md:flex-initial whitespace-nowrap"
                          label="Buy Now"
                          [disabled]="monster.inventoryStatus === 'OUTOFSTOCK'"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </ng-template>
      </p-dataview>
      <!-- <p-table
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
      </p-table> -->
    </app-dnd-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonstersTable {
  private mapEditorService = inject(MapEditorStateService);
  private dialogRef = inject(DynamicDialogRef, { optional: true });

  sortOptions = [
    { label: 'Name Ascending', value: 'name' },
    { label: 'Name Descending', value: '!name' },
    { label: 'Type Ascending', value: 'type' },
    { label: 'Type Descending', value: '!type' },
    { label: 'Challenge Rating Ascending', value: 'challengeRating' },
    { label: 'Challenge Rating Descending', value: '!challengeRating' },
  ];
  sortField = 'name';
  sortOrder = 1;

  monsters: DndMonster[] = [...DND_MONSTERS];
  selectedMonsters: Record<string, { monster: DndMonster; count: number }> = {};

  onSortChange(event: SelectChangeEvent) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
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
