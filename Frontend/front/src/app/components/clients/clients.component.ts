import { Component, OnInit } from '@angular/core';
import { Client, Clients } from '../../models/clients';
import { ClientsService } from '../../services/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provincias } from '../../models/provincias';
import { Localidades } from '../../models/municipios';
// import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  provincia: Provincias;
  idCity: number;
  city: Localidades;
  clients: Client;

  FormReg: FormGroup;
  FormFiltro: FormGroup;

  id:number;

  Title="Clientes";
  TitleAccion = {
    A:"Agregar",
    B: "Eliminar",
    M: "Modificar",
    C: "Consultar",
    L: "Listado"
  }

  Accion = "L";
  submitted = false;

  Msj = {
    SD: ' No se encontraron registros...',
    RD: ' Revisar los datos ingresados...'
  };
  Notresult = true;
  

  constructor(public formBuilder: FormBuilder,
    private clientService: ClientsService) { }

  ngOnInit(): void {
    this.FormReg = this.formBuilder.group({
      idClient:[null],
      Dni:[null, [Validators.required]],
      NameCl: [null, [Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      Adress:[null,[Validators.required, Validators.maxLength(50)] ],
      Telephone:[null, [Validators.required, Validators.pattern('[0-9]{1,10}')]],
      NameProv: [null,[Validators.required]],
      City: [null,[Validators.required]],
  });

  this.GetProvincias();
  this.GetCitys();
  this.getClient();
  }

  GetProvincias(){
    this.clientService.getProvi().subscribe((res: any) => {
       this.provincia = res;
    })
    
  }
  GetCitys(){
       this.clientService.getCity().subscribe((res:any)=>{
         this.city = res;
       })
     }    

  getClient(){

    this.clientService.get().subscribe((res: Client)=>{
      this.clients = res;
    })

  }

  Add(){
    this.Accion ="A";
    this.FormReg.reset();
    this.submitted = false;
    this.FormReg.markAsTouched();
  }


  Delete(id:number){
      this.clientService.delete(id).subscribe((res:any) => {
          // this.toastr.error('Se elimino el cliente con exito','Cliente Eliminado');
          this.Accion = "L";
          this.getClient();
      })
  }

  Edit(Cli){
    this.Accion= "M";
    this.submitted = false;
   

    this.id = Cli.idClient;
    this.FormReg.patchValue({
      Dni: Cli.Dni,
      NameCl: Cli.NameCl,
      Adress: Cli.Adress,
      Telephone: Cli.Telephone,
      NameProv: Cli.NameProv,
      City: Cli.City
    })
  }

  Save(){

    const cli: any = {
      nameCl: this.FormReg.get('NameCl')?.value,
      Dni: this.FormReg.get('Dni')?.value,
      Adress: this.FormReg.get('Adress')?.value,
      NameProv: this.FormReg.get('NameProv')?.value,
      City: this.FormReg.get('City')?.value,
      Telephone: this.FormReg.get('Telephone')?.value
    }
    if(this.id == undefined){
      this.clientService.post(cli).subscribe((res:any)=>{
        // this.toastr.success('El cliente se ha agregado con exito', 'Cliente agregado');
        this.Accion = "L";
        this.getClient();
      });
    }else {
      cli.idClient = this.id;

      this.clientService.put(cli, this.id).subscribe((res:any)=>{
        this.FormReg.reset();
        this.Accion ="L";
        this.id =undefined;
        // this.toastr.info('El cliente fue modificado con exito','Cliente Actualizado');
        this.getClient();
      });

    }

  }

  Back(){
    this.Accion ="L";
    this.getClient();
  }

}
