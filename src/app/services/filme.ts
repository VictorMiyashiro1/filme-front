import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments'; 
import { Observable } from 'rxjs';
import { Filme } from '../models/filme';

@Injectable({ providedIn: 'root' })
export class FilmeService {
  private baseUrl = `${environment.apiBaseUrl}/filmes`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Filme[]> { return this.http.get<Filme[]>(this.baseUrl); }
  listarLikes(): Observable<Filme[]> { return this.http.get<Filme[]>(`${this.baseUrl}/total-likes`); }
  listarDislikes(): Observable<Filme[]> { return this.http.get<Filme[]>(`${this.baseUrl}/total-dislikes`); }
  obter(id: number): Observable<Filme> { return this.http.get<Filme>(`${this.baseUrl}/${id}`); }
  criar(data: Filme): Observable<Filme> { return this.http.post<Filme>(this.baseUrl, data); }
  atualizar(id: number, data: Filme): Observable<Filme> { return this.http.put<Filme>(`${this.baseUrl}/${id}`, data); }
  like(data: Filme): Observable<Filme> { return this.http.put<Filme>(`${this.baseUrl}/${data.id}`, data); }
  dislike(data: Filme): Observable<Filme> { return this.http.put<Filme>(`${this.baseUrl}/${data.id}`, data); }
  remover(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/${id}`); }
}
