import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { VoluntariosService } from 'projects/entities/src/lib/voluntarios.service';
import { Subscription } from 'rxjs';
import { Voluntario, AvatarVoluntario } from 'projects/entities/src/lib/voluntarios';
import { ConfirmaRemocaoComponent } from '../confirma-remocao/confirma-remocao.component';

@Component({
  selector: 'app-edita-voluntario',
  templateUrl: './edita-voluntario.component.html',
  styleUrls: ['./edita-voluntario.component.scss']
})
export class EditaVoluntarioComponent implements OnInit, OnDestroy {

  formVoluntario: FormGroup;
  voluntario: Voluntario;

  readonly validationMessages = {
    'nome': [
      { type: 'required', message: 'O nome é obrigatório.' }
    ],
    'sobrenome': [
      { type: 'required', message: 'O Sobre nome é obrigatório.' }
    ],
    'idade': [
      { type: 'required', message: 'A idade é obrigatório.' },
    ],
    'email': [
      { type: 'required', message: 'O e-mail é obrigatório.' }
    ]
  };

  private routeDataSubscription: Subscription;

  constructor(
    private service: VoluntariosService,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.routeDataSubscription = this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.voluntario = data.payload.data();
        this.voluntario.uid = data.payload.id;
        this.createForm();
      }
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription && !this.routeDataSubscription.closed) {
      this.routeDataSubscription.unsubscribe();
    }
  }

  createForm() {
    this.formVoluntario = this.builder.group({
      nome: [this.voluntario.nome, Validators.required],
      sobrenome: [this.voluntario.sobrenome, Validators.required],
      idade: [this.voluntario.idade, Validators.required],
      email: [this.voluntario.email, Validators.required]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
      data: <AvatarVoluntario><unknown>{ link: this.voluntario.avatar }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.voluntario.avatar = result.link;
      }
    });
  }

  onSubmit(value: Voluntario) {
    value.avatar = this.voluntario.avatar;
    value.idade = value.idade;
    this.service.updateVoluntario(this.voluntario.uid, value)
      .then(
        res => {
          this.router.navigate(['/']);
        }
      );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmaRemocaoComponent, {
      width: '250px',
      data: this.voluntario
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
      console.log('The dialog was closed'+result);
      if (result) this.service.deleteVoluntario(this.voluntario.uid)
        .then(
          res => {
            this.router.navigate(['/']);
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
