import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-4 mt-10">
      <h1 class="text-2xl font-bold text-center flex-grow dark:text-white">
        TODO LIST
      </h1>
      <div class="flex items-center ml-4 cursor-pointer">
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
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() selectAll = new EventEmitter<Event>();

  onSelectAll(e: Event) {
    this.selectAll.emit(e);
  }
}
