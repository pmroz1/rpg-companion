import { Component, OnDestroy } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Button } from 'primeng/button';

@Component({
  template: `
    <!-- <p-multiselect
    [options]="cities"
    [(ngModel)]="selectedCities"
    optionLabel="name"
    placeholder="Select Cities"
    [maxSelectedLabels]="3"
    class="w-full md:w-80"
  /> -->
  `,
  providers: [DialogService],
  imports: [],
})
export class AddToolDialog {}
