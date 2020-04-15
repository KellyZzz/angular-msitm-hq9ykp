import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HProd } from '../models/HProd';
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-h-details',
  templateUrl: './h-details.component.html',
  styleUrls: [ './h-details.component.css' ],
  providers: [ ConnectingToDatabaseService ]
})

export class HProdDetailComponent implements OnInit {
  public HProducts: Array<any> = [];
  private sub: any;
  id: number;
  base64Image: any;

  constructor(
    private route: ActivatedRoute,
    private hProdService: ConnectingToDatabaseService,
    private location: Location
    
  ) {}

  public getHProd(id?: string) {
    this.hProdService.getHProd(id)
      .subscribe(
          (response: any) => {
            this.HProducts = response.json();
          },
          (error: Error) => {
            throw error;
          }
        );
  }

  ngOnInit() {
   this.getHProd(this.route.snapshot.params.id);

  //main issue is target the correct imageUrl here
   let imageUrl = this.HProducts[this.id]['Image_URL']
   
   this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      console.log(base64data);
      this.base64Image = 'data:image/jpg;base64,' + base64data;
    });
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

}