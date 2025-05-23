import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Publicacion } from '../../models/publicacion';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../../services/publicacion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-publicacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './crear-publicacion.component.html',
  styleUrl: './crear-publicacion.component.css'
})
export class CrearPublicacionComponent {
  imagenPreview: string | null = null;
  imagenSeleccionada: File | null = null;

  enlaces: string[] = [];
  authors: string[] = [];

  formPublicacion = new FormGroup({
    title: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
  });

  constructor(
    private publiService: PublicacionService,
    private route: Router
  ) {}

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

  aniadirenlace() {
    this.enlaces.push('');
  }

  aniadirauthor() {
    this.authors.push('');
  }

 postPublicacion() {
  const fileInput = document.getElementById("imagen") as HTMLInputElement | null;
  const formValues = this.formPublicacion.value;
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Obtener los valores directamente del DOM
  const enlacesInputs = document.querySelectorAll<HTMLInputElement>('input[name^="enlace"]');
  const authorsInputs = document.querySelectorAll<HTMLInputElement>('input[name^="author"]');

  const enlaces = Array.from(enlacesInputs)
    .map(input => input.value.trim())
    .filter(value => value !== '');

  const authors = Array.from(authorsInputs)
    .map(input => input.value.trim())
    .filter(value => value !== '');

  console.log('Enlaces:', enlaces);
  console.log('Autores:', authors);

  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    const newPublicacion: Publicacion = {
      title: formValues.title || "",
      descripcion: formValues.descripcion || "",
      img: fileInput.files[0].name,
      enlaces: enlaces,
      authors: authors,
      publicado_por: user?.email || ""
    };

    this.publiService.postPublicacion(newPublicacion, fileInput.files[0]).subscribe(
      res => {
        Swal.fire({
          title: '¡Operación exitosa!',
          text: 'La acción se completó correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        // this.route.navigate(['inicio']);
      },
      err => {
        Swal.fire({
          title: '¡Ha ocurrido un error!',
          text: 'La acción no se completó.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
}

}
