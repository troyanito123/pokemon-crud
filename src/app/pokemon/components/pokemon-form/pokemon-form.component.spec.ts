import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';

import { PokemonFormComponent } from './pokemon-form.component';

describe('PokemonFormComponent', () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [PokemonService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form field name must be required', () => {
    const name = component.form.controls['name'];
    name.setValue('');

    expect(component.form.invalid).toBeTrue();
  });

  it('Form field image must be required', () => {
    const image = component.form.controls['image'];
    image.setValue('');

    expect(component.form.invalid).toBeTrue();
  });

  it('Form must be valid when name and image is filled', () => {
    const name = component.form.controls['name'];
    name.setValue('Pikachu');
    const image = component.form.controls['image'];
    image.setValue('https://imagenpng.com/wp-content/uploads/2017/02/007Squirtle_Pokem.png');

    expect(component.form.valid).toBeTrue();
  });
});
