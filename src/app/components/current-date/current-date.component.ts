import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-current-date',
  styleUrls: ['./current-date.component.scss'],
  template: `
    <div class="flex justify-end ">
      <div
        class="bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 p-2 pe-4 select-none"
      >
        <i class="fal fa-calendar mx-2"></i>
        {{ now | date : 'dd/MM/yyyy hh:mm a' }}
      </div>
    </div>
  `,
})
export class CurrentDateComponent implements OnInit, OnDestroy {
  now = new Date();
  private timerSubscription?: Subscription ;

  ngOnInit(): void {
    this.timerSubscription = interval(59_000)
      .pipe(map(() => new Date()))
      .subscribe((date) => (this.now = date));
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe?.();
  }
}
