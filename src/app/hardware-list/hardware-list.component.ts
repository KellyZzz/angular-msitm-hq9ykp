import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { HProd } from '../models/HProd';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.css'],
  providers: [ ConnectingToDatabaseService ]
})

export class HardwareListComponent implements OnInit {
  pager = {};
  product;
  color;
  base64Image: any;
  public HProducts: Array<any> = [];
  
  

  constructor(
    
  private _dbService: ConnectingToDatabaseService,
  private _http: HttpClient,
  private route: ActivatedRoute) { }

  public getData(page?: string) {
    this._dbService.getData(page)
      .subscribe(
        (response: any) => {
          this.HProducts = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
  }

  // public LoadPage(api?: string,page?: string) {
  //     api = `http://localhost:3000/api/HardwareProduct?_p=`
  //     var n_api= api + page;
  //   return this._http.get(n_api);
  // }

  private loadPage(page) {
        // get page of items from api
        this._http.get<any>(`http://localhost:3000/api/HardwareProduct?_p=${page}`).subscribe(
        (response: any) => {
          this.HProducts = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
    }

  ngOnInit() {
    this.getData();
    // this.route.queryParams.subscribe(response => this.loadPage('1'));

    //  leave it here for rn, let's try in detail first since you already set up by each specific products in detail page.
    let imageUrl = 'https://images.pexels.com/photos/1713953/pexels-photo-1713953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      console.log(base64data);
      this.base64Image = 'data:image/jpg;base64,' + base64data;
    });

  }

  changeColorOne() {
     this.color = !this.color;
     if (this.color) {
       return '#ffffff';
     } else {
      return '#f6f6f6';
     }
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  model: any = {};
  model2: any = {}; 
  myValue;
  

}

