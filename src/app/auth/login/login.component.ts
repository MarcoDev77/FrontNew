import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any;
  login = true;
  recover = true;
  email: any;

  constructor(private router: Router) {
    this.user = {} as any;
    this.user.rol = '';
  }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/dashboard/ingreso']);
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
