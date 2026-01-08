import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DndMonster } from '@data/models';

@Component({
  selector: 'app-monster-stat-block',
  standalone: true,
  template: `
    <div class="min-h-full bg-[#16120e] p-6 pb-24 relative">
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,_var(--color-gold)_0%,_transparent_70%)] opacity-5 pointer-events-none"
      ></div>

      <div class="mb-8 relative">
        <h2
          class="text-4xl font-bold font-[family-name:var(--font-display)] text-[var(--color-gold)] leading-none mb-3 drop-shadow-md tracking-wide"
        >
          {{ monster().name }}
        </h2>
        <div
          class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)] font-bold uppercase tracking-widest border-b border-[var(--color-gold)]/20 pb-5"
        >
          <span class="text-[var(--text-body)]">{{ monster().size }} {{ monster().type }}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-dark)] opacity-40"></span>
          <span class="text-[var(--text-body)]">{{ monster().alignment }}</span>

          <div class="ml-auto flex items-center gap-2">
            <span
              class="bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/20 text-[var(--color-gold)] px-2 py-0.5 rounded font-bold text-[10px]"
              >CR {{ monster().challengeRating }}</span
            >
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-3 gap-0 mb-8 bg-[#000]/30 rounded-lg border border-[var(--color-border)] overflow-hidden shadow-inner"
      >
        <div
          class="flex flex-col items-center justify-center py-4 border-r border-[#3a2e25] bg-gradient-to-b from-transparent to-[#1a1510]"
        >
          <span
            class="text-[10px] uppercase tracking-widest text-[var(--color-gold-dark)] mb-1 font-bold"
            >Armor Class</span
          >
          <span class="text-2xl font-bold text-[var(--text-heading)] leading-none font-serif">{{
            monster().armorClass
          }}</span>
        </div>

        <div
          class="flex flex-col items-center justify-center py-4 border-r border-[#3a2e25] bg-gradient-to-b from-transparent to-[#1a1510]"
        >
          <span
            class="text-[10px] uppercase tracking-widest text-[var(--color-gold-dark)] mb-1 font-bold"
            >Hit Points</span
          >
          <span class="text-2xl font-bold text-[var(--text-heading)] leading-none font-serif">{{
            monster().hitPoints
          }}</span>
        </div>

        <div
          class="flex flex-col items-center justify-center py-4 bg-gradient-to-b from-transparent to-[#1a1510]"
        >
          <span
            class="text-[10px] uppercase tracking-widest text-[var(--color-gold-dark)] mb-1 font-bold"
            >Speed</span
          >
          <span
            class="text-lg font-bold text-[var(--text-heading)] leading-tight text-center px-2 font-serif"
            >{{ monster().speed }}</span
          >
        </div>
      </div>

      <div class="grid grid-cols-6 gap-2 mb-8">
        @for (ability of abilities; track $index) {
          @let score = getAbilityScore(monster(), ability);
          <div
            class="flex flex-col items-center bg-[#251d18] rounded-md py-2 border border-[#3a2e25] relative overflow-hidden group"
          >
            <div
              class="absolute inset-0 bg-[var(--color-gold)]/5 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <span
              class="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-0.5"
              >{{ ability }}</span
            >
            <span class="text-lg font-bold text-[var(--color-gold)] font-serif leading-none">{{
              score
            }}</span>
            <span
              class="text-[10px] text-[var(--text-body)] font-medium mt-0.5 bg-[#000]/30 px-1.5 py-px rounded border border-white/5"
              >{{ getModifier(score) }}</span
            >
          </div>
        }
      </div>

      <div
        class="space-y-3 text-xs mb-8 p-4 bg-[#000]/20 rounded border border-dashed border-[var(--color-border)]/50"
      >
        @if (monster().senses.length) {
          <div class="flex gap-2 leading-relaxed items-baseline">
            <span
              class="font-bold text-[var(--color-gold-dark)] uppercase tracking-wide shrink-0 text-[10px]"
              >Senses</span
            >
            <span class="text-[var(--text-body)]">{{ monster().senses.join(', ') }}</span>
          </div>
        }
        @if (monster().languages.length) {
          <div class="flex gap-2 leading-relaxed items-baseline">
            <span
              class="font-bold text-[var(--color-gold-dark)] uppercase tracking-wide shrink-0 text-[10px]"
              >Languages</span
            >
            <span class="text-[var(--text-body)] italic opacity-90">{{
              monster().languages.join(', ')
            }}</span>
          </div>
        }
      </div>

      <div class="space-y-10">
        @if (monster().traits?.length) {
          <div class="space-y-5">
            @for (trait of monster().traits; track trait) {
              <div
                class="text-sm leading-7 relative pl-4 border-l-2 border-[var(--color-gold)]/20 hover:border-[var(--color-gold)]/60 transition-colors"
              >
                @let parts = getTraitParts(trait);
                <span
                  class="font-bold text-[var(--color-gold-light)] text-[15px] font-serif tracking-wide"
                  >{{ parts.name }}.</span
                >
                <span class="text-[var(--text-body)] opacity-90">{{ parts.desc }}</span>
              </div>
            }
          </div>
        }

        @if (monster().actions.length) {
          <div>
            <h4
              class="text-lg font-bold font-[family-name:var(--font-display)] uppercase text-[var(--color-gold)] border-b border-[var(--color-border)] pb-2 mb-6 flex items-center gap-3"
            >
              <span
                class="h-px bg-gradient-to-r from-transparent to-[var(--color-gold)] flex-1 opacity-50"
              ></span>
              Actions
              <span
                class="h-px bg-gradient-to-l from-transparent to-[var(--color-gold)] flex-1 opacity-50"
              ></span>
            </h4>

            <div class="space-y-6">
              @for (action of monster().actions; track action) {
                <div class="text-sm leading-7 group">
                  @let parts = getTraitParts(action);
                  <span
                    class="font-bold text-[var(--color-gold-light)] text-[15px] font-serif italic border-b border-dashed border-[var(--color-gold)]/30 group-hover:border-[var(--color-gold)]/60 transition-colors"
                  >
                    {{ parts.name }}.
                  </span>
                  <span class="text-[var(--text-body)] opacity-90">{{ parts.desc }}</span>
                </div>
              }
            </div>
          </div>
        }

        @if (monster().legendaryActions?.length) {
          <div
            class="bg-gradient-to-b from-[#3a2818]/40 to-[#221810]/40 p-6 rounded-lg border border-[var(--color-gold-dark)]/30 relative overflow-hidden shadow-lg"
          >
            <div
              class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent opacity-50"
            ></div>

            <h4
              class="text-sm font-bold uppercase tracking-[0.25em] text-[#e8b678] mb-6 flex items-center justify-center gap-2 text-center"
            >
              <i class="pi pi-bolt text-[var(--color-gold)] opacity-70"></i>
              Legendary Actions
              <i class="pi pi-bolt text-[var(--color-gold)] opacity-70"></i>
            </h4>

            <div class="space-y-5">
              @for (action of monster().legendaryActions; track action) {
                <div class="text-sm leading-7 pl-2">
                  @let parts = getTraitParts(action);
                  <span class="font-bold text-[var(--color-gold-light)] font-serif"
                    >{{ parts.name }}.</span
                  >
                  <span class="text-[#d8c3a5] opacity-90">{{ parts.desc }}</span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonsterStatBlockComponent {
  monster = input.required<DndMonster>();
  abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

  getModifier(score: number): string {
    const mod = Math.floor((score - 10) / 2);
    return (mod >= 0 ? '+' : '') + mod;
  }

  getAbilityScore(monster: DndMonster, ability: string): number {
    switch (ability) {
      case 'STR':
        return monster.strength;
      case 'DEX':
        return monster.dexterity;
      case 'CON':
        return monster.constitution;
      case 'INT':
        return monster.intelligence;
      case 'WIS':
        return monster.wisdom;
      case 'CHA':
        return monster.charisma;
      default:
        return 10;
    }
  }

  getTraitParts(text: string): { name: string; desc: string } {
    const dotIndex = text.indexOf('. ');
    if (dotIndex > -1) {
      return {
        name: text.substring(0, dotIndex),
        desc: text.substring(dotIndex + 1),
      };
    }
    const parenIndex = text.indexOf(' (');
    if (parenIndex > -1) {
      return {
        name: text.substring(0, parenIndex),
        desc: text.substring(parenIndex),
      };
    }
    return { name: text, desc: '' };
  }
}
