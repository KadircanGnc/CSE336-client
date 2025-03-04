import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTimestamp',
  standalone: true
})
export class UnixTimestampPipe implements PipeTransform {
  transform(value: number | string | null | undefined, format: string = 'medium'): string {
    if (value === null || value === undefined) return '';
    
    // Convert to number if it's a string
    const timestamp = typeof value === 'string' ? parseInt(value, 10) : value;
    
    // Check if it's a valid number
    if (isNaN(timestamp)) return '';
    
    // Convert to date object
    // If timestamp is in seconds (Unix standard), multiply by 1000
    // If already in milliseconds, use as is
    const isInSeconds = timestamp < 10000000000;
    const date = new Date(isInSeconds ? timestamp * 1000 : timestamp);
    
    return date.toLocaleString();
  }
}