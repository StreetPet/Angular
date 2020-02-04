import { Injectable, NgZone, Provider } from '@angular/core';
import { User, auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Visitantes as Visitante } from 'projects/entities/src/lib/visitantes/visitantes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _visitanteData: User;
  public static readonly SIGN_IN_ROUTER_NAME: string = 'sign-in';
  public static readonly SIGN_OUT_ROUTER_NAME: string = 'sign-out';
  public static readonly REGISTER_USER_ROUTER_NAME: string = 'register-user';
  public static readonly DASHBOARD_ROUTER_NAME: string = 'dashboard';
  public static readonly FORGOT_PASSWORD_ROUTER_NAME: string = 'forgot-password';
  public static readonly VERIFY_EMAIL_ADDRESS_ROUTER_NAME
  : string = 'verify-email-address';

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
  signIn(email: string = null, password: string = null): Promise<any> {
    if (email)
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result: firebase.auth.UserCredential) => {
          this.ngZone.run(() => {
            this.router.navigate([AuthService.DASHBOARD_ROUTER_NAME]);
          });
          this.setVisitanteData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        });
    else
      return this.router.navigate([AuthService.SIGN_IN_ROUTER_NAME]);
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
        this.router.navigate([AuthService.VERIFY_EMAIL_ADDRESS_ROUTER_NAME]);
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

  githubAuth(): Promise<void>{
    const provider: auth.GithubAuthProvider = new auth.GithubAuthProvider();
    return this.authLogin(provider);
  }
  // Sign in with Google
  googleAuth(): Promise<void> {
    const provider: auth.GoogleAuthProvider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.authLogin(provider);
  }

  facebookAuth(): Promise<void> {
    const provider:auth.FacebookAuthProvider = new auth.FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.authLogin(provider);
  }

  // Auth logic to run auth providers
  authLogin(provider: auth.AuthProvider): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([AuthService.DASHBOARD_ROUTER_NAME]);
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
      this.router.navigate([AuthService.SIGN_IN_ROUTER_NAME]);
    })
  }

}