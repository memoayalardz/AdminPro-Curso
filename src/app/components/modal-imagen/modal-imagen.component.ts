import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import {ModalImagenService} from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  public imageSubir:File;
  public imgTemp :any =null;
  constructor(public modalImagenService : ModalImagenService,public fileUploadService : FileUploadService) { }

  ngOnInit(): void {
  }

cerrarModal(){
  this.imgTemp = null;
  delay(100);
  console.log(this.imgTemp);
  
this.modalImagenService.cerrarModal();
}
cambiarImagen(file:File){
  console.log(file);
  this.imageSubir = file;
  if(!file){return this.imgTemp =null;}
  const reader = new FileReader();
  const url64 = reader.readAsDataURL(file);
  reader.onloadend = () =>{
    this.imgTemp = reader.result;
    console.log(reader.result);
  }
  
}
subirImagen(){
  const id = this.modalImagenService.id;
  const tipo = this.modalImagenService.tipo;
  
  this.fileUploadService
  .actualizarFoto(this.imageSubir,tipo,id)
  .then(img=> {
    /* this.usuario.img = img; */
    Swal.fire('Guardado','Imagen de usuario actualizada','success');
    this.modalImagenService.nuevaImagen.emit(img);
    this.cerrarModal();
  }, (err) =>{
    console.log(err);
    Swal.fire('Error','No se pudo subir la imagen','error');
    
  });
    
  
}
}
