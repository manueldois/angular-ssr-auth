import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'server/src/interfaces/user.interface';
import { Creds, JWT } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(undefined)
  accessToken = new BehaviorSubject<JWT>(undefined)

  constructor(
    private http: HttpClient
  ) {
    if(localStorage){
      this.readAccessTokenFromLocalStorageAndFetchUser()
    }

    // this.logIn({ username: 'Ana', password: 'ana123' })
  }

  readAccessTokenFromLocalStorageAndFetchUser(){
    const accessToken = localStorage.getItem('jwt')
    const username = localStorage.getItem('username')

    if(accessToken && username){
      this.accessToken.next(accessToken) 

      // Query the API for the full user
      this.http.get('http://localhost:3000/api/users/'+username)
        .toPromise()
        .then(res => {
          this.user.next(res as User)
        })
    }
  }

  clearAccessTokenFromLocalStorage(){
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
  }

  logIn(creds: Creds) {
    return this.http.post('http://localhost:3000/api/login', creds)
      .toPromise()
      .then(res => {
        const accessToken = res['accessToken']
        const user = res['user'] as User

        if (!accessToken) throw 'No Access Token'

        this.user.next(user)
        this.accessToken.next(accessToken)

        // Save accessToken to localStorage if present
        if(localStorage){
          localStorage.setItem('username', creds.username)
          localStorage.setItem('jwt', accessToken)
        }
      })
  }

  logOut() {
    this.user.next(undefined)
    this.accessToken.next(undefined)

    this.clearAccessTokenFromLocalStorage()
  }
}
