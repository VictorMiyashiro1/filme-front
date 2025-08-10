import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmesList } from './filmes-list';

describe('FilmesList', () => {
  let component: FilmesList;
  let fixture: ComponentFixture<FilmesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
