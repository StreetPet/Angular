import { Injectable, NgZone } from '@angular/core';
import { User, auth } from 'firebase/app';
import { } from '@firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Visitantes as Visitante } from 'projects/entities/src/lib/visitantes/visitantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _visitanteData: User;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((visitante: User | null) => {
      if (visitante) {
        this._visitanteData = visitante;
        localStorage.setItem('visistante', JSON.stringify(this.visitanteData));
        JSON.parse(localStorage.getItem('visistante'));
      } else {
        localStorage.setItem('visistante', null);
        JSON.parse(localStorage.getItem('visistante'));
      }
    })
  }

  /**
   * Metadados do visitante logado no sistema.
   */
  public get visitanteData(): User {
    return this._visitanteData;
  }

  /**
   *  Sign in with email/password
   */
  signIn(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result: firebase.auth.UserCredential) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setVisitanteData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  signUp(email, password): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.sendVerificationMail();
        this.setVisitanteData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  /**
   * Reset Forggot password
   */
  forgotPassword(passwordResetEmail: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('visistante'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  googleAuth(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  facebookAuth(): Promise<void> {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider: auth.AuthProvider): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.setVisitanteData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setVisitanteData(user: User): Promise<any> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc<Visitante>(`users/${user.uid}`);

    const userData: Visitante = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out 
  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('visistante');
      this.router.navigate(['sign-in']);
    })
  }

}