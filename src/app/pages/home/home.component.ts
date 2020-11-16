import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/server/interfaces';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allUsers: User[]
  err: string

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const usersUrl = environment.apiUrl + '/users'
    this.http.get(usersUrl)
      .toPromise()
      .then(res => this.allUsers = res as User[])
      .catch(err => this.err = "Couldn't fetch list of users on " + usersUrl + ". Is the server running?")
  }

}
