import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesForm } from './filmes-form';

describe('FilmesForm', () => {
  let component: FilmesForm;
  let fixture: ComponentFixture<FilmesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
