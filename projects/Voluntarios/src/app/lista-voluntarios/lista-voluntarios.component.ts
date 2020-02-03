import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoluntariosService } from 'projects/entities/src/lib/voluntarios.service';
import { Voluntario } from 'projects/entities/src/lib/voluntarios/voluntario';
import { ConfirmaRemocaoComponent } from '../confirma-remocao/confirma-remocao.component';
import { MatDialog } from '@angular/material';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-lista-voluntarios',
  templateUrl: './lista-voluntarios.component.html',
  styleUrls: ['./lista-voluntarios.component.scss']
})
export class ListaVoluntariosComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = '';
  voluntariosDocRef: Array<DocumentChangeAction<Voluntario>>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(
    public service: VoluntariosService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getVoluntarios()
      .subscribe((result: DocumentChangeAction<Voluntario>[]) => {
        this.voluntariosDocRef = result;
        this.age_filtered_items = result;
        this.name_filtered_items = result;
      })
  }

  viewDetails(voluntario: DocumentChangeAction<Voluntario>) {
    this.router.navigate(['/details/' + voluntario.payload.doc.id]);
  }

  editRoles(voluntario: DocumentChangeAction<Voluntario>) {
    this.router.navigate(['/roles/' + voluntario.payload.doc.id]);
  }

  delete(voluntario: DocumentChangeAction<Voluntario>) {
    const dialogRef = this.dialog.open(ConfirmaRemocaoComponent, {
      width: '250px',
      data: voluntario
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
      console.log('The dialog was closed: '+result);
      if (result) this.service.deleteVoluntario(voluntario.payload.doc.id)
        .then(
          res => {
            this.router.navigate(['/']);
          },
          err => {
            this.showErrorMessage(err);
          }
        )
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
    this.service.searchVoluntario(value)
      .subscribe(result => {
        this.name_filtered_items = result;
        this.voluntariosDocRef = this.combineLists(result, this.age_filtered_items);
      });
  }

  rangeChange(event) {
    this.service.searchVoluntarioPelaIdade(event.value)
      .subscribe(result => {
        this.age_filtered_items = result;
        this.voluntariosDocRef = this.combineLists(result, this.name_filtered_items);
      })
  }

  combineLists(a, b) {
    let result = [];

    a.filter(x => {
      return b.filter(x2 => {
        if (x2.payload.doc.id == x.payload.doc.id) {
          result.push(x2);
        }
      });
    });
    return result;
  }
}
