import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoluntariosService } from 'projects/entities/src/lib/voluntarios.service';
import { Voluntario } from 'projects/entities/src/lib/voluntarios/voluntario';

@Component({
  selector: 'app-lista-voluntarios',
  templateUrl: './lista-voluntarios.component.html',
  styleUrls: ['./lista-voluntarios.component.scss']
})
export class ListaVoluntariosComponent implements OnInit {

  ageValue: number = 0;
  searchValue: string = '';
  voluntarios: Array<Voluntario>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(
    public service: VoluntariosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getVoluntarios()
      .subscribe((result: Voluntario[]) => {
        this.voluntarios = result;
        this.age_filtered_items = result;
        this.name_filtered_items = result;
      })
  }

  viewDetails(voluntario) {
    this.router.navigate(['/details/' + voluntario.payload.doc.id]);
  }

  editRules(voluntario){
    this.router.navigate(['/rules/' + voluntario.payload.doc.id]);
  }

  delete(voluntario){
    this.service.deleteVoluntario(voluntario.payload.doc.id)
      .then(
        res => {
          this.router.navigate(['/']);
        },
        err => {
          this.showErrorMessage(err);
        }
      )
  }

  showErrorMessage(err){
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
        this.voluntarios = this.combineLists(result, this.age_filtered_items);
      });
  }

  rangeChange(event) {
    this.service.searchVoluntarioPelaIdade(event.value)
      .subscribe(result => {
        this.age_filtered_items = result;
        this.voluntarios = this.combineLists(result, this.name_filtered_items);
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
