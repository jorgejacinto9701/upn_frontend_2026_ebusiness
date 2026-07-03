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


@Component({
  selector: 'app-registro-modalidad',
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
  templateUrl: './registro-modalidad.html',
  styleUrl: './registro-modalidad.css',
})
export class RegistroModalidad {

  forms: FormGroup;
  listaDeporte: Deporte[] = [];

  constructor(private fb:FormBuilder,
              private deporteService: DeporteService,
              private modalidadService: ModalidadService
            ){

    this.deporteService.listaDeporte().subscribe({
        next: (data: any) => {
          this.listaDeporte = data;
          console.log("Lista de deportes obtenida 2:", this.listaDeporte);
        },
        error: (error) => {
          console.error("Error al obtener la lista de deportes", error);
        }
    });

    this.forms = this.fb.group({
        nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]{2,20}$/)] ],
        numHombres: ['', [Validators.required, Validators.pattern(/^[1-5]$/)]],
        numMujeres: ['', [Validators.required, Validators.pattern(/^[1-5]$/)]],
        edadMinima: ['', [Validators.required, Validators.pattern(/^(1)[8-9]|[2-6][0-9]$/)]],
        edadMaxima: ['', [Validators.required, Validators.pattern(/^(1)[8-9]|[2-6][0-9]$/)]],
        sede: ['', [Validators.required]],
        deporte: ['', [Validators.required]],
    });

  }

  registrar(){
      console.log(">>> registro de Modalidad");
      console.log(">>> Nombre ==> " + this.forms.value.nombre);
      console.log(">>> numHombres ==> " + this.forms.value.numHombres);
      console.log(">>> numMujeres ==> " + this.forms.value.numMujeres);
      console.log(">>> edadMaxima ==> " + this.forms.value.edadMaxima);
      console.log(">>> edadMinima ==> " + this.forms.value.edadMinima);
      console.log(">>> sede ==> " + this.forms.value.sede);
      console.log(">>> deporte ==> " + this.forms.value.deporte);
      
      if (this.forms.invalid) {
        this.forms.markAllAsTouched();
        return;
      }

      let objModalidad : Modalidad = {
          nombre:this.forms.value.nombre,
          numhombres:this.forms.value.numHombres,
          nummujeres:this.forms.value.numMujeres,
          edadmaxima:this.forms.value.edadMaxima,
          edadminima:this.forms.value.edadMinima,
          sede:this.forms.value.sede,
          deporte: {
              idDeporte:this.forms.value.deporte
          }
      };
      
    console.log("Datos a registrar:", objModalidad);
    this.modalidadService.registraModalidad(objModalidad).subscribe({
      next: (response:any) => {
        console.log("Modalidad registrada exitosamente", response);
        Swal.fire("Éxito", "La modalidad se ha registrado correctamente", "success");
        this.forms.reset();
      },
      error: (error:any) => {
        console.error("Error al registrar la modalidad", error);
        Swal.fire("Error", "No se pudo registrar la modalidad", "error");
      }
    });
  }

 
}
