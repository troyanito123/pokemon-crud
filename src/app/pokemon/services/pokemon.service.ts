import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonModify } from '../interfaces/pokemon.interface';

@Injectable()
export class PokemonService {
  private idAuthor = 100;
  private apiUrl = environment.apiUrl;
  private params = new HttpParams().set('idAuthor', this.idAuthor);

  private _pokemons: Pokemon[] = [];
  private _pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  private _pokemon$ = new BehaviorSubject<Pokemon | undefined>(undefined);

  get pokemons$() {
    return this._pokemons$.asObservable();
  }

  get pokemon$() {
    return this._pokemon$.asObservable();
  }

  constructor(private http: HttpClient) {}

  getAll() {
    this.http
      .get<Pokemon[]>(this.apiUrl, { params: this.params })
      .subscribe((res) => {
        this._pokemons = res;
        this._pokemons$.next(this._pokemons);
      });
  }

  getOne(id: number) {
    this.http.get<Pokemon>(`${this.apiUrl}/${id}`).subscribe((res) => {
      this._pokemon$.next(res);
    });
  }

  create(pokemon: PokemonModify) {
    return this.http
      .post<Pokemon>(this.apiUrl, { ...pokemon }, { params: this.params })
      .pipe(
        tap((res) => {
          this._pokemons.push(res);
          this._pokemons$.next([...this._pokemons]);
        }),
        map((res) => true)
      );
  }

  update(id: number, pokemon: PokemonModify) {
    return this.http.put<Pokemon>(`${this.apiUrl}/${id}`, { ...pokemon }).pipe(
      tap((res) => {
        this._pokemons = this._pokemons.map((p) => (p.id == id ? res : p));
        this._pokemons$.next(this._pokemons);
        this._pokemon$.next(undefined);
      }),
      map((res) => true)
    );
  }

  delete(id: number) {
    this.http
      .delete<{ success: boolean }>(`${this.apiUrl}/${id}`)
      .subscribe((res) => {
        this._pokemons = this._pokemons.filter((p) => p.id != id);
        this._pokemons$.next(this._pokemons);
      });
  }

  newPokemon() {
    this._pokemon$.next(undefined);
  }
}
