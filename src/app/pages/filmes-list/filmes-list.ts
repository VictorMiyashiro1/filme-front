import { Component, OnInit } from '@angular/core';
import { Filme } from '../../models/filme';
import { FilmeService } from '../../services/filme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filmes-list',
  standalone: false,
  templateUrl: './filmes-list.html',
  styleUrl: './filmes-list.scss'
})
export class FilmesList {
  filmes: Filme[] = [];
  totalLikes: Filme[] = [];
  totalDislikes: Filme[] = [];
  constructor(private svc: FilmeService, private router: Router) { }
  ngOnInit() {
    this.svc.listar().subscribe(d => {this.filmes = d;});
    this.svc.listarLikes().subscribe(d => {this.totalLikes = d;})
    this.svc.listarDislikes().subscribe(d => {this.totalDislikes = d;})
  }
  editar(id: number) { this.router.navigate(['/filmes', id, 'editar']); }
  cadastrar() { this.router.navigate(['/filmes/novo']); }
  excluir(id: number) {
    this.svc.remover(id).subscribe(() => this.ngOnInit());
  }
  like(title: string, genre: string, description: string, imageUrl: string, like: number, dislikes: number, id?: number) {
    const payload: Filme = {
      id: id,
      title: title,
      genre: genre,
      description: description,
      imageUrl: imageUrl,
      likes: like! + 1,
      dislikes: dislikes,
    };
    this.svc.like(payload).subscribe(() => this.ngOnInit());
  }
  dislike(title: string, genre: string, description: string, imageUrl: string, like: number, dislikes: number, id?: number) {
    const payload: Filme = {
      id: id,
      title: title,
      genre: genre,
      description: description,
      imageUrl: imageUrl,
      likes: like,
      dislikes: dislikes! + 1,
    };
    this.svc.dislike(payload).subscribe(() => this.ngOnInit());
  }
}