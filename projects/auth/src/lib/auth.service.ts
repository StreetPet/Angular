import { Injectable, NgZone, Injector, } from '@angular/core';
import { User, auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Visitante } from 'projects/entities/src';
import { VERIFY_EMAIL_ADDRESS_ROUTER_NAME, DASHBOARD_ROUTER_NAME } from './auth-routing.names';
import { SIGN_IN_ROUTER_NAME } from './auth-routing.names';
import { IDashboardModule } from './dashboard/dashboard.module';
import { AppMessagesService } from 'projects/app-messages/src';

export class AuthServiceLocator {
  // tslint:disable-next-line: variable-name
  private static _injector: Injector = {} as Injector;

  public static get injector(): Injector {
    return AuthServiceLocator._injector;
  }

  public static set injector(injector: Injector) {
    if (injector == null)
      throw new Error('Não se pode definir o Injector como Nullo!');
    this._injector = injector;
  }

  private constructor() { }

}

export type LoaderDashboardModule = () => Promise<IDashboardModule>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: variable-name
  private _dashboardModuleLoader: LoaderDashboardModule;

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private msgSrv: AppMessagesService,
    private router: Router,
    private ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /*
     * Saving user data in localstorage when
     * logged in and setting up null when logged out
     * */
    this.afAuth.authState.subscribe((visitante: User | null) => {
      if (visitante) {
        localStorage.setItem('visistante', JSON.stringify(this.visitante));
        JSON.parse(localStorage.getItem('visistante'));
      } else {
        localStorage.setItem('visistante', null);
        JSON.parse(localStorage.getItem('visistante'));
      }
    });
  }

  setDashboardModuleLoader(loader: LoaderDashboardModule) {
    this._dashboardModuleLoader = loader;
  }

  getDashboardComponent(): Promise<IDashboardModule> {
    console.log('***** getDashboardComponent ****');
    if (this._dashboardModuleLoader)
      return this._dashboardModuleLoader();
    else
      return import('./dashboard/dashboard.module')
        .then(mod => mod.DashboardModule);
  }

  /**
   *  Sign in with email/password
   */
  signIn(email: string = null, password: string = null): Promise<void> {
    if (email)
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result: firebase.auth.UserCredential) => {
          this.ngZone.run(() => {
            this.router.navigate([DASHBOARD_ROUTER_NAME]);
          });
          this.setVisitante(result.user);
        }).catch((error) => {
          this.msgSrv.addMsg(error.message, 'alert');
        });
    else {
      this.router.navigate([SIGN_IN_ROUTER_NAME]);
      this.msgSrv.addMsg('E-mail não foi informado!', 'alert');
      return Promise.reject('E-mail não foi informado!');
    }
  }

  // Sign up with email/password
  signUp(email, password): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /*
         * Call the SendVerificaitonMail() function when new user sign
         * up and returns promise
         */
        this.sendVerificationMail();
        this.setVisitante(result.user);
      }).catch((error) => {
        this.msgSrv.addMsg(error.message, 'alert');
      });
  }

  /**
   * Send email verfificaiton when new user sign up
   */
  sendVerificationMail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate([VERIFY_EMAIL_ADDRESS_ROUTER_NAME]);
      });
  }

  /**
   * Reset Forggot password
   */
  forgotPassword(passwordResetEmail: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.msgSrv.addMsg('Password reset email sent, check your inbox.');
      }).catch((error) => {
        this.msgSrv.addMsg(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('visistante'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  githubAuth(): Promise<void> {
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
    const provider: auth.FacebookAuthProvider = new auth.FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.authLogin(provider);
  }

  /**
   *  Auth logic to run auth providers
   */
  authLogin(provider: auth.AuthProvider): Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate([DASHBOARD_ROUTER_NAME]);
        });
        this.setVisitante(result.user);
      }).catch((error) => {
        this.msgSrv.addMsg(error.message, 'alert');
      });
  }

  /**
   * Metadados do visitante logado no sistema.
   */
  public get visitante(): Visitante {
    return JSON.parse(localStorage.getItem('visistante'));
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  private setVisitante(user: User): Promise<void> {
    const userRef: AngularFirestoreDocument<Visitante> = this.afs.doc<Visitante>(`users/${user.uid}`);

    localStorage.setItem('visistante', JSON.stringify(user));

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

  /**
   * Sign Out User
   */
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('visistante');
      this.router.navigate([SIGN_IN_ROUTER_NAME]);
    });
  }
}
