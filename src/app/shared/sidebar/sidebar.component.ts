import {Component, OnInit} from '@angular/core';
import {ROUTES} from '../../dashboard/_main/menu';

var misc: any = {
  sidebar_mini_active: false
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public time: any;
  public currentUser: any;

  constructor() {
    this.menuItems = [];
  }

  ngOnInit() {
    const items = ROUTES.filter(menuItem => menuItem);
    for (const item of items) {
      this.menuItems.push(item);
    }

  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }

  myFunc(event, menuitem) {
    event.preventDefault();
    event.stopPropagation();
    this.sleep(10);
    if (menuitem.isCollapsing === undefined) {
      menuitem.isCollapsing = true;

      // menuitem.isCollapsed = !menuitem.isCollapsed;

      var element = event.target;
      while (
        element.getAttribute('data-toggle') !== 'collapse' &&
        element !== document.getElementsByTagName('html')[0]
        ) {
        element = element.parentNode;
      }
      element = element.parentNode.children[1];

      if (
        element.classList.contains('collapse') &&
        !element.classList.contains('show')
      ) {
        element.classList = 'before-collapsing';
        var style = element.scrollHeight;

        element.classList = 'collapsing';
        setTimeout(function() {
          element.setAttribute('style', 'height:' + style + 'px');
        }, 1);
        setTimeout(function() {
          element.classList = 'collapse show';
          element.removeAttribute('style');
          menuitem.isCollapsing = undefined;
        }, 350);
      } else {
        var style = element.scrollHeight;
        setTimeout(function() {
          element.setAttribute('style', 'height:' + (style + 20) + 'px');
        }, 3);
        setTimeout(function() {
          element.classList = 'collapsing';
        }, 3);
        setTimeout(function() {
          element.removeAttribute('style');
        }, 20);
        setTimeout(function() {
          element.classList = 'collapse';
          menuitem.isCollapsing = undefined;
        }, 400);
      }
    }
  }

  minimizeSidebar() {
    if (this.time) {
      clearTimeout(this.time);
    }

    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('sidebar-mini')) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }

    if (misc.sidebar_mini_active === true) {
      body.classList.remove('sidebar-mini');
      misc.sidebar_mini_active = false;
      const title = <HTMLElement> document.getElementsByClassName('fiscalia-title-top')[0];
      title.classList.add('d-none');
    } else {
      body.classList.add('sidebar-mini');
      misc.sidebar_mini_active = true;
      const title = <HTMLElement> document.getElementsByClassName('fiscalia-title-top')[0];

      this.time = setTimeout(() => {
        title.classList.remove('d-none');
      }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
      clearInterval(simulateWindowResize);
    }, 1000);
  }
}
