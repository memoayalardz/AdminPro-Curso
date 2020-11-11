import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';



const routes: Routes = [
//   {path:'register', component:RegisterComponent },
//   {path:'login', component:LoginComponent },
// {path:'dashboard', component:DashboardComponent},
// {path:'progress', component:ProgressComponent },
// {path:'grafica1', component:Grafica1Component },
{path:'', redirectTo: 'dashboard', pathMatch:'full'},
{path:'**', component:NopagefoundComponent }
];

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
