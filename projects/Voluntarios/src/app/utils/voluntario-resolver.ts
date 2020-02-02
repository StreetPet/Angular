
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { VoluntariosService } from 'projects/entities/src/lib/voluntarios.service';

@Injectable()
export class VoluntarioResolver implements Resolve<any> {

   constructor(private servico: VoluntariosService) { }

   resolve(route: ActivatedRouteSnapshot) {
      return new Promise((resolve, reject) => {
         const id = route.paramMap.get('id');
         this.servico.getVoluntario(id)
            .subscribe(
               data => {
                  resolve(data);
               }
            );
      });
   }
}
