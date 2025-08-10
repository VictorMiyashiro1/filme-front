import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { HttpClientModule } from '@angular/common/http';
import { FilmesList } from './pages/filmes-list/filmes-list';
import { FilmesForm } from './pages/filmes-form/filmes-form';

@NgModule({
  declarations: [
    App,
    FilmesList,
    FilmesForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
