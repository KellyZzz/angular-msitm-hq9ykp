import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HProd } from '../models/HProd';
import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";

@Component({
  selector: 'app-h-details',
  templateUrl: './h-details.component.html',
  styleUrls: [ './h-details.component.css' ],
  providers: [ ConnectingToDatabaseService ]
})
export class HProdDetailComponent implements OnInit {
  // @Input() hprod: HProd;
  public HProducts: Array<any> = [];
  private sub: any;
  id: number;
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
   
  }
}