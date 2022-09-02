import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Observable, Observer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-greenhouse',
  templateUrl: './add-greenhouse.component.html',
  styleUrls: ['./add-greenhouse.component.css']
})
export class addGreenHouseComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listOfAllProcessBinding: any;
  visible1: boolean = false;
  QRCodeImage: any;
  base64Image: any;
  nameGreenHouseResponse: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    // this.http.get('http://37.59.204.222:85/api/process/listOfPindingProcess/',).subscribe(res => {
    //   this.listOfAllProcessBinding = res;
    //   console.log(res)
    // })
    this.form = fb.group({
      lop: new FormControl('',Validators.required),
      latitude: new FormControl('',Validators.required),
      longitude: new FormControl('',Validators.required),
      pvcMeter: new FormControl('',Validators.required),
      coudePVC : new FormControl('',Validators.required),
      pompeEau: new FormControl('',Validators.required),
      capteurLuminosite: new FormControl('',Validators.required),
      capteurTemperature: new FormControl('',Validators.required),
      capteurNiveauEau: new FormControl('',Validators.required),
      carteTechnologique: new FormControl('',Validators.required),
      cableLaision: new FormControl('',Validators.required),
      camera: new FormControl('',Validators.required),
      supportMetallique: new FormControl('',Validators.required),
      collierMetallique: new FormControl('',Validators.required),
      vanneSPH: new FormControl('',Validators.required),
      emboutFiletePVC: new FormControl('',Validators.required),
      ventilateur: new FormControl('',Validators.required),
    })
  }

  get exformFunction() { return this.form.controls; }

  ngOnInit(): void {
    var token = sessionStorage.getItem('token')
    console.log(token)
    const queryObj ={
      token: token
    }
    this.http.post('http://37.59.204.222:85/api/process/listOfPindingProcessOfEachTechn/',queryObj).subscribe(res => {
      this.listOfAllProcessBinding = res;
      console.log(res)
    })
  }

  clicksub(){
    let key, val;
    let key2, val2;
    console.log("This is ")
    console.log(this.form.value)
    var dataSend = this.form.value
    var lop = dataSend.lop
    this.nameGreenHouseResponse = dataSend.lop

    var latitude = dataSend.latitude
    var longitude = dataSend.longitude
    var pvcMeter = dataSend.pvcMeter
    var coudePVC = dataSend.coudePVC
    var pompeEau = dataSend.pompeEau
    var capteurLuminosite = dataSend.capteurLuminosite
    var capteurTemperature = dataSend.capteurTemperature
    var capteurNiveauEau = dataSend.capteurNiveauEau
    var carteTechnologique = dataSend.carteTechnologique
    var cableLaision = dataSend.cableLaision
    var camera = dataSend.camera
    var supportMetallique = dataSend.supportMetallique
    var collierMetallique = dataSend.collierMetallique
    var vanneSPH = dataSend.vanneSPH
    var emboutFiletePVC = dataSend.emboutFiletePVC
    var ventilateur = dataSend.ventilateur
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Check the input data',
      })
    }
    const queryObj ={
      lop,
      latitude,
      longitude,
      pvcMeter,
      coudePVC,
      pompeEau,
      capteurLuminosite,
      capteurTemperature,
      capteurNiveauEau,
      carteTechnologique,
      cableLaision,
      camera,
      supportMetallique,
      collierMetallique,
      vanneSPH,
      emboutFiletePVC,
      ventilateur
    }
    this.http.post('http://37.59.204.222:85/api/process/createAnNewGreenHouse/', queryObj,).subscribe(res => {
      for ([key, val] of Object.entries(res)) {
        console.log(val);
        if (key == "messageSuccess") {
          console.log(val)
          this.form.reset();
          this.http.post('http://37.59.204.222:80/QRCodeGenerator', queryObj,).subscribe(res => {
            for ([key, val] of Object.entries(res)) {
              if (key == "message") {
                console.log(val)
                this.visible1 = !this.visible1
                this.QRCodeImage = val
              }
            }
          })
          // this.ngOnInit()
          
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
  DownloadButton() { ;
    this.getBase64ImageFromURL(this.QRCodeImage).subscribe((res: string) => {
      // console.log(res);
      this.base64Image = "data:image/jpg;base64," + res;
      // save image to disk
      var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", this.nameGreenHouseResponse+".png");
      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d")!; // <--
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
}
