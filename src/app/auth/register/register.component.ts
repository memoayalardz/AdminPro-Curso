import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ]],
    email: ['luisguillermo.ayala@coahuila.gob.mx', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(3) ]],
    password2: ['1234526', [ Validators.required, Validators.minLength(3) ]],
    terminos:[false,Validators.required]

  }, {
    validators: this.passwordsIguales('password','password2')
  });
  constructor(private fb: FormBuilder) { }

  crearUsuario(){
    console.log(this.registerForm);
    if(this.registerForm.valid){
        console.log("Posteando");
        
    }else{
      console.log("Formuario incorrecto");
      
    }
    console.log(this.registerForm.value);
  }

  campoNoValido(campo:string):boolean{

    console.log(campo + ":" + this.registerForm.get(campo).invalid);
    console.log(campo + ":" + this.formSubmitted);
    
    if(this.registerForm.get(campo).valid && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }
  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas(){
   /*  const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if((pass1 === pass2) && this.formSubmitted){
      return true
    }else{ */
      return false

    /* } */

  }
  passwordsIguales(pass1:string,pass2:string){

    return (formGroup:FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual:true});
      }
    }

  }

}
