import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../environments/environment';
import { Publicacion } from '../models/publicacion';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  readonly apiUrl = Environment.backendUrl + "publicacion/"

  constructor(
    private http: HttpClient
  ) { }

  postPublicacion(publicacion: Publicacion, img: File) {
    const formData = new FormData();

    formData.append("title", publicacion.title || "");
    formData.append("descripcion", publicacion.descripcion || "");
    if (img) {
      formData.append("file", img);
    }
    if (publicacion.enlaces && publicacion.enlaces.length > 0) {
      publicacion.enlaces.forEach((enlace) => {
        formData.append("enlaces[]", enlace);
      });
    }
    if (publicacion.authors && publicacion.authors.length > 0) {
      publicacion.authors.forEach((author) => {
        formData.append("authors[]", author);
      });
    }
    formData.append("publicado_por", publicacion.publicado_por || "");
    return this.http.post(this.apiUrl, formData)

  }

  getPublicaciones(){
    return this.http.get<Response<Publicacion[]>>(this.apiUrl)
  }

  getPublicacion(id:string){
    return this.http.get<Response<Publicacion>>(this.apiUrl+`/${id}`)
  }

}
