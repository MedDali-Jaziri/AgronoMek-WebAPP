import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  listOfAllTechnician: any;
  constructor(private router: Router, private http: HttpClient) {
    this.http.get('http://37.59.204.222:85/api/user/getAllTechnician/',).subscribe(res => {
      this.listOfAllTechnician = res;
      console.log(res)
    })
  }

  ngOnInit(): void {
  }
  deleteAnTechnician(id: any, email: any) {
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
            this.http.get('http://37.59.204.222:85/api/user/getAllTechnician/',).subscribe(res => {
              this.listOfAllTechnician = res;
              console.log(res)
            })
          }
        }
      })
    })
  }

  editAnTechnician(id: any, email: any) {

  }
}
