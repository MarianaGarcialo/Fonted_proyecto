import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../../models/publicacion';
import { PublicacionService } from '../../services/publicacion.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ver-publicacion',
  imports: [CommonModule],
  templateUrl: './ver-publicacion.component.html',
  styleUrl: './ver-publicacion.component.css'
})
export class VerPublicacionComponent implements OnInit {

  publicacion:Publicacion =new Publicacion()

  constructor(private route:ActivatedRoute,
    private publi:PublicacionService
  ){

  }
  ngOnInit(): void {
    this.getPublicacion()
  }
  getPublicacion(){
  const id = this.route.snapshot.paramMap.get('id');
  if(!id) return
  this.publi.getPublicacion(id).subscribe(res =>{
    if(res){
      this.publicacion =res.data as Publicacion
    }
  })

  }
}
