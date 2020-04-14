import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { HProd } from '../models/HProd';
import { products } from '../products';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css'],
  providers: [ ConnectingToDatabaseService ]
})
export class SoftwareListComponent implements OnInit {
  color;
  product;
  public HProducts: Array<any> = [];

    constructor(private _dbService: ConnectingToDatabaseService) { }

  public getSoftData() {
    this._dbService.getSoftData()
      .subscribe(
        (response: any) => {
          this.HProducts = response.json();
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
  
//   ngOnInit() {
//   this.route.paramMap.subscribe(params => {
//     this.product = products[+params.get('productId')];
//   });
// }
//   constructor(
//     private route: ActivatedRoute,
//   ) { }

    editHProduct(editHProductInfo) {
    this.model2.name = this.HProducts[editHProductInfo].HardwareID;
    this.model2.position = this.HProducts[editHProductInfo].Product_Name;
    this.myValue = editHProductInfo;
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

