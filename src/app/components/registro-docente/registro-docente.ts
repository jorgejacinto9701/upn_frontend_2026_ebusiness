import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule, } from '@angular/material/toolbar';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { Modalidad } from '../../models/modalidad.model';
import { ModalidadService } from '../../services/modalidad-service';
import { Deporte } from '../../models/deporte.model';
import { DeporteService } from '../../services/deporte-service';
import { MenuComponent } from '../../menu/menu.component';
import { ProveedorService } from '../../services/proveedor-service';
import { Ubigeo } from '../../models/ubigeo.model';
import { UbigeoService } from '../../services/ubigeo-service';
import { DocenteService } from '../../services/docente-service';
import { Docente } from '../../models/docente.model';

@Component({
  selector: 'app-registro-docente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MenuComponent
  ],
  templateUrl: './registro-docente.html',
  styleUrl: './registro-docente.css',
})
export class RegistroDocente {

  forms: FormGroup ;
  listaDepartamento: string[] = [];
  listaProvincia: string[] = [];
  listaDistrito: Ubigeo[] = [];

  constructor(private fb:FormBuilder,
              private ubigeoService: UbigeoService,
              private docenteService: DocenteService
            ){

    this.forms = this.fb.group({
        nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]{2,20}$/)] ],
        departamento: ['', [Validators.required]],
        provincia: ['', [Validators.required]],
        distrito: ['', [Validators.required]],
    });

     this.ubigeoService.listaDepartamento().subscribe({
        next: (data: any) => {
          this.listaDepartamento = data;
          console.log("Lista de departamentos:", this.listaDepartamento);
        }
    });

  }

registrar(){
      console.log(">>> registro de Docente");
      console.log(">>> Nombres ==> " + this.forms.value.nombre);
      console.log(">>> Departamento ==> " + this.forms.value.departamento);
      console.log(">>> Provincia ==> " + this.forms.value.provincia);
      console.log(">>> Distrito ==> " + this.forms.value.distrito);

      
      if (this.forms.invalid) {
        this.forms.markAllAsTouched();
        return;
      }

      let objDocente : Docente = {
          nombres:this.forms.value.nombre,
          ubigeo: {
              idUbigeo:this.forms.value.distrito
          }
      };
      
    console.log("Datos a registrar:", objDocente);
    this.docenteService.registraDocente(objDocente).subscribe({
      next: (response:any) => {
        console.log("Docente registrada exitosamente", response);
        Swal.fire("Éxito", response.mensaje, "success");
        this.forms.reset();
      },
      error: (error:any) => {
        console.error("Error al registrar la Docente", error);
        Swal.fire("Error", "No se pudo registrar la Docente", "error");
      }
    });
  }

  cargaProvincia(){
    let dep = this.forms.value.departamento;
    this.ubigeoService.listaProvincia(dep).subscribe({
        next: (data: any) => {
          this.listaProvincia = data;
          console.log("Lista de listaProvincia:", this.listaProvincia);
        }
    });
  }

  cargaDistrito(){
    let dep = this.forms.value.departamento;
    let prov = this.forms.value.provincia;
    this.ubigeoService.listaDistrito(dep, prov).subscribe({
        next: (data: any) => {
          this.listaDistrito = data;
          console.log("Lista de listaDistrito:", this.listaDistrito);
        }
    });
  }
}
