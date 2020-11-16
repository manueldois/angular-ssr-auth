import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'server/src/interfaces';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[]

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const authorizationHeader = {authorization: `Bearer ${this.authService.accessToken.value}`}

    this.http.get('http://localhost:3000/api/movies', {headers: authorizationHeader})
      .toPromise()
      .then(res => this.movies = res as Movie[])
      .catch(err => alert(err.message))
  }

}
