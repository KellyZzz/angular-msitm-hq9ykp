import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HardwareListComponent } from './hardware-list/hardware-list.component';
import { SoftwareListComponent } from './software-list/software-list.component';
import { HCrudComponent } from './h-crud/h-crud.component';
import { SCrudComponent } from './s-crud/s-crud.component';
import { HProdDetailComponent } from './h-details/h-details.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ConnectingToDatabaseService } from './services/connecting-to-database.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      // { path: '', component: ProductListComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/0', component: HardwareListComponent },
      { path: 'products/1', component: SoftwareListComponent },
      { path: 'products/2', component: HCrudComponent },
      { path: 'hEdit', component: HCrudComponent },
      { path: 'Edit/0', component: HCrudComponent },
      { path: 'hProd/:id', component: HProdDetailComponent },
      { path: 'Edit/1', component: SCrudComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }

    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    HardwareListComponent,
    SoftwareListComponent,
    HCrudComponent,
    HProdDetailComponent,
    SCrudComponent,
    LoginComponent,
    RegisterComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/