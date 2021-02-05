import { Injectable, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RegisterForm} from '../interfaces/register-form.interface';
import {CargarUsuario} from '../interfaces/cargar-usuarios.interface';
import {LoginForm} from '../interfaces/login-form.interface';
import {catchError, map, tap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {Usuario} from '../models/usuario.model';
const base_url = environment.base_url;
declare const gapi :any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;
  public usuario:Usuario;

  constructor(private http:HttpClient,private router:Router,private ngZone:NgZone) { 
    this.googleInit();
  }

  crearUsuario(formData:RegisterForm){
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap((resp: any)=>{
        this.guardarLocalStorage(resp.token,resp.menu);
        
        })
    );
      
      
  }

  actualizarPerfil(data:{email:string,nombre:string,role:string}){
    data = {
      ...data,
      role:this.usuario.role
    };
   return this.http.put(`${base_url}/usuarios/${this.uid}`,data,this.headers);
  }

  guardarUsuario(usuario:Usuario){
   
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`,usuario,this.headers);
   }

loginUsuario(formData:LoginForm){
    return this.http.post(`${base_url}/login`,formData)
    .pipe(
      tap((resp: any)=>{
        this.guardarLocalStorage(resp.token,resp.menu);
        
        })
    );
      
      
  }

  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`,{token})
    .pipe(
      tap((resp: any)=>{
        this.guardarLocalStorage(resp.token,resp.menu);
        })
    );
      
      
  }

validarToken():Observable<boolean>{

  return this.http.get(`${base_url}/login/renew`,{
    headers:{
      'x-token':this.token
    }
  }).pipe(
    map((resp: any)=>{
      const{email,role,google,nombre,img,uid} = resp.usuario;
      this.usuario = new Usuario(nombre,email, '',img,google,role,uid);
      this.usuario.imprimirUsuario();
      this.guardarLocalStorage(resp.token,resp.menu);
      return true;
      }),
      catchError(error => of(false))
  );
}

logout(){
  // TODO: borrar menu
  localStorage.removeItem('ap__token');
  localStorage.removeItem('ap__menu');
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

cargarUsuarios(desde:number = 0){
const url = `${base_url}/usuarios?desde=${desde}`;
  return this.http.get<CargarUsuario>(url, this.headers)
  .pipe(
      map(resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
          );
          return {total:resp.total,
            usuarios};
      }))

}

eliminarUsuario(usuario : Usuario){
  const url = `${base_url}/usuarios/${usuario.uid}`;
  return this.http.delete(url, this.headers);

}

get token():string{
  return localStorage.getItem('ap__token') || '';
}
get uid():string {
  return this.usuario.uid || '';
}
get headers(){
  return {
    headers:{
      'x-token':this.token
    }
  }
}

get role():'ADMIN_ROLE'  |'USER_ROLE'{
  return this.usuario.role;
}

guardarLocalStorage(token:string,menu:any){
localStorage.setItem('ap__token', token);
localStorage.setItem('ap__menu', JSON.stringify(menu));
}

}
