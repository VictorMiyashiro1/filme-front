import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmesList } from './pages/filmes-list/filmes-list';
import { FilmesForm } from './pages/filmes-form/filmes-form';

const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'filmes', component: FilmesList },
  { path: 'filmes/novo', component: FilmesForm },
  { path: 'filmes/:id/editar', component: FilmesForm },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }