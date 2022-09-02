import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  userName: any;
  jobUser: any;
  imageUser: any;
  countryUser: any;
  emailUser: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllInformation();
  }

  getAllInformation(){
    let key,val;
    console.log('Header Component');
    console.log(sessionStorage.getItem("token"));

    const dataSend = {
      token: sessionStorage.getItem("token")
    }
    this.http.post('http://37.59.204.222:85/api/user/getInfoWithToken/', dataSend).subscribe(res => {
      for ([key, val] of Object.entries(res)) {
        console.log(val);
        this.userName = val['userName']
        this.jobUser = val['role']
        this.imageUser = val['image']
        this.countryUser = val['country']
        this.emailUser = val['email']
      }
    })
  }

}
