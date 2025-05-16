import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { Publicacion } from '../../models/publicacion';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../../services/publicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-publicacion',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './crear-publicacion.component.html',
  styleUrl: './crear-publicacion.component.css'
})
export class CrearPublicacionComponent {
  imagenPreview: string | null = null;
  imagenSeleccionada: File | null = null;
  contador:number=0
  publicacion:Publicacion=new Publicacion()

constructor(private publiService:PublicacionService){

}



  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  
    if (file && file.type.startsWith('image/')) {
      this.imagenSeleccionada = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagenPreview = null;
      this.imagenSeleccionada = null;
    }
  }
  aniadirenlace(){
    const input=document.createElement("input")
    input.type="text"
    input.id=`enlace${this.contador}`
    input.placeholder=`enlace #${this.contador}`
    
    const contenedor= document.getElementById("contenedor-inputs")
    if(contenedor){
      contenedor.appendChild(input)
    }
this.contador++
  }
  formPublicacion =new FormGroup({
    title: new FormControl('',Validators.required),
     descripcion: new FormControl('',Validators.required),
     
  })
postPublicacion() {
  const fileInput = document.getElementById("imagen") as HTMLInputElement | null;
  const formValues = this.formPublicacion.value;
  let user= JSON.parse(localStorage.getItem("user") || "null")
  const enlaces: string[] = [];
  for (let i = 0; i < this.contador; i++) {
    const enlaceInput = document.getElementById(`enlace${i}`) as HTMLInputElement | null;
    if (enlaceInput) {
      enlaces.push(enlaceInput.value);
    }
  }
if (fileInput && fileInput.files && fileInput.files.length > 0){
  let newPublicacion: Publicacion = {
    title: formValues.title || "",
    descripcion: formValues.descripcion || "",
    img: fileInput?.files[0].name || "",
    enlaces: enlaces,
    author:user.email || ""
  };
  this.publiService.postPublicacion(newPublicacion, fileInput.files[0]).subscribe(res=>{
    if(res){
      Swal.fire({
  title: '¡Operación exitosa!',
  text: 'La acción se completó correctamente.',
  icon: 'success',
  confirmButtonText: 'Aceptar'
});
    }
  },err=>{
  Swal.fire({
  title: '¡Ha ocurrido un error!',
  text: 'la acción no se completo.',
  icon: 'error',
  confirmButtonText: 'Aceptar'
});
  })
}



}

}
