import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode, { JwtPayload } from "jwt-decode";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(){
    var roleGenerale;
    var val = sessionStorage.getItem('token')
    const decoded = jwtDecode<JwtPayload>(String(val));
    let key1,val1;
    for ([key1, val1] of Object.entries(decoded)) {
      if(key1=='role'){
        roleGenerale = val1;
        // console.log(val1)
      }
    }
    if(roleGenerale == "Admin"){
      return true
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "You have didn't have the access !!!",
    })
    return false;
  }
  
}
