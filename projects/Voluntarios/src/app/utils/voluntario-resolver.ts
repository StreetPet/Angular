import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { VoluntariosService } from 'projects/entities/src/lib/voluntarios.service';
import { Voluntario } from 'projects/entities/src';

@Injectable()
export class VoluntarioResolver implements Resolve<Voluntario> {

   constructor(private voluntarioSrv: VoluntariosService) { }

   resolve(route: ActivatedRouteSnapshot): Promise<Voluntario> {
      return new Promise((resolve, reject) => {
         const id = route.paramMap.get('id');
         const subscription = this.voluntarioSrv.observeVoluntario(id,
            (voluntario: Voluntario) => {
               subscription.unsubscribe();
               if (voluntario) {
                  resolve(voluntario);
               } else {
                  reject({
                     msg: `Voluntário não encontrado com o ID: ${id}`,
                     id
                  });
               }
            }
         );
      });
   }
}
