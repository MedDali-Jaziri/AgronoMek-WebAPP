import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  IsLogin(){
    return !!sessionStorage.getItem('token');
  }
}
