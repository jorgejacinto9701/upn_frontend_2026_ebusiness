import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { Proveedor } from '../models/proveedor.model';
import { Observable } from 'rxjs';
import { ProveedorPais } from '../models/proveedorPais.model';
import { ProveedorEstado } from '../models/proveedorEstado.model';
import { ProveedorTipo } from '../models/ProveedorTipo.model';
import { ProveedorMes } from '../models/ProveedorMes.model';


const baseUrl =  AppSettings.API_ENDPOINT + "/proveedor";

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {

  constructor(private http:HttpClient){}

  registraProveedor(formData: Proveedor): any{
        return this.http.post(baseUrl,formData );
  }
  
  consultaProvedor(nombre:string,dni:string,
      pais:string,tipo:string,estado:string):Observable<Proveedor[]>{
        const params = new HttpParams()
        .set('nombre', nombre)
        .set('dni', dni)
        .set('pais', pais)
        .set('tipo', tipo)
        .set('estado', estado);
      return this.http.get<Proveedor[]>(baseUrl+"/consultaDinamica",{params});
  }

  eliminarProveedor(id:number):Observable<any>{
    return this.http.delete(baseUrl+"/eliminaPorId/"+id);
  }

  actualizarProveedor(data:Proveedor):Observable<any>{
    return this.http.put(baseUrl+"/actualizaProveedor", data);
  }

  // ==========================
  // MÉTODOS PARA LOS GRÁFICOS
  // ==========================

  cantidadPorPais(): Observable<ProveedorPais[]> {
    return this.http.get<ProveedorPais[]>(baseUrl + "/grafico/pais");
  }

  cantidadPorEstado(): Observable<ProveedorEstado[]> {
    return this.http.get<ProveedorEstado[]>(baseUrl + "/grafico/estado");
  }

  cantidadPorTipo(): Observable<ProveedorTipo[]> {
    return this.http.get<ProveedorTipo[]>(baseUrl + "/grafico/tipo");
  }

  cantidadPorMes(): Observable<ProveedorMes[]> {
    return this.http.get<ProveedorMes[]>(baseUrl + "/grafico/mes");
  }
}
