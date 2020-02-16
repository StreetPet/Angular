import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoluntarioResolver } from './utils/voluntario-resolver'
import { ListaVoluntariosComponent } from './lista-voluntarios/lista-voluntarios.component';
import { AdicionaVoluntarioComponent } from './adiciona-voluntario/adiciona-voluntario.component';
import { EditaVoluntarioComponent } from './edita-voluntario/edita-voluntario.component';
import { PageNotFoundComponent } from 'projects/layout/src/lib/404/404.component'; 

const routes: Routes = [
  {
    path: 'home_voluntarios',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', component: ListaVoluntariosComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'list', component: ListaVoluntariosComponent },
  { path: 'add', component: AdicionaVoluntarioComponent },
  {
    path: 'details/:id', component: EditaVoluntarioComponent,
    resolve: {
      data: VoluntarioResolver
    }
  },
  
  { path: 'papeis', loadChildren: () => import('./papeis/papeis.module').then(m => m.PapeisModule) },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
