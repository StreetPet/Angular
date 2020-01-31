import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Voluntario } from '../data-models/voluntario';
import { AvatarVoluntario } from '../data-models/avatar-voluntario';


@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {

  constructor(public db: AngularFirestore) { }

  getAvatars() {
    return this.db.collection<AvatarVoluntario>('/avatar').valueChanges();
  }

  getVoluntario(uuid) {
    return this.db.collection('voluntarios').doc<Voluntario>(uuid).snapshotChanges();
  }

  updateVoluntario(uuid: string, voluntario: Voluntario) {
    voluntario.nameToSearch = voluntario.nome.toLowerCase();
    return this.db.collection('voluntarios').doc<Voluntario>(uuid).set(voluntario);
  }

  deleteVoluntario(uuid: string) {
    return this.db.collection('voluntarios').doc<Voluntario>(uuid).delete();
  }

  getVoluntarios() {
    return this.db.collection('voluntarios').snapshotChanges();
  }

  searchVoluntario(searchValue: string) {
    return this.db.collection('voluntarios', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchVoluntarioPelaIdade(idade: number) {
    const collection = this.db
      .collection('voluntarios', ref => ref.orderBy('idade').startAt(idade));
    return collection.snapshotChanges();
  }

  createVoluntario(voluntario: Voluntario, avatar: AvatarVoluntario) {
    return this.db.collection('voluntarios')
      .add({
        nome: voluntario.nome,
        nameToSearch: voluntario.nome.toLowerCase(),
        sobrenome: voluntario.sobrenome,
        idade: parseInt(voluntario.idade, 10),
        avatar
      });
  }
}

