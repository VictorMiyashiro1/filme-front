const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'filmes', component: FilmesListComponent },
  { path: 'filmes/novo', component: FilmesFormComponent },
  { path: 'filmes/:id/editar', component: FilmesFormComponent },
  { path: '**', redirectTo: 'filmes' }
];
