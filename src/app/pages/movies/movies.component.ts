import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'server/src/interfaces';

@Component({
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[]

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/movies')
      .toPromise()
      .then(res => this.movies = res as Movie[])
      .catch(err => alert(err.message))
  }

}
