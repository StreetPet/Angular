import { Injectable, NgZone, Injector, } from '@angular/core';
import { User, auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Visitante } from 'projects/entities/src';
import { VERIFY_EMAIL_ADDRESS_ROUTER_NAME, DASHBOARD_ROUTER_NAME } from './auth-routing.names';
import { SIGN_IN_ROUTER_NAME } from './auth-routing.names';
import { IDashboardModule } from './dashboard/dashboard.module';
import { AppMessagesService } from 'projects/app-messages/src';
import { BehaviorSubject, Subscribable, Subscription } from 'rxjs';

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
  // tslint:disable-next-line: variable-name
  private _visitante: BehaviorSubject<Visitante>;
  // tslint:disable-next-line: variable-name
  private _subscribeVisitante: Subscription;

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private msgSrv: AppMessagesService,
    private router: Router,
    private ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this._visitante = new BehaviorSubject<Visitante>(JSON.parse(localStorage.getItem('visitante')));

    /*
     * Saving user data in localstorage when
     * logged in and setting up null when logged out
     * */
    this.afAuth.authState.subscribe((visitante: User | null) => {
      if (visitante) {
        localStorage.setItem('visistante', JSON.stringify(visitante));
        this._visitante.next(visitante);
      } else {
        localStorage.setItem('visistante', null);
        this._visitante.next(null);
      }
    });
  }

  observeVisitante(observerFn: (visitante: Visitante) => void): Subscription {
    return this._visitante.subscribe(observerFn);
  }

  /**
   * Seta uma função que importa o módulo que constroe o Dashboard.
   * 
   * @param loader 
   */
  public setDashboardModuleLoader(loader: LoaderDashboardModule) {
    this._dashboardModuleLoader = loader;
  }

  /**
   * Retorna o módulo que será usado para construir o DashBoard.
   */
  getDashboardModule(): Promise<IDashboardModule> {
    console.log('***** AuthService.getDashboardModule ****');
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
    const visitanteRef: AngularFirestoreDocument<Visitante> = this.afs.doc<Visitante>(`users/${user.uid}`);

    localStorage.setItem('visistante', JSON.stringify(user));

    const visitante: Visitante = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    return visitanteRef.set(visitante, {
      merge: true
    }).then(() => {
      if (this._subscribeVisitante) this._subscribeVisitante.unsubscribe();
      this._subscribeVisitante = visitanteRef.get()
        .subscribe((ref: DocumentSnapshot<DocumentData>) => {
          if (ref.exists) {
            this._visitante.next(ref.data() as Visitante);
          }
        });
    });
  }

  /**
   * Sign Out User
   */
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('visistante');
      this.router.navigate([SIGN_IN_ROUTER_NAME]);
      this._subscribeVisitante.unsubscribe();
    });
  }
}
