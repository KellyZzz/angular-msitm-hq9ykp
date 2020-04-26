import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  searchText;
  pager = 0;
  product;
  records: Array<any>;
  isDesc: boolean = false;
  column: string = 'Product_Name';
  color;
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


  ngOnInit() {
    this.getData();

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

