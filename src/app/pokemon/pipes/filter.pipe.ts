import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(pokemons: Pokemon[], keyword: string): Pokemon[] {
    const filter = pokemons.filter(
      (pokemon) =>
        pokemon.name
          .toLocaleLowerCase()
          .trim()
          .indexOf(keyword.toLocaleLowerCase().trim()) > -1
    );
    return filter;
  }
}
