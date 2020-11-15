import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'server/src/interfaces/user.interface';

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
    this.http.get('http://localhost:3000/api/users')
      .toPromise()
      .then(res => this.allUsers = res as User[])
      .catch(err => this.err = "Couldn't fetch list of users on http://localhost:3000/api/users. Is the server running?")
  }

}
