import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: any;
  jobUser: any;
  imageUser: any;
  constructor(@Inject(DOCUMENT) private document: Document,private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllInformation();
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
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
      }
    })
  }
}
