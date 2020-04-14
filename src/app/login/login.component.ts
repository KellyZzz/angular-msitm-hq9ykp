import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectingToDatabaseService } from '../services/connecting-to-database.service';
import { User } from '../models/User';
import { products } from '../products';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService} from "../services/alert.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  providers: [ ConnectingToDatabaseService ]
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  pager = {};
  product;
  color;
  loading = false;
  submitted = false;
  returnUrl: string;

  public Users: Array<any> = [];

  constructor(
  private formBuilder: FormBuilder,
  private _dbService: ConnectingToDatabaseService,
  private _http: HttpClient,
  private alertService: AlertService,
  private router: Router,
  private route: ActivatedRoute) { }

  public getUser(page?: string) {
    this._dbService.getUser()
      .subscribe(
        (response: any) => {
          this.Users = response.json();
        },
        (error: Error) => {
          throw error;
        }
      )
  }

  ngOnInit() {
    this.getUser();
    
    this.loginForm = this.formBuilder.group({
            UserName: ['', Validators.required],
            Password: ['', Validators.required]
        });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // this.loading = true;
        // this.authenticationService.login(this.f.username.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
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

// import { Component, OnInit, Input } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';

// import { User } from '../models/User';
// import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: [ './login.component.css' ],
//   providers: [ ConnectingToDatabaseService ]
// })
// export class LoginComponent implements OnInit {
//   public Users: Array<any> = [];
//   private sub: any;
//   id: number;
//   constructor(
//     private route: ActivatedRoute,
//     private _dbService: ConnectingToDatabaseService,
//     private location: Location
    
//   ) {}

//   public getUser(id?: string) {
//     this._dbService.getUser(id)
//       .subscribe(
//           (response: any) => {
//             this.Users = response.json();
//           },
//           (error: Error) => {
//             throw error;
//           }
//         );
//   }

//   ngOnInit() {
//   //  this.getUser(this.route.snapshot.params.id);
//   }
// }


// import { Component, OnInit } from "@angular/core";
// import { ActivatedRoute, Router } from "@angular/router";
// import { HProd } from '../models/HProd';
// import { ConnectingToDatabaseService } from "../services/connecting-to-database.service";
// import { AlertService } from "../services/alert.service";
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';

// @Component({
//   selector: "app-login",
//   templateUrl: "./login.component.html",
//   providers: [ ConnectingToDatabaseService, AlertService ]
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   loading = false;
//   submitted = false;
//   color;

//   constructor(
//   private _dbService: ConnectingToDatabaseService,
//   private formBuilder: FormBuilder,
//   private route: ActivatedRoute,
//   private router: Router,
//   private alertService: AlertService) {}

//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//             UserName: ['', Validators.required],
//             Password: ['', Validators.required],
//         });
//   }
//   get f() { return this.loginForm.controls; }

//   onSubmit() {
//     this.submitted = true;
//     this.alertService.clear();

//     this.loading = true;

//     this._dbService.getUserData('http://localhost:3000/api/Users')
//     .pipe(first())
//       .subscribe(
//           data => {
//               this.alertService.success('Login successful', true);
//               this.router.navigate(['/'])
              
//           },
//           error => {
//               this.alertService.error(error);
//               this.loading = false;
//               this.router.navigate([''])
//           });
//   }

//   changeColorOne() {
//     this.color = !this.color;
//     if (this.color) {
//       return "#ffffff";
//     } else {
//       return "#f6f6f6";
//     }
//   }
// }