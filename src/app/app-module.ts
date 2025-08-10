import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';

import { FilmesList } from './pages/filmes-list/filmes-list';
import { FilmesForm } from './pages/filmes-form/filmes-form';

@NgModule({
  declarations: [AppComponent, FilmesList, FilmesForm],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
