import { Pokemon } from '../interfaces/pokemon.interface';
import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Filter result when keyword has a value', () => {
    const pipe = new FilterPipe();

    const mockKeyword = 'pik';

    const mockPokemons: Pokemon[] = [
      {
        id: 1,
        name: 'pikachu',
        image: 'image',
        attack: 20,
        defense: 20,
        hp: 100,
        type: 'electric',
        id_author: 100,
      },
      {
        id: 2,
        name: 'bullbasor',
        image: 'image',
        attack: 20,
        defense: 20,
        hp: 100,
        type: 'electric',
        id_author: 100,
      },
    ];

    const resultExpected = pipe.transform(mockPokemons, mockKeyword);

    expect(resultExpected.length).toBe(1);
  });
});
