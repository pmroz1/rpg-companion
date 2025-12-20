import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LanguageState } from './languages.state';
import { DynamicFormService } from '@app/shared/services';
import { LanguagesInfo } from './models/languages-info';
import { FormControl } from '@angular/forms';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DndDialogService } from '@app/shared/components/dnd-dialog/dnd-dialog.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DND_LANGUAGES } from '@data/dictionaries/languages.dictionary';
import { DndLanguage } from '@data/models/dnd-language';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-languages',
  imports: [DndCard, ChipModule],
  template: `<app-dnd-card title="Languages">
    <div class="flex flex-row flex-wrap items-center">
      @for (language of this.languagesInfo().knownLanguages; track language) {
        <p-chip
          [removable]="true"
          (onRemove)="removeLanguage(language)"
          [label]="language"
          class="mr-2 mb-2 rounded-md cursor-pointer"
        />
      }
      <p-chip label="Add language" (click)="show()" class="add-language-chip mb-2" />
    </div>
  </app-dnd-card>`,
  styleUrl: './languages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Languages implements OnInit, OnDestroy {
  state = inject(LanguageState);
  private readonly injector = inject(Injector);
  private readonly formService = inject(DynamicFormService);
  private readonly dndDialogService = inject(DndDialogService);

  ref: DynamicDialogRef | undefined | null;

  languages = [...DND_LANGUAGES];

  languagesInfo = this.state.state;
  control = new FormControl<LanguagesInfo>(this.languagesInfo());

  ngOnInit(): void {
    effect(
      () => {
        this.control.setValue(this.languagesInfo());
      },
      { injector: this.injector },
    );
    this.formService.addControl('languages', this.control);
  }

  show() {
    this.ref = this.dndDialogService.openMultiselect(
      'Select languages',
      'Select languages',
      this.languages.filter(
        (language) => !this.languagesInfo().knownLanguages.includes(language.name),
      ),
    );

    this.ref?.onClose.subscribe((selectedLanguages: DndLanguage[]) => {
      if (selectedLanguages && selectedLanguages.length > 0) {
        const currentLanguages = this.languagesInfo().knownLanguages;
        const newLanguages = selectedLanguages.filter(
          (language) => !currentLanguages.some((l) => l === language.name),
        );
        this.state.updateState({
          knownLanguages: [...currentLanguages, ...newLanguages.map((l) => l.name)],
        });
      }
    });
  }

  removeLanguage(language: string) {
    this.state.updateState({
      knownLanguages: this.languagesInfo().knownLanguages.filter((l) => l !== language),
    });
  }
  ngOnDestroy(): void {
    this.formService.removeControl('languages');
  }
}
