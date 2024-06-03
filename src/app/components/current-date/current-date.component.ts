import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-current-date',
  styleUrls: ['./current-date.component.scss'],
  templateUrl: './current-date.component.html',
})
export class CurrentDateComponent implements OnInit, OnDestroy {
  now = new Date();
  private timerSubscription?: Subscription;

  ngOnInit(): void {
    this.timerSubscription = interval(59_000)
      .pipe(map(() => new Date()))
      .subscribe((date) => (this.now = date));
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe?.();
  }
}
