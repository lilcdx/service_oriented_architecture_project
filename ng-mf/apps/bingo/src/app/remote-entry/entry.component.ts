import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoComponent } from './bingo.component';

@Component({
  imports: [CommonModule, BingoComponent],
  selector: 'ng-mf-bingo-entry',
  template: `<app-bingo></app-bingo>`,
})
export class RemoteEntryComponent {}
