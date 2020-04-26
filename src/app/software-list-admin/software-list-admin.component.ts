import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { SProd } from '../models/SProd';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-software-list-admin',
  templateUrl: './software-list-admin.component.html',
  styleUrls: ['./software-list-admin.component.css'],
  providers: [ ConnectingToDatabaseService ]
})
export class SoftwareListAdminComponent implements OnInit {
  searchText;
  pager = 0;
  color;
  product;
  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'Product_Name';
  public SProducts: Array<any> = [];

  constructor(
    private _dbService: ConnectingToDatabaseService,
    private _http: HttpClient,
    private route: ActivatedRoute) { }

  public getSoftData(page?: string) {
    this.SProducts = [];

    this._dbService.getSoftData(page)
      .subscribe(
        (response: any) => {
          this.SProducts = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
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

