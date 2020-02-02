import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoluntarioResolver } from './utils/voluntario-resolver'
import { ListaVoluntariosComponent } from './lista-voluntarios/lista-voluntarios.component';
import { AdicionaVoluntarioComponent } from './adiciona-voluntario/adiciona-voluntario.component';
import { EditaVoluntarioComponent } from './edita-voluntario/edita-voluntario.component';
import { EditaPapeisVoluntarioComponent } from './edita-papeis-voluntario/edita-papeis-voluntario.component';
import { PageNotFoundComponent } from 'projects/layout/src/lib/404/404.component';

const routes: Routes = [
  { path: '', component: ListaVoluntariosComponent },
  { path: 'home', component: ListaVoluntariosComponent },
  { path: 'list', component: ListaVoluntariosComponent },
  { path: 'add', component: AdicionaVoluntarioComponent },
  {
    path: 'details/:id', component: EditaVoluntarioComponent,
    resolve: {
      data: VoluntarioResolver
    }
  },
  {
    path: 'rules/:id', component: EditaPapeisVoluntarioComponent,
    resolve: {
      data: VoluntarioResolver
    }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
