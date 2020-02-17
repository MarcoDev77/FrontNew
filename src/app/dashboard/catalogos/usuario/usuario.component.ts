import { Component, OnInit } from '@angular/core';
import { Personal } from '@shared/models/Personal';
import { CatalogosService } from '@shared/services/catalogos.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@shared/services/authentication.service';
import { User } from '@shared/models/User';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public data: Personal[];
  public isLoading = false;
  public p;
  public filter;
  public key = 'id'; // set default
  public reverse = true;

  public selectedRow: number;
  public setClickedRow: Function;

  public roles: any[];
  public areas: any [];
  public rolSelected: any;
  public currentUser: any;

  public persona: Personal;
  public user: User;


  constructor(private authenticationService: AuthenticationService, private catalogosService: CatalogosService, private router: Router, private modalService: NgbModal) {
    this.data = [];
    this.roles = [];
    this.areas = [];
    this.persona = {} as any;
    this.user = {}as any
    this.setClickedRow = function(index) {
      this.selectedRow = this.selectedRow === index ? -1 : index;
    };

  }

  ngOnInit() {
    this.getData();
    this.listRoles();
    this.listAreas();
  }

  getData() {
    console.log("entra");
    this.catalogosService.listUsuarios().subscribe((data: any) => {
      console.log('getData', data);
      this.data = data.listPersonal
      console.log(this.data)
    });
  }

  switch(e) {
    this.p = e;
  }

  sort(key) {
    if (key === this.key) {
      this.reverse = !this.reverse;
      if (this.reverse === false) {
        this.key = 'id';
        this.reverse = true;
      }
    } else {
      this.key = key;
      this.reverse = false;
    }
  }

  savePersonal() {
    console.log('Save');
    console.log(this.user);

    this.persona.centroPenitenciario = {
      id: 1
    }
    this.persona.area={id:this.persona.area.value}
    this.user.roles=[{id: this.rolSelected.value}];
    
    let model={...this.persona};
    model.user=this.user;

      console.log(model);
    
    this.catalogosService.saveUsuario(model).subscribe((data: any) => {
      console.log(data);
    });
  }
  openModal(modal) {
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  goTo(uri: string) {
    this.router.navigate([`dashboard/ingreso/${uri}`]);
  }

  listRoles() {
    this.catalogosService.listRoles().subscribe((data: any) => {
      data.roles.forEach(role => {
        this.roles.push({value: role.id, description: role.authority});
      });
    });
  }

  listAreas() {
    this.catalogosService.listAreas().subscribe((data: any) => {
      data.areas.forEach(area => {
        this.areas.push({value: area.id, description: area.nombre});
      });
    });
  }

  togglePersonal(id, tipo, status){
    let model={
      id:id,
      tipoCambio:tipo,
      status:status
    }
    this.catalogosService.toggleUsuario(model).subscribe((data: any) => {
      console.log(data)
      this.getData();
    })
  }

 
}
