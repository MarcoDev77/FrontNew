import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '@shared/services/authentication.service';
import {User} from '@shared/models/User';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {roles} from '@shared/helpers/roles';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  returnUrl: string;
  error = '';
  user: User = new User();
  email: any;
  token: any;
  login = true;
  recover = true;
  @ViewChild('tokenModal', {static: false}) public tokenModal: NgbModal;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    const user = authenticationService.getCurrentUser();
    if (user) {
      this.redirectUser(user);
    }
  }

  ngOnInit() {
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  async onSubmit() {
    this.isLoading = true;
    this.authenticationService.login(this.user.username, this.user.password).pipe(first()).subscribe(user => {
        this.isLoading = false;
        if (user) {
          this.redirectUser(user);
        }
      },
      error => {
        alert('Acceso denegado!');
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }, () => {
        console.log('complete');
      });
  }

  composeEmail() {

  }

  redirectUser(user: User) {
    for (const r of Object.values(roles)) {
      if (user.roles.includes(r.role)) {
        return this.router.navigate([r.main]);
      }
    }
  }

  switch(flag?) {
    if (!flag) {
      this.login = !this.login;
      this.recover = true;
    } else {
      this.recover = !this.recover;
    }

    this.email = '';
    this.user = {} as any;
  }
}
