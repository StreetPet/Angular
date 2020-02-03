import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material'
import { AvatarVoluntario } from 'projects/entities/src/lib/voluntarios';
import { VoluntariosService } from 'projects/entities/src/lib/voluntarios.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit, OnDestroy {

  avatars: Array<AvatarVoluntario> = new Array<AvatarVoluntario>();
  private subscription: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AvatarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private atualAvatar: AvatarVoluntario,
    private services: VoluntariosService
  ) { }

  ngOnInit() {
    this.subscription = this.getAvatars()
      .subscribe(data => {
        this.avatars = data;
        this.avatars.push(this.atualAvatar);
      });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
  }

  getAvatars(): Observable<AvatarVoluntario[]> {
    return this.services.getAvatars();
  }

  close(avatar: AvatarVoluntario) {
    this.dialogRef.close(avatar);
  }
}
