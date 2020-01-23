import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '@shared/services/authentication.service';
import {User} from '@shared/models/User';
import {first} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
    this.authenticationService.getUser().subscribe(user => {
      console.log('USER', user);
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  async onSubmit() {
    // return console.log('USER', this.user);
    // this.router.navigate(['/dashboard/ingreso']);
    // this.loading = true;
    // try {
    //   this.isLoading = true;
    //   const data = await this.authenticationService.login(this.user.username, this.user.password, this.token).pipe(first());
    //   console.log(data);
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   this.isLoading = false;
    // }
    this.isLoading = true;
    this.authenticationService.login(this.user.username, this.user.password).pipe(first()).subscribe(user => {
        this.isLoading = false;
        if (user) {

          // for (let [key, value] of Object.entries(roles)) {
          //   if ((user.roles[0] === value.role)) {
          this.router.navigateByUrl('/dashborad');
          //   }
          // }
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
