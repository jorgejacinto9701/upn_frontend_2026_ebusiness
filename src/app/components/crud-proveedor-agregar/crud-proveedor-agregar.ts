import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule, } from '@angular/material/toolbar';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { Tipo } from '../../models/tipo.model';
import { Pais } from '../../models/pais.model';
import { UtilService } from '../../services/util.service';
import { ProveedorService } from '../../services/proveedor-service';
import { Proveedor } from '../../models/proveedor.model';
import { MatDialogClose } from "@angular/material/dialog";

@Component({
  selector: 'app-crud-proveedor-agregar',
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
    MatDialogClose
],
  templateUrl: './crud-proveedor-agregar.html',
  styleUrl: './crud-proveedor-agregar.css'
})
export class CrudProveedorAgregar implements OnInit {

    forms: FormGroup;
    listaTipo: Tipo[] = [];
    listaPais: Pais[] = [];

    constructor(private fb: FormBuilder,
                private utilService: UtilService,
                private proveedorService :ProveedorService    ) {
      this.forms = this.fb.group({
            nombre: [''],
            dni: [''],
            tipo: ['-1'],
            pais: ['-1'],
      });
    }

    ngOnInit(): void {
      this.utilService.listaTipoProveedor().subscribe(data => {
        setTimeout(() => this.listaTipo = data);
      });
      this.utilService.listaPais().subscribe(data => {
        setTimeout(() => this.listaPais = data);
      });
    }

    registrarProveedor(){
      console.log(this.forms.value);
      console.log(">>> Nombre ==> " + this.forms.value.nombre);
      console.log(">>> dni ==> " + this.forms.value.dni);
      console.log(">>> tipo ==> " + this.forms.value.tipo);
      console.log(">>> pais ==> " + this.forms.value.pais);

      
            let objProveedor : Proveedor = {
                nombre:this.forms.value.nombre,
                dni:this.forms.value.dni,
                pais: {
                    idPais:this.forms.value.pais
                },
                tipo: {
                    idTipo:this.forms.value.tipo
                }
            };
            
          console.log("Datos a registrar:", objProveedor);
          this.proveedorService.registraProveedor(objProveedor).subscribe({
            next: (response:any) => {
              Swal.fire("Éxito", response.mensaje, "success");
            },
            error: (error:any) => {
              console.error("Error al registrar el Proveedor", error);
              Swal.fire("Error", "No se pudo registrar el Proveedor", "error");
            }
          });
    }
}
