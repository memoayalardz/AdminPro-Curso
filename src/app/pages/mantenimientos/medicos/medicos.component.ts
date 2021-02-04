import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import {MedicoService} from '../../../services/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit,OnDestroy {
  public cargando :boolean = true;
  public imgSubs:Subscription;
  public medicos : Medico[] = [];
  public medicosTemp : Medico[] = [];
  constructor(private medicoService:MedicoService, private busquedasService : BusquedasService,private modalImagenService : ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img=> this.cargarMedicos());
  }
  ngOnDestroy():void{
    this.imgSubs.unsubscribe();
}
  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
        .subscribe( (medicos:any) => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
      this.cargando = false;
      console.log(this.medicos);
      
    })
  }

  buscar(termino:string){
    if(termino.length === 0){
      return this.medicos = this.medicosTemp;
    }
    this.busquedasService.busqueda('medicos',termino)
    .subscribe(resp  => {
      this.medicos = resp;
      
      
    })
  }
  borrarMedico(medico:Medico){
 
    Swal.fire({
      title: '¿Borrar medico?',
      text: "Esta a punto de borrar a "+medico.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico._id)
        .subscribe(resp => {
          this.cargarMedicos();
          Swal.fire('Médico borrado',`${medico.nombre} fue eliminado correctamente`, 'success');
        }
        )
      }
    })

  }

  
/* 
  async abrirSweetAlert(){
    const {value = ''} = await Swal.fire<string>({
      title:'Crear hospital',
      text:'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder:'Nombre del hospital',
      showCancelButton:true,
    })
    console.log(value);
    if(value.trim().length){
  this.medicoService.crearMedico(value)
      .subscribe( (resp:any) => {
        this.medicos.push(resp.medico);
      })
    }
    
  
  } */
  
  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos',medico._id ,medico.img);
  }


}
