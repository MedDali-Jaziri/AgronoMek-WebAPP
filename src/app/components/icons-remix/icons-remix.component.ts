import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-icons-remix',
  templateUrl: './icons-remix.component.html',
  styleUrls: ['./icons-remix.component.css']
})
export class IconsRemixComponent implements OnInit {
  listOfAllProcessBinding: any;
  base64Image: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var token = sessionStorage.getItem('token')
    console.log(token)
    const queryObj ={
      token: token
    }
    this.http.post('http://37.59.204.222:85/api/process/listOfProcessOfEachTechn/',queryObj).subscribe(res => {
      this.listOfAllProcessBinding = res;
      console.log(res)
    })
  }

  onClick(Id_GreenHouse: any){
    console.log(Id_GreenHouse)
    this.getBase64ImageFromURL("http://localhost:5050/static/"+Id_GreenHouse+".png").subscribe((res: string) => {
      // console.log(res);
      this.base64Image = "data:image/jpg;base64," + res;
      // save image to disk
      var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", Id_GreenHouse+".png");
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
