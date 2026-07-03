import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule, } from '@angular/material/toolbar';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Tipo } from '../../models/tipo.model';
import { Pais } from '../../models/pais.model';
import { UtilService } from '../../services/util.service';
import { ProveedorService } from '../../services/proveedor-service';
import { Proveedor } from '../../models/proveedor.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-consulta-proveedor',
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
    MatTableModule,
    MatPaginatorModule,
    MenuComponent
  ],
  templateUrl: './consulta-proveedor.html',
  styleUrl: './consulta-proveedor.css',
})
export class ConsultaProveedor {
    forms: FormGroup;
    listaTipo: Tipo[] = [];
    listaPais: Pais[] = [];

    
    //Datos para la Grila
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    //Cabecera
    displayedColumns = ["codigo","nombre","dni","pais","tipo","estado"];

    constructor(private fb: FormBuilder,
                private utilService: UtilService,
                private proveedorService :ProveedorService
    ){
      this.forms = this.fb.group({
            nombre: [''],
            dni: [''],
            tipo: [''],
            pais: [''],
            estado: [''],
      });
      console.log(">>>> constructor >> 1");
    }

    ngOnInit (): void{
      console.log(">>>> ngOnInit >> 2");
      this.utilService.listaTipoProveedor().subscribe(data => this.listaTipo = data);
      this.utilService.listaPais().subscribe(data => this.listaPais = data);
    }

    consultaProveedor(){
        console.log(">>> consultaProveedor >> 3");

        this.proveedorService.consultaProvedor(
            this.forms.value.nombre,
            this.forms.value.dni,
            this.forms.value.pais,
            this.forms.value.tipo,
            this.forms.value.estado
        ).subscribe(
            data => {
                 console.log(">>> consultaProveedor >> 4" , data);

                this.dataSource = new MatTableDataSource<Proveedor>(data);
                this.dataSource.paginator = this.paginator

            }
        );
    }

    
}
