import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria',
  standalone: true,
})
export class CategoriaPipe implements PipeTransform {
  transform(value: string): string {
    return value === 'l' ? 'Local' : 'Extranjero';
  }
}
