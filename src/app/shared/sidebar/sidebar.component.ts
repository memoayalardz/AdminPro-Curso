import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario:Usuario;
  
  menuItems: any[];

  constructor( private usuarioService:UsuarioService,public sidebarService: SidebarService ) {
  
  
    this.usuario = usuarioService.usuario;

    

  }

  ngOnInit(): void {
  }

}
