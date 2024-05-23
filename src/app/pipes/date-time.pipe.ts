import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'dateTime',
})
export class DateTimePipe implements PipeTransform {
  transform(value: Date): string {
    return dayjs(value).format('DD/MM/YYYY hh:mm A');
  }
}
