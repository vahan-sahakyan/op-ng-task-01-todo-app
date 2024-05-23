import { Component } from '@angular/core';

@Component({
  selector: 'app-todos-container',
  styleUrls: ['./todos-container.component.scss'],
  template: `
    <div
      class="w-full max-w-md bg-white dark:bg-zinc-700 rounded-lg shadow-md p-6"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class TodosContainerComponent {}
