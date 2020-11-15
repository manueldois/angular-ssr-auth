import { Injectable } from '@angular/core';
import { Creds, JWT } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string
  jwt: JWT

  constructor() { }

  login(creds: Creds){
  
  }

  logout(){

  }
}
