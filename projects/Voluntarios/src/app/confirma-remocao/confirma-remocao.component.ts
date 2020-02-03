import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Voluntario } from 'projects/entities/src/lib/voluntarios';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-confirma-remocao',
  templateUrl: './confirma-remocao.component.html',
  styleUrls: ['./confirma-remocao.component.scss']
})
export class ConfirmaRemocaoComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmaRemocaoComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public voluntario: DocumentChangeAction<Voluntario>) { }

  cancel(): void {
    this.dialogRef.close(false);
  }

}

