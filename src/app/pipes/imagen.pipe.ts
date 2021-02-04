import { Pipe, PipeTransform } from '@angular/core';
import {environment} from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    console.log(img);
    
    if(!img){
      console.log('img1');
      
      return `${base_url}/upload/${tipo}/no-image`;
  }else if( img && img.includes('https')  ){
    console.log('img2');
      return img;
  }else if(img){
    console.log('img3');
      return `${base_url}/upload/${tipo}/${img}`;
  }else{
    console.log('img4');
      return `${base_url}/upload/${tipo}/no-image`;
  }
  }

}
