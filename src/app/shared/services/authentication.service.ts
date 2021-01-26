import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EncrDecrService } from '@shared/helpers/encr-decr.service';
import { environment } from '@environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private kryptoService: EncrDecrService,
    private router: Router,
  ) {

  }

  recover(email: string): Observable<any> {
    const params = JSON.stringify({ username: email });
    return this.http.post(`${environment.apiUrl}/api/login/recuperaContrasena`, params);
  }

  changePassword(password: string, token: string): Observable<any> {
    const params = JSON.stringify({ newPasswor: password, value: token });
    return this.http.post(`${environment.apiUrl}/api/login/actualizaContrasena/`, params);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/login`, { username, password }).pipe(map(user => {
      if (user && user.access_token) {
        sessionStorage.setItem('currentUser', this.kryptoService.set(JSON.stringify(user)));
        return user;
      }
    }));
  }

  getCurrentUser() {
    try {
      return JSON.parse(this.kryptoService.get(sessionStorage.getItem('currentUser')));
    } catch (e) {
      return null;
    }
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getCurrentPersonal() {
    return this.http.get(`${environment.apiUrl}/api/consultarInformacionPersonal`);
  }
}
