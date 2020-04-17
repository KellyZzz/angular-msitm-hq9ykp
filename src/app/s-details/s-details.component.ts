import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SProd } from '../models/SProd';
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-s-details',
  templateUrl: './s-details.component.html',
  styleUrls: [ './s-details.component.css' ],
  providers: [ ConnectingToDatabaseService ]
})

export class SProdDetailComponent implements OnInit {
  public SProducts: Array<any> = [];
  private sub: any;
  imageForm: FormGroup;
  id: number;
  base64Image: any;
  loading = false;
  submitted = false;
  p:string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sProdService: ConnectingToDatabaseService,
    private location: Location
    
  ) {}

  public getSProd(id?: string) {
    this.sProdService.getSProd(id)
      .subscribe(
          (response: any) => {
            this.SProducts = response.json();
          },
          (error: Error) => {
            throw error;
          }
        );
  }

  public delSProd(id?: string) {
    this.sProdService.delSProd(id)
      .subscribe(
          (response: any) => {
            this.SProducts = response.json();
          },
          (error: Error) => {
            throw error;
          }
        );
  }

  ngOnInit() {
   this.getSProd(this.route.snapshot.params.id);
   this.imageForm = this.formBuilder.group({});
  }

  onSubmit_Image() {

    for (this.p in this.SProducts) {
    //main issue is target the correct imageUrl here
    let imageUrl = this.SProducts[this.p]['Image_URL']
   
    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      console.log(base64data);
      this.base64Image = 'data:image/jpg;base64,' + base64data;
    });

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

}