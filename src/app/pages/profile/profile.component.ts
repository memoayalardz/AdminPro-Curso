import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import {FileUploadService} from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

public perfilForm:FormGroup;
public usuario: Usuario;
public imageSubir:File;
public imgTemp :any =null;

constructor(private fb:FormBuilder,private usuarioService:UsuarioService,private fileUploadService:FileUploadService) { 
this.usuario = usuarioService.usuario;
    
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre,  Validators.required],
     email: [this.usuario.email, [ Validators.required, Validators.email ]]
     });
  }
  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp =>{
      console.log(resp);
      const {nombre, email} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire('Guardado','Cambios efectuados correctamente','success');
    }, (err) =>{
      console.log(err.error.msg);
      Swal.fire('Error',err.error.msg,'error');
      
    });
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
      this.fileUploadService
      .actualizarFoto(this.imageSubir,'usuarios',this.usuario.uid)
      .then(img=> {
        this.usuario.img = img;
        Swal.fire('Guardado','Imagen de usuario actualizada','success');
      }, (err) =>{
        console.log(err);
        Swal.fire('Error','No se pudo subir la imagen','error');
        
      });
        
      
  }

}
