import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { HospitalService } from "../../../services/hospital.service";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {
  public hospitales : Hospital[] = [];
  public hospitalesTemp : Hospital[] = [];
  public cargando :boolean = true;
  public imgSubs:Subscription;


  constructor(private hospitalService : HospitalService,private modalImagenService : ModalImagenService, private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(img=> this.cargarHospitales());
  }

 ngOnDestroy():void{
      this.imgSubs.unsubscribe();
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
    .subscribe( hospitales => {
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
      this.cargando = false;
      console.log(this.hospitales);
      
    })
  }

  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital(hospital._id,hospital.nombre)
    .subscribe(resp => {
      Swal.fire('Actualizado',hospital.nombre,'success');
    })
  }

  borrarCambios(hospital:Hospital){
    this.hospitalService.borrarHospital(hospital._id)
    .subscribe(resp => {
      this.cargarHospitales();
      Swal.fire('Borrado',hospital.nombre,'success');
    })
  }


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
this.hospitalService.crearHospital(value)
    .subscribe( (resp:any) => {
      this.hospitales.push(resp.hospital);
    })
  }
  

}

abrirModal(hospital:Hospital){
  this.modalImagenService.abrirModal('hospitales',hospital._id,hospital.img);
}

buscar(termino:string){
  if(termino.length === 0){
    return this.hospitales = this.hospitalesTemp;
  }
  this.busquedasService.busqueda('hospitales',termino)
  .subscribe(resp => {
    this.hospitales = resp;
  })
}

}
