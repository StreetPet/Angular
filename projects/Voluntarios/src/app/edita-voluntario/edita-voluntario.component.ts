import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AvatarDialogComponent } from '../avatar-dialog/avatar-dialog.component';
import { VoluntariosService } from 'projects/entities/src/lib/voluntarios.service';
import { Subscription } from 'rxjs';
import { Voluntario, AvatarVoluntario } from 'projects/entities/src/lib/voluntarios';
import { ConfirmaRemocaoComponent } from '../confirma-remocao/confirma-remocao.component';
import { resolve } from 'url';

@Component({
  selector: 'app-edita-voluntario',
  templateUrl: './edita-voluntario.component.html',
  styleUrls: ['./edita-voluntario.component.scss']
})
export class EditaVoluntarioComponent implements OnInit, OnDestroy {

  formVoluntario: FormGroup;
  voluntario: Voluntario;

  readonly validationMessages = {
    nome: [
      { type: 'required', message: 'O nome é obrigatório.' }
    ],
    sobrenome: [
      { type: 'required', message: 'O Sobre nome é obrigatório.' }
    ],
    idade: [
      { type: 'required', message: 'A idade é obrigatório.' },
    ],
    email: [
      { type: 'required', message: 'O e-mail é obrigatório.' }
    ]
  };

  private subscriptions: Subscription[] = new Array();

  constructor(
    private service: VoluntariosService,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const subscription = this.route.data.subscribe((routeData: Data) => {
      this.voluntario = routeData.data;
      if (this.voluntario) {
        this.createForm();
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    }))
  }

  private createForm() {
    this.formVoluntario = this.builder.group({
      nome: [this.voluntario.nome, Validators.required],
      sobrenome: [this.voluntario.sobrenome, Validators.required],
      idade: [this.voluntario.idade, Validators.required],
      email: [this.voluntario.email, Validators.required]
    });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
      data: { link: this.voluntario.avatar } as unknown as AvatarVoluntario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.voluntario.avatar = result.link;
      }
    });
  }

  onSubmit(value: Voluntario): Promise<boolean> {
    value.avatar = this.voluntario.avatar;

    return this.service.updateVoluntario(value, this.voluntario.uid)
      .then(res => this.router.navigate(['/']));
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmaRemocaoComponent, {
      width: '250px',
      data: this.voluntario
    });

    const subscription = dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        console.log('The dialog was closed' + result);
        if (result) {
          this.service.deleteVoluntario(this.voluntario.uid)
            .then(
              () => this.router.navigate(['/']),
              err => console.log(err)
            );
        }
      });
    this.subscriptions.push(subscription);
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
