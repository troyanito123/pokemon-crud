import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonComponent } from './pokemon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PokemonService } from './services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PokemonComponent,
    PokemonListComponent,
    PokemonFormComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [PokemonService],
})
export class PokemonModule {}
