import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { HProd } from '../models/HProd';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';


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
  public HProducts: Array<any> = [];

  constructor(private _dbService: ConnectingToDatabaseService,
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

