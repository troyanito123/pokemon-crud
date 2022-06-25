import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  searchInput = new FormControl('');

  public pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.pokemons$.subscribe(
      (pokemons) => (this.pokemons = pokemons)
    );
  }

  public getOne(id: number) {
    this.pokemonService.getOne(id);
  }

  public delete(id: number) {
    this.pokemonService.delete(id);
  }

  public newPokemon() {
    this.pokemonService.newPokemon();
  }
}
