import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {EncrDecrService} from '@shared/helpers/encr-decr.service';
import {environment} from '@environment/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private kryptoService: EncrDecrService,
    private router: Router,
  ) {
    if (sessionStorage.getItem('currentUser')) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(this.kryptoService.get(sessionStorage.getItem('currentUser'))));
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem('currentUser'));
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  sayHello = (name: string) => console.log(`Hi ${name}`);

  public get currentUserValue(): any {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    }
  }

  recover(email: string): Observable<any> {
    const params = JSON.stringify({username: email});
    return this.http.post(`${environment.apiUrl}/api/login/recuperaContrasena`, params);
  }

  changePassword(password: string, token: string): Observable<any> {
    const params = JSON.stringify({newPasswor: password, value: token});
    return this.http.post(`${environment.apiUrl}/api/login/actualizaContrasena/`, params);
  }

  login(username: string, password: string, code: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/login?code=${code}`, {username, password}).pipe(map(user => {
      console.log('USER', user);
      if (user && user.access_token) {
        sessionStorage.setItem('currentUser', this.kryptoService.set(JSON.stringify(user)));
        return user;
        // this.getInformation(user.username).subscribe((information: any) => {
        //   const userInformation = user;
        //   userInformation.nombre =
        //     information.usuario[0].nombre + ' ' + information.usuario[0].apellidoPaterno + ' ' + information.usuario[0].apellidoMaterno;
        //   userInformation.id = information.usuario[0].id;
        //   sessionStorage.setItem('currentUser', this.kryptoService.set(JSON.stringify(userInformation)));
        //   this.currentUserSubject.next(userInformation);
        //   return userInformation;
        // });
      } else {
        console.log('Else del servicio');
      }
    }));
  }

  getUser() {
    try {
      return JSON.parse(this.kryptoService.get(sessionStorage.getItem('currentUser')));
    } catch (e) {
      return null;
    }
  }

  private getInformation(username) {
    const datos = {
      accion: 'listarInformacionUsuario',
      datos: {username}
    };
    const params = JSON.stringify(datos);
    return this.http.post<any[]>(`${environment.apiUrl}/api/catalogo`, params);
  }

  logout() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

}
