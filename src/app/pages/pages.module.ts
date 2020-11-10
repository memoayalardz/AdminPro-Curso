import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './graficas/grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
/* import { AppRoutingModule } from '../app-routing.module'; */
import {RouterModule} from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  exports: [
    
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class PagesModule { }
