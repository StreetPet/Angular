import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoluntariosService } from 'projects/entities/src/lib/voluntarios.service';
import { Voluntario } from 'projects/entities/src/lib/voluntarios/voluntario';
import { ConfirmaRemocaoComponent } from '../confirma-remocao/confirma-remocao.component';
import { MatDialog } from '@angular/material';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-lista-voluntarios',
  templateUrl: './lista-voluntarios.component.html',
  styleUrls: ['./lista-voluntarios.component.scss']
})
export class ListaVoluntariosComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = '';

  // tslint:disable-next-line:variable-name
  _voluntarios: Subject<Voluntario[]> = new Subject<Voluntario[]>();
  // tslint:disable-next-line:variable-name
  _voluntarios$: Observable<Voluntario[]>;

  nameFilteredItems: Array<Voluntario>;
  ageFilteredItems: Array<Voluntario>;

  constructor(
    public service: VoluntariosService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this._voluntarios$ = this._voluntarios.asObservable();
  }

  ngOnInit() {
    this.service.observeVoluntarios((voluntarios: Voluntario[]) => {
      this._voluntarios.next(voluntarios);

      this.ageFilteredItems = voluntarios;
      this.nameFilteredItems = voluntarios;
    });
  }

  get voluntarios$(): Observable<Voluntario[]> {
    return this._voluntarios$;
  }

  viewDetails(voluntario: Voluntario) {
    this.router.navigate(['/details/' + voluntario.uid]);
  }

  editRoles(voluntario: Voluntario) {
    this.router.navigate(['/papeis/edit/' + voluntario.uid]);
  }

  delete(voluntario: Voluntario) {
    const dialogRef = this.dialog.open(ConfirmaRemocaoComponent, {
      width: '250px',
      data: voluntario
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('The dialog was closed: ' + result);
      if (result) {
        this.service.deleteVoluntario(voluntario.uid)
          .then(
            res => {
              this.router.navigate(['/']);
            },
            err => {
              this.showErrorMessage(err);
            }
          );
      }
    });
  }

  showErrorMessage(err) {
    console.log(err);
  }

  capitalizeFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    const value = this.searchValue.toLowerCase();
    this.service.searchVoluntario(value, (result: Voluntario[]) => {
      this.nameFilteredItems = result;
      this._voluntarios.next(this.combineLists(result, this.ageFilteredItems));
    });
  }

  rangeChange(event) {
    this.service.searchVoluntarioPelaIdade(event.value, (result: Voluntario[]) => {
      this.ageFilteredItems = result;
      this._voluntarios.next(this.combineLists(result, this.nameFilteredItems));
    });
  }

  private combineLists(a: Voluntario[], b: Voluntario[]): Voluntario[] {
    const result: Voluntario[] = [];

    a.filter((x: Voluntario) => {
      return b.filter((x2: Voluntario) => {
        // releva se UID for nulo
        if (x2.uid === null || x2.uid === null || x2.uid === x.uid) {
          result.push(x2);
        }
      });
    });
    return result;
  }
}
