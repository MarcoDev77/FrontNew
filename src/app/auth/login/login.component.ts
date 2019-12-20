import {Component, OnInit} from '@angular/core';

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

  constructor() {
    this.user = {} as any;
  }

  ngOnInit() {
  }

  onSubmit() {

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
