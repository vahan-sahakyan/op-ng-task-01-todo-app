import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <div
      class="relative flex justify-between items-center mb-4 mt-10 select-none"
    >
      <h1
        class="text-2xl font-bold text-center flex-grow dark:text-white select-none"
      >
        TODO LIST
      </h1>
      <div class="flex ml-4 cursor-pointer absolute">
        <input
          type="checkbox"
          id="select-all"
          (change)="onSelectAll($event)"
          class="mr-2 cursor-pointer"
        />
        <label for="select-all" class="cursor-pointer dark:text-white">
          Select All
        </label>
      </div>
    </div>
  `,
})
export class HeaderComponent {
  @Output() selectAll = new EventEmitter<Event>();

  onSelectAll(e: Event) {
    this.selectAll.emit(e);
  }
}
