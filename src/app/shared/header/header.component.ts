import {Component, ElementRef, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ROUTES} from '@dashboard/_main/menu';
import {roles, roles as r} from '@shared/helpers/roles';
import {AuthenticationService} from '@shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  private listTitles: any[];
  public location: Location;
  private sidebarVisible: boolean;
  private mobile_menu_visible: any = 0;
  private toggleButton: any;
  public currentUser: any;
  public currentPersonal: any;
  public date: Date;
  public intervalo: any;
  public informationUser: any;
  public intevals: any[];
  public notficaciones: any[];
  public activeNotficaciones: number;

  constructor(
    location: Location,
    private router: Router,
    private element: ElementRef,
    private authenticationService: AuthenticationService
  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.date = new Date();
    this.intevals = [];
    this.notficaciones = [];
  }

  ngOnInit() {
    this.getDate();

   
      this.currentUser = this.authenticationService.getCurrentUser(); 
    console.log("usaer", this.currentUser)
      for (let [key, value] of Object.entries(roles)) {
        if (this.currentUser && value.role === this.currentUser.roles[0]) {
         
          this.informationUser = {name: this.currentUser.nombre, role: value.name, foto: this.currentUser.foto}
        
        }
      }
      this.getCurrentPersonal();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementById('bodyClick');
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  sidebarToggle() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName('html')[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function() {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function() {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('id', 'bodyClick');


      if (html.getElementsByTagName('body')) {
        document.getElementsByTagName('body')[0].appendChild($layer);
      }

      $layer.onclick = function() { //asign a function
        html.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
        const mainPanel = <HTMLElement> document.getElementsByClassName('main-panel')[0];

        if (window.innerWidth < 991) {
          setTimeout(function() {
            mainPanel.style.position = '';
          }, 500);
        }
      }.bind(this);

      html.classList.add('nav-open');
      this.mobile_menu_visible = 1;
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement> document.getElementsByClassName('main-panel')[0];
    const html = document.getElementsByTagName('html')[0];

    setTimeout(function() {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    const mainPanel = <HTMLElement> document.getElementsByClassName('main-panel')[0];

    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  getDate() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }

    this.intervalo = setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  logout() {
    this.authenticationService.logout();
  }

  getCurrentPersonal(){
    this.authenticationService.getCurrentPersonal().subscribe((data:any)=>{
      console.log(data);
      this.currentPersonal=data;
      this.informationUser.name=this.currentPersonal.personal.nombre
    })
  }
}
