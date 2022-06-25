import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Pokemon, PokemonModify } from '../interfaces/pokemon.interface';

import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let pokemonService: PokemonService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    pokemonService = new PokemonService(httpClientSpy);
  });

  it('should be created', () => {
    expect(pokemonService).toBeTruthy();
  });

  it('Get all pokemons and set pokemos to observable pokemons$', (done: DoneFn) => {
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
    ];

    httpClientSpy.get.and.returnValue(of(mockPokemons));

    pokemonService.getAll();

    pokemonService.pokemons$.subscribe((res) => {
      expect(res[0].id).toBe(mockPokemons[0].id);
      done();
    });
  });

  it('Get one pokemon and set result to observable pokemon$', (done: DoneFn) => {
    const mockPokemon: Pokemon = {
      id: 5,
      name: 'pikachu',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      id_author: 100,
    };

    const mockId = 5;

    httpClientSpy.get.and.returnValue(of(mockPokemon));

    pokemonService.getOne(mockId);

    pokemonService.pokemon$.subscribe((res) => {
      expect(res?.id).toBe(mockId);
      done();
    });
  });

  it('Create one pokemon and push result to observable pokemons$', (done: DoneFn) => {
    const mockCreatePokemon: PokemonModify = {
      name: 'pikachu 2',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      idAuthor: 100,
    };

    const mockObserbalePokemonsResult: Pokemon[] = [
      {
        id: 6,
        name: 'pikachu 2',
        image: 'image',
        attack: 20,
        defense: 20,
        hp: 100,
        type: 'electric',
        id_author: 100,
      },
    ];

    const mockCreateResult: Pokemon = {
      id: 6,
      name: 'pikachu 2',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      id_author: 100,
    };

    httpClientSpy.post.and.returnValue(of(mockCreateResult));

    pokemonService.create(mockCreatePokemon).subscribe();

    pokemonService.pokemons$.subscribe((res) => {
      expect(res.length).toBe(mockObserbalePokemonsResult.length);
      done();
    });
  });

  it('Update one pokemon and update observable pokemons$', (done: DoneFn) => {
    const mockCreate: PokemonModify = {
      name: 'pikachu',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      idAuthor: 100,
    };

    const mockCreateResult: Pokemon = {
      id: 5,
      name: 'pikachu',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      id_author: 100,
    };

    const mockIdPokemon = 5;

    const mockUpdate: PokemonModify = {
      name: 'pikachu updated',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      idAuthor: 100,
    };

    const mockUpdateResult: Pokemon = {
      id: 5,
      name: 'pikachu updated',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      id_author: 100,
    };

    const mockObserbalePokemonsResult: Pokemon[] = [
      {
        id: 5,
        name: 'pikachu updated',
        image: 'image',
        attack: 20,
        defense: 20,
        hp: 100,
        type: 'electric',
        id_author: 100,
      },
    ];

    httpClientSpy.post.and.returnValue(of(mockCreateResult));

    pokemonService.create(mockCreate).subscribe();

    httpClientSpy.put.and.returnValue(of(mockUpdateResult));

    pokemonService.update(mockIdPokemon, mockUpdate).subscribe();

    pokemonService.pokemons$.subscribe((r) => {
      expect(r[0].name).toBe(mockUpdate.name);
      done();
    });
  });

  it('Delete one pokemon and update observable pokemons$', (done: DoneFn) => {
    const mockCreate: PokemonModify = {
      name: 'pikachu',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      idAuthor: 100,
    };

    const mockCreateResult: Pokemon = {
      id: 5,
      name: 'pikachu',
      image: 'image',
      attack: 20,
      defense: 20,
      hp: 100,
      type: 'electric',
      id_author: 100,
    };

    const mockIdPokemon = 5;

    httpClientSpy.post.and.returnValue(of(mockCreateResult));

    pokemonService.create(mockCreate).subscribe();

    httpClientSpy.delete.and.returnValue(of({ success: true }));

    pokemonService.delete(mockIdPokemon);

    pokemonService.pokemons$.subscribe((res) => {
      expect(res.length).toBe(0);
      done();
    });
  });
});
