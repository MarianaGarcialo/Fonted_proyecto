import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { VerPublicacionComponent } from './components/ver-publicacion/ver-publicacion.component';
import { CrearPublicacionComponent } from './components/crear-publicacion/crear-publicacion.component';
export const routes: Routes = [
   { path: '', redirectTo: 'inicio', pathMatch: 'full' },
   { path:"inicio", component: InicioComponent},
   {path:"Quienes_somos",component:QuienesSomosComponent},
   {path:"publicacion/:id", component:VerPublicacionComponent},
   {path:"crear_publicacion", component:CrearPublicacionComponent},

]

