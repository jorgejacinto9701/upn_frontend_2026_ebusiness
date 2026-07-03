import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistroModalidad } from './components/registro-modalidad/registro-modalidad';
import { RegistroProveedor } from './components/registro-proveedor/registro-proveedor';
import { CatalogoProducto } from './components/catalogo-producto/catalogo-producto';
import { CatalogoProductoDetalle } from './components/catalogo-producto-detalle/catalogo-producto-detalle';
import { RegistroDocente } from './components/registro-docente/registro-docente';
import { CrudProveedor } from './components/crud-proveedor/crud-proveedor';
import { ConsultaProveedor } from './components/consulta-proveedor/consulta-proveedor';
import { ReporteProveedor } from './components/reporte-proveedor/reporte-proveedor';

export const routes: Routes = [
  //login
  { path: '', component: CatalogoProducto },
  { path: 'login', component: LoginComponent },
  
  //Registro
  { path: 'agregarModalidad', component: RegistroModalidad },
  { path: 'agregarProveedor', component: RegistroProveedor },
  
  //Consulta
  { path: 'consultarProveedor', component: ConsultaProveedor },

  //CRUD
  { path: 'crudProveedor', component: CrudProveedor },
  
  //Reporte
  { path: 'reporteProveedor', component: ReporteProveedor },

  // Catalogo
  { path: 'catalogoProducto', component: CatalogoProducto },
  { path: 'detalleProducto/:id', component: CatalogoProductoDetalle },

  //Docente
  { path: 'registroDocente', component: RegistroDocente }
];