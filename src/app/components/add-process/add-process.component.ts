import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-process',
  templateUrl: './add-process.component.html',
  styleUrls: ['./add-process.component.css']
})
export class addProcessComponent implements OnInit {
  listOfAllClient: any;
  listOfAllTechnician: any;

  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,private router: Router, private http: HttpClient) {
    this.form = fb.group({
      lot: new FormControl('',Validators.required),
      loc: new FormControl('',Validators.required),
      nameGreenHouse: new FormControl('',Validators.required),
      latitude: new FormControl('',Validators.required),
      longitude: new FormControl('',Validators.required),
      nbPlantes: new FormControl('',Validators.required),
    })

    this.http.get('http://37.59.204.222:85/api/user/getAllClientAddByAdmin/',).subscribe(res => {
      this.listOfAllClient = res;
      console.log(res)
    })
    this.http.get('http://37.59.204.222:85/api/user/getAllTechnician/',).subscribe(res => {
      this.listOfAllTechnician = res;
      console.log(res)
    })
  }
  ngOnInit(): void {
  }
  get exformFunction() { return this.form.controls; }

  clicksub() {
    let key, val;
    console.log("Test Button");
    var dataSend = this.form.value;
    console.log(dataSend);
    // this.http.request('post', 'http://37.59.204.222:85/api/process/addProcess/', { body: dataSend }).subscribe(res => {
    //     for ([key, val] of Object.entries(res)) {
    //       if (key == "message") {
    //         console.log(val)
    //       }
    //     }
    //   })
    this.http.post('http://37.59.204.222:85/api/process/addProcess/', dataSend).subscribe(res => {
      for ([key, val] of Object.entries(res)) {
        if (key == "messageSuccess") {
          console.log(val)
          Swal.fire(
            'Good job!',
            val,
            'success'
          )
          this.form.reset();
          // this.router.navigateByUrl('/dashboard', {});
          // sessionStorage.setItem('token', val)
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Choose another name of greenhouse!',
          })
        }
      }
    })
  }
}
