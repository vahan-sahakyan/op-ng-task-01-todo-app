import { Component, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-current-date',
  styleUrls: ['./current-date.component.scss'],
  template: `
    <!-- Current Date Section -->
    <div class="flex justify-end ">
      <div
        class="bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 p-2 pe-4 select-none"
      >
        <i class="far fa-calendar mx-2"></i>
        {{ now | dateTime }}
      </div>
    </div>
  `,
})
export class CurrentDateComponent implements OnDestroy {
  now = new Date();
  private timerSubscription: Subscription | undefined;

  constructor() {
    this.timerSubscription = interval(59_000)
      .pipe(map(() => new Date()))
      .subscribe((date) => (this.now = date));
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
