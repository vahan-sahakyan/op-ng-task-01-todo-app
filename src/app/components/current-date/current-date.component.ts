import { Component } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-current-date',
  template: `
    <!-- Current Date Section -->
    <div class="flex justify-end">
      <div
        class="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-md text-zinc-800 dark:text-zinc-200"
      >
        <i class="fas fa-calendar"></i>
        {{ currentDate }}
      </div>
    </div>
  `,
  styleUrls: ['./current-date.component.scss'],
})
export class CurrentDateComponent {
  currentDate = dayjs().format('DD/MM/YYYY hh:MM A');
}
