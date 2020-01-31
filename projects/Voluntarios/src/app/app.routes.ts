import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaVoluntariosComponent } from './lista-voluntarios/lista-voluntarios.component';
import { AdicionaVoluntarioComponent } from './adiciona-voluntario/adiciona-voluntario.component';
import { EditaVoluntarioComponent } from './edita-voluntario/edita-voluntario.component';


const routes: Routes = [
  { path: '', component: ListaVoluntariosComponent },
  { path: 'list', component: ListaVoluntariosComponent },
  { path: 'add', component: AdicionaVoluntarioComponent },
  { path: 'details/:id', component: EditaVoluntarioComponent, resolve:{data : EditaVoluntarioComponent} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
