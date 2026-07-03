import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";

@Component({
  selector: 'app-crud-proveedor-actualizar',
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
  templateUrl: './crud-proveedor-actualizar.html',
  styleUrl: './crud-proveedor-actualizar.css'
})
export class CrudProveedorActualizar implements OnInit{

    forms: FormGroup;
    listaTipo: Tipo[] = [];
    listaPais: Pais[] = [];

    constructor(private fb: FormBuilder,
                private utilService: UtilService,
                private proveedorService: ProveedorService,
                @Inject(MAT_DIALOG_DATA) public data: Proveedor) {

      this.forms = this.fb.group({
        nombre: [''],
        dni: [''],
        tipo: [''],
        pais: [''],
        estado: ['']
      });

    }

    ngOnInit(): void {
        this.utilService.listaTipoProveedor().subscribe(data => {
            this.listaTipo = data;
            this.setFormValues(); // Llamar después de cargar los datos
        });
        
        this.utilService.listaPais().subscribe(data => {
            this.listaPais = data;
            this.setFormValues(); // Llamar después de cargar los datos
        });
    }

    private setFormValues(): void {
      if (!this.data) return;
      
      // Log para depuración
      console.log('Datos recibidos en actualizar:', this.data);
      console.log('Tipo ID:', this.data.tipo?.idTipo);
      console.log('País ID:', this.data.pais?.idPais);
      console.log('Estado:', this.data.estado);
      
      // Asegurar que el estado sea un string para el select
      const estadoValue = this.data.estado !== undefined && this.data.estado !== null 
        ? String(this.data.estado) 
        : '';
      
      this.forms.patchValue({
        nombre: this.data.nombre || '',
        dni: this.data.dni || '',
        tipo: this.data.tipo?.idTipo || '',
        pais: this.data.pais?.idPais || '',
        estado: estadoValue
      });
      
      // Log para verificar que se establecieron los valores
      console.log('Valores del formulario después de patchValue:', this.forms.value);
    }

    actualizarProveedor(){
      console.log(this.forms.value);
      console.log(">>> Nombre ==> " + this.forms.value.nombre);
      console.log(">>> dni ==> " + this.forms.value.dni);
      console.log(">>> tipo ==> " + this.forms.value.tipo);
      console.log(">>> pais ==> " + this.forms.value.pais);
      console.log(">>> estado ==> " + this.forms.value.estado);

      
            let objProveedor : Proveedor = {
                idProveedor: this.data?.idProveedor,
                nombre:this.forms.value.nombre,
                dni:this.forms.value.dni,
                pais: {
                    idPais:this.forms.value.pais
                },
                tipo: {
                    idTipo:this.forms.value.tipo
                },
                estado: this.forms.value.estado

            };
            
          console.log("Datos a registrar:", objProveedor);
          this.proveedorService.actualizarProveedor(objProveedor).subscribe({
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
