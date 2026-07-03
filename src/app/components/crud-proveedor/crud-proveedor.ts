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
import { MatDialog } from '@angular/material/dialog';
import { CrudProveedorAgregar } from '../crud-proveedor-agregar/crud-proveedor-agregar';
import { CrudProveedorActualizar } from '../crud-proveedor-actualizar/crud-proveedor-actualizar';

@Component({
  selector: 'app-crud-proveedor',
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
    MenuComponent,
    MatIcon
  ],
  templateUrl: './crud-proveedor.html',
  styleUrl: './crud-proveedor.css',
})
export class CrudProveedor {
    forms: FormGroup;
    listaTipo: Tipo[] = [];
    listaPais: Pais[] = [];

    
    //Datos para la Grila
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    //Cabecera
    displayedColumns = ["codigo","nombre","dni","pais","tipo","estado","acciones"];

    constructor(private fb: FormBuilder,
                private utilService: UtilService,
                private proveedorService :ProveedorService,
                private dialogService: MatDialog, 
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
      this.consultaProveedor();
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

    eliminaProvedor(obj: Proveedor){
       Swal.fire({
        title: "¿Estás Seguro?",
        text: "Luego de eliminar no se podrá revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, ¡elimina!"
      }).then((result) => {
        if (result.isConfirmed){
              this.proveedorService.eliminarProveedor(obj.idProveedor || 0).subscribe(
                  data => {
                    this.consultaProveedor();
                    Swal.fire({title: "Eliminación", text: data.mensaje ,icon: "success" });

                  }
              );

              
         }
      });
    }

    updateEstado(obj:Proveedor) {
      console.log(">>> updateEstado [ini]");
      console.log("obj: ", obj);
      obj.estado = obj.estado == 1 ? 0 : 1;
      this.proveedorService.actualizarProveedor(obj).subscribe(
          x => {
              this.consultaProveedor();
          }
      );
       console.log(">>> updateEstado [fin]");
  }

  
  openDialogRegistrar() {
      console.log(">>> openDialogRegistrar [ini]");
      const dialogRef = this.dialogService.open(CrudProveedorAgregar);
      dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed with result:', result);
              this.consultaProveedor();
      });
      console.log(">>> openDialogRegistrar [fin]");
    }

  openDialogActualizar(obj: Proveedor) {
      console.log(">>> openDialogActualizar [ini]");
      console.log("obj: ", obj);
      const dialogRef = this.dialogService.open(CrudProveedorActualizar, {data: obj} );
      dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog closed with result:', result);
          this.consultaProveedor();
      });
      console.log(">>> openDialogActualizar [fin]");
    }
}
