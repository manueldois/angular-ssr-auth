import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Creds, JWT } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username = new BehaviorSubject(undefined)
  accessToken = new BehaviorSubject<JWT>(undefined)

  constructor(
    private http: HttpClient
  ) {
    if(localStorage){
      this.readAccessTokenFromLocalStorage()
    }

    this.logIn({ username: 'Ana', password: 'ana123' })
  }

  readAccessTokenFromLocalStorage(){
    const accessToken = localStorage.getItem('jwt')
    const username = localStorage.getItem('username')

    if(accessToken && username){
      this.username.next(username)
      this.accessToken.next(accessToken)
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

        if (!accessToken) throw 'No Access Token'

        this.username.next(creds.username)
        this.accessToken.next(accessToken)

        // Save accessToken to localStorage if present
        if(localStorage){
          localStorage.setItem('username', creds.username)
          localStorage.setItem('jwt', accessToken)
        }
      })
  }

  logOut() {
    this.username.next(undefined)
    this.accessToken.next(undefined)

    this.clearAccessTokenFromLocalStorage()
  }
}
