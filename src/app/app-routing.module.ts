import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyMoviesComponent } from './pages/my-movies/my-movies.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'my-movies',
    component: MyMoviesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
