import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, pluck, switchMap } from 'rxjs/operators';
import { iif } from 'rxjs';
import { User } from 'server/src/interfaces/user.interface';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss']
})
export class MyMoviesComponent implements OnInit {
  movies: string[]

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.user.pipe(
      pluck('movies')
    ).subscribe(movies => this.movies = movies)
  }

}
