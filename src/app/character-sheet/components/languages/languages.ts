import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LanguageState } from './languages.state';
import { DynamicFormService } from '@app/shared/services';
import { LanguagesInfo } from './models/languages-info';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DndCard } from '@app/shared/components/dnd-card/dnd-card';
import { DndDialogService } from '@app/shared/components/dnd-dialog/dnd-dialog.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DND_LANGUAGES } from '@data/dictionaries/languages.dictionary';
import { DndLanguage } from '@data/models/dnd-language';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-languages',
  imports: [DndCard, ChipModule, ReactiveFormsModule],
  template: `<app-dnd-card title="Languages">
    <div class="flex flex-column" [formGroup]="form">
      <div class="flex flex-col gap-6 items-center w-full">
        <div class="flex flex-row flex-wrap items-center">
          @for (language of languageState().knownLanguages; track language) {
            <p-chip
              [removable]="true"
              (onRemove)="removeLanguage(language)"
              [label]="language"
              class="mr-2 mb-2 rounded-md cursor-pointer"
            />
          }
          <p-chip label="Add language" (click)="show()" class="add-language-chip mb-2 " />
        </div>
      </div>
    </div>
  </app-dnd-card>`,
  styleUrl: './languages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Languages implements OnInit, OnDestroy {
  private readonly formService = inject(DynamicFormService);
  private readonly dndDialogService = inject(DndDialogService);
  readonly state = inject(LanguageState);

  ref: DynamicDialogRef | undefined | null;
  languages = [...DND_LANGUAGES];
  languageState = this.state.state;

  form = new FormGroup({
    knownLanguages: new FormControl<string[]>([], { nonNullable: true }),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.state.updateState(value as Partial<LanguagesInfo>);
    });

    effect(() => {
      const stateValue = this.languageState();
      this.form.patchValue(stateValue, { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.formService.addControl('languages', this.form);
  }

  show() {
    const currentLanguages = this.form.controls.knownLanguages.value;
    this.ref = this.dndDialogService.openMultiselect(
      'Select languages',
      ' ',
      this.languages.filter((language) => !currentLanguages.includes(language.name)),
    );

    this.ref?.onClose.subscribe((selectedLanguages: DndLanguage[]) => {
      if (selectedLanguages && selectedLanguages.length > 0) {
        const current = this.form.controls.knownLanguages.value;
        const newLanguages = selectedLanguages.filter(
          (language) => !current.some((l) => l === language.name),
        );
        this.form.controls.knownLanguages.setValue([
          ...current,
          ...newLanguages.map((l) => l.name),
        ]);
      }
    });
  }

  removeLanguage(language: string) {
    const current = this.form.controls.knownLanguages.value;
    this.form.controls.knownLanguages.setValue(current.filter((l) => l !== language));
  }

  ngOnDestroy(): void {
    this.formService.removeControl('languages');
  }
}
