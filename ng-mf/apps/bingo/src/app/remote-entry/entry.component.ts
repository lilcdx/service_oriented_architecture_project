import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'ng-mf-bingo-entry',
  template: `<ng-mf-nx-welcome></ng-mf-nx-welcome>`,
})
export class RemoteEntryComponent {}
