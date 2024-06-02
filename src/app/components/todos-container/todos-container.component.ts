import { Component } from '@angular/core';

// I don't think we need this component its only works as a wrapper in the app component.
@Component({
  selector: 'app-todos-container',
  styleUrls: ['./todos-container.component.scss'],
  template: `
    <div class=" bg-white dark:bg-zinc-700 rounded-lg shadow-md p-6">
      <ng-content></ng-content>
    </div>
  `,
})
export class TodosContainerComponent {}
