import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getAll();
  }
}
