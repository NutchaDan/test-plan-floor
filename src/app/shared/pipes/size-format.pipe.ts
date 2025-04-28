import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeFormat'
})

export class SizeFormatPipe implements PipeTransform {
  transform(value: number | undefined, unit: string = 'sq.ft'): string {
    if (value === undefined || value === null) return 'N/A';
    return `${value.toLocaleString()} ${unit}`;
  }
}
