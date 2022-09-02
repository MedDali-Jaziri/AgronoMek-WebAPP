import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear()
  }

  getAllTheFiled(username: string, password: string){
    let key, val;
    console.log(username);
    console.log(password);
    var email = username;
    var password = password;
    const queryObj = {
      email,
      password
    }
    this.http.post('http://37.59.204.222:85/api/user/loginTechnAndAdmin/', queryObj).subscribe(res => {
      for ([key, val] of Object.entries(res)) {
        if (key == "token") {
          console.log(val)
          this.router.navigateByUrl('/dashboard', {});
          sessionStorage.setItem('token', val)
          const decoded = jwtDecode<JwtPayload>(val);
          let key1,val1;
          for ([key1, val1] of Object.entries(decoded)) {
            if(key1=='role'){
              console.log(val1)
            }
          }
          // console.log(decoded)
        }
      }
    })
  }
}
