import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-layouts',
  templateUrl: './forms-layouts.component.html',
  styleUrls: ['./forms-layouts.component.css']
})
export class FormsLayoutsComponent implements OnInit {
  image: File | undefined;
  fileInputLabel: string | undefined;

  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private http: HttpClient) { 
    this.form = fb.group({
      username: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
    })
  }

  get exformFunction() { return this.form.controls; }

  ngOnInit(): void {
  }

  clicksub() {
    let key, val;
    console.log("Test Button");
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Check the input data',
      })
    }
    var dataSend = this.form.value;
    console.log(dataSend);
    console.log(this.image);

    var userName = dataSend.username;
    var email = dataSend.email;
    var password = dataSend.password;
    var country = dataSend.country;
    var connectedToGreenHouse = false;
    var role = "Client";
    const queryObj = {
      userName,
      email,
      password,
      country,
      connectedToGreenHouse,
      role
    }
    this.http.post('http://37.59.204.222:85/api/user/addTechnOrClientUsAdmin/', queryObj,).subscribe(res => {
      for ([key, val] of Object.entries(res)) {
        console.log(val);
        if(val == true){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Add a new Client',
            showConfirmButton: false,
            timer: 1000
          })
          this.form.reset();
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You have this account',
          })
        }
      }
    })
  }
}

