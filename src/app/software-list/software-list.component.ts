import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { SProd } from '../models/SProd';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css'],
  providers: [ ConnectingToDatabaseService ]
})
export class SoftwareListComponent implements OnInit {
  color;
  product;
  public SProducts: Array<any> = [];

  constructor(
    private _dbService: ConnectingToDatabaseService,
    private _http: HttpClient,
    private route: ActivatedRoute) { }

  public getSoftData() {
    this._dbService.getSoftData()
      .subscribe(
        (response: any) => {
          this.SProducts = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
  }

  public toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt: string): string => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  ngOnInit() {
    this.getSoftData();
  }

  editSProduct(editSProductInfo) {
    this.model2.name = this.SProducts[editSProductInfo].SoftwareID;
    this.model2.position = this.SProducts[editSProductInfo].Product_Name;
    this.myValue = editSProductInfo;
  }

  changeColorOne() {
     this.color = !this.color;
     if (this.color) {
       return '#ffffff';
     } else {
      return '#f6f6f6';
     }
  }

  model: any = {};
  model2: any = {}; 
  myValue;
  
}

