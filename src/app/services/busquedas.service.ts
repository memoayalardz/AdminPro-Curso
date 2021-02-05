import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError, map, switchAll, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/usuario.model';
import { Medico } from '../models/medico.model';
import { Hospital } from '../models/hospital.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http:HttpClient) { }



busqueda(
  tipo:'usuarios'|'medicos'|'hospitales',
  termino:string
  ){
  
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map( (resp:any) => {
                switch(tipo){
                  case'usuarios':

                  return this.transformarUsuarios(resp.resultados)
                  break;

                  case'hospitales':

                  return resp.resultados;
                  break;
                  case'medicos':

                  return resp.resultados;
                  break;

                  default:
                    return [];
                }

              })
            );

}

busquedaGlobal(
  termino:string
  ){
  
    const url = `${base_url}/todo/${termino}`;

    return this.http.get<any[]>(url, this.headers);

}

private transformarUsuarios(resultados:any[]):Usuario[]{
    return resultados.map(
      user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
          
    );
}

private transformarMedicos(resultados:any[]):Medico[]{
  return resultados;
}

private transformarHospitales(resultados:any[]):Hospital[]{
  return resultados;
}




  
  get token():string{
    return localStorage.getItem('ap__token') || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.token
      }
    }
  }


}
