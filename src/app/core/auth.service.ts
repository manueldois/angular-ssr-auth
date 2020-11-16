import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/server/interfaces';
import { Creds, JWT } from '../interfaces/auth';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(undefined)
  accessToken = new BehaviorSubject<JWT>(undefined)

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (localStorage) {
      this.readAccessTokenFromLocalStorageAndFetchUser()
    }
  }

  readAccessTokenFromLocalStorageAndFetchUser() {
    if (localStorage) {
      const accessToken = localStorage.getItem('jwt')
      const username = localStorage.getItem('username')

      if (accessToken && username) {
        this.accessToken.next(accessToken)
        this.fetchUser(username)
      }
    }
  }

  clearAccessTokenFromLocalStorage() {
    if (localStorage) {
      localStorage.removeItem('jwt')
      localStorage.removeItem('username')
    }
  }

  putAccessTokenInLocalStorage(username: string, accessToken: JWT) {
    if (localStorage) {
      localStorage.setItem('username', username)
      localStorage.setItem('jwt', accessToken)
    }
  }

  fetchUser(username: string) {
    this.http.get(environment.apiUrl + '/users/' + username)
      .toPromise()
      .then(res => {
        this.user.next(res as User)
      })
  }

  logIn(creds: Creds) {
    return this.http.post(environment.apiUrl + '/login', creds)
      .toPromise()
      .then(res => {
        const accessToken = res['accessToken']
        const user = res['user'] as User

        if (!accessToken) throw 'No Access Token'

        this.user.next(user)
        this.accessToken.next(accessToken)

        // Save accessToken to localStorage if present
        if (localStorage) {
          this.putAccessTokenInLocalStorage(creds.username, accessToken)
        }
      })
  }

  logOut() {
    this.user.next(undefined)
    this.accessToken.next(undefined)

    this.clearAccessTokenFromLocalStorage()

    this.router.navigate(['/home'])
  }
}
