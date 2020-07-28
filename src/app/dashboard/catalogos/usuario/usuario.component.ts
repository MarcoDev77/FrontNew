import { Component, OnInit } from '@angular/core';
import { Personal } from '@shared/models/Personal';
import { CatalogosService } from '@shared/services/catalogos.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@shared/services/authentication.service';
import { User } from '@shared/models/User';
import Swal from 'sweetalert2';
import { analyzeAndValidateNgModules } from '@angular/compiler';
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

  public rolesLista: any[];
  public areas: any [];
  public rolSelected: any;
  public areaSelected:any
  public currentUser: any;

  public persona: Personal;
  public user: User;

  public tituloModal: String;
  constructor(private authenticationService: AuthenticationService, private catalogosService: CatalogosService, private router: Router, private modalService: NgbModal) {
    this.data = [];
    this.rolesLista = [];
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
    this.catalogosService.listUsuarios().subscribe((data: any) => {
      console.log('getData', data);
      if (data.listPersonal) {
        this.data = data.listPersonal;
      }
      console.log(this.data);
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
    ///console.log(this.user);
   
    if(this.areaSelected){
    this.persona.area={id:this.areaSelected.value}
    }
    this.persona.user=this.user;
      
    
    this.catalogosService.saveUsuario(this.persona).subscribe((data: any) => {
      
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      }).then(()=>{
        //
        if(!data.error){
          this.getData()
          this.modalService.dismissAll();
          this.persona= {} as any;
          this.user= {} as any
        }
      })
      

    }); 
  }
  openModal(modal) {
    this.persona= {} as any;
    this.user= {} as any;
    this.tituloModal="Registrar usuario"
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
  }

  goTo(uri: string) {
    this.router.navigate([`dashboard/ingreso/${uri}`]);
  }

  listRoles() {
    this.catalogosService.listRoles().subscribe((data: any) => {
      this.rolesLista=[]
      console.log(this.user)
      data.roles.forEach(role => {
        this.rolesLista.push({value: role.id, description: role.authority});
      });
    });
  }

  listAreas() {
    
    this.catalogosService.listAreas().subscribe((data: any) => {
      this.areas=[]
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
    console.log(model)
    this.catalogosService.toggleUsuario(model).subscribe((data: any) => {
      console.log(data)
      Swal.fire({
        title: data.error ? 'Error!' : 'Guardado',
        text: data.mensaje,
        icon: data.error ? 'error' : 'success',
        timer: 1300,
        showConfirmButton: false
      });
      this.getData();
    })
  }

  updateUsuario(item,modal){
    //this.persona=item;
    console.log("item",item.user.roles)
 
    this.user=item.user; 
    this.persona=item
    this.areaSelected={value:item.area.id, description:item.area.nombre}
  //  this.persona.area={value:item.area.id, description:item.area.nombre}
    console.log("user",item.user)
    
    this.user.roles={value: this.user.roles[0].id,description:this.user.roles[0].authority};
    this.tituloModal="Modificar usuario";
    console.log(this.persona)
    this.modalService.open(modal, { size: 'lg', windowClass: 'modal-primary mt-12' });
    this.getData();
  }

 
}
