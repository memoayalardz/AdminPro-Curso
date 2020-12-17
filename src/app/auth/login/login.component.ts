import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('ap__email') || '', [ Validators.required, Validators.email ]],
    password: ['', Validators.required],
    remember:[false]
  });

  constructor( private router: Router, private fb:FormBuilder,private usuarioService:UsuarioService, private ngZone:NgZone ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
this.usuarioService.loginUsuario(this.loginForm.value)
.subscribe(resp =>{
  if(this.loginForm.get('remember').value){
      localStorage.setItem('ap__email',this.loginForm.get('email').value);
  }else{
    localStorage.removeItem('ap__email')
  }
  console.log(resp);
        // ir al dashboard
        this.router.navigateByUrl('/');
  
},(err)=>{
  Swal.fire('Error',err.error.msg);
})
    // console.log(this.loginForm.value);
    
    /* this.router.navigateByUrl('/'); */
  }

   onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());    
  }
   onFailure(error) {
    console.log(error);
  }
   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
      this.startApp();
  }
 async startApp() {
  await this.usuarioService.googleInit();
  this.auth2 = this.usuarioService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));
   
  };

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
          this.usuarioService.loginGoogle(id_token).subscribe(resp=>{
            this.ngZone.run(()=>{

              // ir al dashboard
              this.router.navigateByUrl('/');
            });
          });
            
        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });

  }
}
