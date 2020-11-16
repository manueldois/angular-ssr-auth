import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/server/interfaces';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';

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
    const authorizationHeader = { authorization: `Bearer ${this.authService.accessToken.value}` }

    this.http.get(environment.apiUrl + '/movies', { headers: authorizationHeader })
      .toPromise()
      .then(res => this.movies = res as Movie[])
      .catch(err => alert(err.message))
  }

}
