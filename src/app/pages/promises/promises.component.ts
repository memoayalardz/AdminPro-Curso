import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

this.getUsuarios().then(usuarios =>{
  console.log(usuarios);
});
/*     const promesa = new Promise( (resolve,reject) => {
      if(false){
        resolve("Hola mundo");

      }else{
        reject('Algo salio mal');
      }
    })


    promesa.then((mensaje) => {
      console.log(mensaje);
    }).catch( error => console.log('Error en mi promsea ', error));

    console.log("fin"); */

  }
      getUsuarios(){
        return new Promise (resolve => {
          fetch('https://reqres.in/api/users?page=2')
          .then(resp => resp.json())
          .then(body => resolve(body.data));
        })
        
      }

}
