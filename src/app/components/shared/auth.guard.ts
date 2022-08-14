import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){
    
  }

  canActivate() {
    if(this.auth.IsLogin()){
      return true
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You are not connected',
    })
    this.router.navigate(['pages-login']);
    return false;
  }
  
}
