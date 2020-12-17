import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RegisterForm} from '../interfaces/register-form.interface';
import {LoginForm} from '../interfaces/login-form.interface';
import {catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
const base_url = environment.base_url;
declare const gapi :any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;

  constructor(private http:HttpClient,private router:Router,private ngZone:NgZone) { 
    this.googleInit();
  }

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap((resp: any)=>{
        localStorage.setItem('ap__token',resp.token);
        
        })
    );
      
      
  }

loginUsuario(formData:LoginForm){
    return this.http.post(`${base_url}/login`,formData)
    .pipe(
      tap((resp: any)=>{
        localStorage.setItem('ap__token',resp.token);
        
        })
    );
      
      
  }

  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap((resp: any)=>{
        localStorage.setItem('ap__token',resp.token);
        
        })
    );
      
      
  }

validarToken():Observable<boolean>{
  const token = localStorage.getItem('ap__token') || '';
  return this.http.get(`${base_url}/login/renew`,{
    headers:{
      'x-token':token
    }
  }).pipe(
    tap((resp: any)=>{
      localStorage.setItem('ap__token',resp.token);
      
      }),
      map(resp=>true),
      catchError(error => of(false))
  );
}

logout(){
  localStorage.removeItem('ap__token');
  this.auth2.signOut().then( () => {
    this.ngZone.run(()=>{

      this.router.navigateByUrl('/login');
    });
  });
}

googleInit(){
  return new Promise(resolve =>{
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '51222634835-r58t7djvuifbmsk5q522sr794tvm5gco.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      resolve();
    });
    
  })

}





  
}
