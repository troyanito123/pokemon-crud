import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss'],
})
export class PokemonFormComponent implements OnInit {
  public form!: FormGroup;
  private pokemon?: Pokemon;

  get isEditing() {
    return !!this.pokemon;
  }

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    public uiService: UiService
  ) {}

  ngOnInit(): void {
    this.pokemonService.pokemon$.subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.createForm();
    });
  }

  public hasError(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  public errorMessage(field: string): string {
    const errors = this.form.get(field)?.errors;

    if(!errors) {
      return ''
    }

    if (errors['required']) {
      return 'La url de la imagen es requerido';
    } else if (errors['pattern']) {
      return 'Debe ser una url valida para una imagen';
    }
    return '';
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isEditing) {
      this.update();
      return;
    }
    this.create();
  }

  public cancel() {
    this.pokemonService.newPokemon();
  }

  private create() {
    this.pokemonService.create(this.form.value).subscribe((res) => {
      if (res) {
        this.clean();
      }
    });
  }

  private update() {
    this.pokemonService
      .update(this.pokemon!.id, this.form.value)
      .subscribe((res) => {
        if (res) {
          this.clean();
        }
      });
  }

  private clean() {
    this.form.reset({
      name: '',
      image: '',
      attack: 50,
      defense: 50,
      hp: 100,
      type: 'without type',
      idAuthor: 100,
    });
    this.form.markAsPristine();
  }

  private createForm() {
    this.form = this.fb.group({
      name: [this.pokemon ? this.pokemon.name : '', Validators.required],
      image: [
        this.pokemon ? this.pokemon.image : '',
        [
          Validators.required,
          Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i),
        ],
      ],
      attack: [
        this.pokemon ? this.pokemon.attack : 50,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      defense: [
        this.pokemon ? this.pokemon.defense : 50,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      hp: [
        this.pokemon ? this.pokemon.hp : 100,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      type: [
        this.pokemon ? this.pokemon.type : 'without type',
        Validators.required,
      ],
      idAuthor: [
        this.pokemon ? this.pokemon.id_author : 100,
        Validators.required,
      ],
    });
  }

}
