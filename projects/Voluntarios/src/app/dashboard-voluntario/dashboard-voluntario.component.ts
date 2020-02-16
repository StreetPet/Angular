import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from 'projects/auth/src/lib/dashboard/dashboard.component';
import { User } from 'firebase';
import { AuthService } from 'projects/auth/src/public-api';
import { Voluntario } from 'projects/entities/src/public-api';

@Component({
  selector: 'app-dashboard-voluntario',
  templateUrl: './dashboard-voluntario.component.html',
  styleUrls: ['./dashboard-voluntario.component.scss']
})
export class DashboardVoluntarioComponent extends DashboardComponent implements OnInit {
  
  private _voluntarioData: Voluntario;
  voluntariadoConfirmado: boolean = false;

  get voluntarioData():Voluntario{
    return this._voluntarioData;
  }

  get isVoluntario(): boolean{
    return this.voluntarioData != null;;
  }

  public async tornarSeVoluntario(){
    return new Promise((resolve,reject)=>{
      if(!this.voluntariadoConfirmado) reject();
      
      this._voluntarioData = <Voluntario>{
        
      };
      resolve();
    });
  }
}
