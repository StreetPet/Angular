import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarPapeisVoluntarioComponent } from './listar-papeis-voluntario/listar-papeis-voluntario.component';
import { EditarPapeisVoluntarioComponent } from './editar-papeis-voluntario/editar-papeis-voluntario.component';
import { VoluntarioResolver } from '../utils/voluntario-resolver';

const routes: Routes = [
  {
    path: 'list/:id',
    component: ListarPapeisVoluntarioComponent,
    resolve: {
      data: VoluntarioResolver
    }
  },
  {
    path: 'edit/:id',
    component: EditarPapeisVoluntarioComponent,
    resolve: {
      data: VoluntarioResolver
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PapeisRoutingModule { }
