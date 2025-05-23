import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../models/publicacion';


@Component({
  selector: 'app-inicio',
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  publicaciones: Publicacion[] = []




  constructor(private router: Router,
    private publi:PublicacionService,
  ){

  }

  ngOnInit(): void {
    this.getPublicacion()
  }

  getPublicacion(){
    this.publi.getPublicaciones().subscribe(res=>{
      if(res){
        this.publicaciones=res.data as Publicacion[]
      }
    })
  }



enrrutador(id:string){
  this.router.navigate(["publicacion/"+id])
}
}
