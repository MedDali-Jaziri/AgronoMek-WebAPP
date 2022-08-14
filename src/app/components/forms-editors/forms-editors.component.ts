import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-editors',
  templateUrl: './forms-editors.component.html',
  styleUrls: ['./forms-editors.component.css']
})
export class FormsEditorsComponent implements OnInit {
  listOfAllClient: any;
  constructor(private router: Router, private http: HttpClient) {
    this.http.get('http://37.59.204.222:85/api/user/getAllClientAddByAdmin/',).subscribe(res => {
      this.listOfAllClient = res;
      console.log(res)
    })
  }

  ngOnInit(): void {
  }
  deleteAnClient(id: any, email: any) {
    let key, val;
    console.log(id);
    console.log(email);
    const queryObj = {
      id,
      email
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      this.http.request('delete', 'http://37.59.204.222:85/api/user/deleteAnSpecificUser/', { body: queryObj }).subscribe(res => {
        for ([key, val] of Object.entries(res)) {
          if (key == "message") {
            console.log(val)
            this.http.get('http://37.59.204.222:85/api/user/getAllClientAddByAdmin/',).subscribe(res => {
              this.listOfAllClient = res;
              console.log(res)
            })
          }
        }
      })
    })
  }
}