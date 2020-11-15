import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalLoginComponent } from './modals/login/login.component';
import { ModalHostComponent } from './modals/host/host.component';
import { ModalDirective } from './modals/modal.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MyMoviesComponent } from './pages/my-movies/my-movies.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ModalLoginComponent,
    ModalHostComponent,
    ModalDirective,
    MyMoviesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
