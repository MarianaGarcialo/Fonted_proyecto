import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { User } from './models/user';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { LoginService } from './services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title: string = "frontend"
 user: User | null = null;

  constructor(private router: Router,
    private loginServices: LoginService
  ) {

  }

  ngOnInit(): void {
    this.logged()
  }
cerrarSesion() {
  localStorage.removeItem("user");
  this.user = null;
  window.location.reload(); // O usa router.navigate para redirigir a inicio
}

  logged(){
let local = JSON.parse(localStorage.getItem("user") || "null")
if (local){
  this.user = local
}else{

}
  }

  enrutador(enlace: string) {
    this.router.navigate([enlace])
  }


  abrirModal() {
    const modal = document.getElementById("modal")
    if (modal) {
      modal.style.display = "flex"
    }
  }
  cerrarModal() {
    const modal = document.getElementById("modal")
    if (modal) {
      modal.style.display = "none"
    }
  }
  formlogin = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  iniciarSesion() {
    const formValues = this.formlogin.value

    let user: User = {
      email: formValues.email || "",
      password: formValues.password || ""
    }
    this.loginServices.login(user).subscribe(res => {
      if (res) {
        console.log(res)
        this.user = user
        localStorage.setItem("user", JSON.stringify(user));
        Swal.fire({
          title: '¡Operación exitosa!',
          text: 'La acción se completó correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
window.location.reload()
      }
    }, err => {
      console.log(err)
       Swal.fire({
        title: '¡Ha ocurrido un error!',
        text: 'la acción no se completo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    })

  }

}

