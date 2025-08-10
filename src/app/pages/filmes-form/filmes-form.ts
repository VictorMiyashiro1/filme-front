import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FilmeService } from '../../services/filme';
import { Filme } from '../../models/filme';

@Component({
  selector: 'app-filmes-form',
  standalone: false,
  templateUrl: './filmes-form.html',
  styleUrl: './filmes-form.scss'
})
export class FilmesForm implements OnInit, OnDestroy {
  tituloPagina = 'Novo filme';
  carregando = false;
  salvando = false;
  id?: number;
  form: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: FilmeService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(120)]],
      genre: ['', [Validators.required, Validators.maxLength(60)]],
      description: ['', [Validators.maxLength(1000)]],
      imageUrl: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? Number(param) : undefined;

    if (this.id) {
      this.tituloPagina = 'Editar filme';
      this.carregando = true;
      this.svc.obter(this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (filme: Filme) => {
            this.form.patchValue(filme);
            this.carregando = false;
          },
          error: () => {
            this.carregando = false;
            alert('Não foi possível carregar o filme.');
            this.router.navigate(['/filmes']);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() { return this.form.controls; }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvando = true;

    const payload = this.form.getRawValue() as Filme;

    if (this.id) {
      const bodyBase = {
        title: this.form.value.title,
        genre: this.form.value.genre,
        description: this.form.value.description,
        imageUrl: this.form.value.imageUrl,
      };
      const payload: Filme = { id: this.id, ...bodyBase } as Filme;
      this.svc.atualizar(this.id, payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.salvando = false;
            this.router.navigate(['/filmes']);
          },
          error: (error: any) => {
            this.salvando = false;
            console.error('Erro ao atualizar filme:', error);
            alert('Ocorreu um erro ao atualizar.');
          }
        });
    } else {
      this.svc.criar(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.salvando = false;
            this.router.navigate(['/filmes']);
          },
          error: (error: any) => {
            this.salvando = false;
            console.error('Erro ao criar filme:', error);
            alert('Ocorreu um erro ao salvar.');
          }
        });
    }
  }

  cancelar(): void {
    this.router.navigate(['/filmes']);
  }

  // helper para exibir erros de campo
  showError(name: keyof typeof this.form.controls): boolean {
    const control = this.form.get(String(name));
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
