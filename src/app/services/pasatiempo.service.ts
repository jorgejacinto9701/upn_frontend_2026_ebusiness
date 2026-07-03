import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { Usuario } from '../models/usuario.model';
import { Pasatiempo } from '../models/pasatiempo.model';


const baseUrlUtil = AppSettings.API_ENDPOINT+ '/asignacionPasatiempo';

@Injectable({
  providedIn: 'root'
})
export class PasatiempoService {

  constructor(private http:HttpClient) { }


  listaPasatiempoDeUsuario( id: string):Observable<Pasatiempo[]>{
    return this.http.get<Pasatiempo[]>(baseUrlUtil+"/listaPasatiempoPorUsuario/"+id);
  }
  registraPasatiempo( idUsuario: string, idPasatiempo: string):Observable<any>{
    const params = new HttpParams()
    .set("idUsuario", idUsuario)
    .set("idPasatiempo", idPasatiempo)
    return this.http.get<Pasatiempo[]>(baseUrlUtil+"/registraPasatiempo", {params});
  }
  eliminaPasatiempo( idUsuario: string, idPasatiempo: number):Observable<any>{
    const params = new HttpParams()
    .set("idUsuario", idUsuario)
    .set("idPasatiempo", idPasatiempo)
    return this.http.get<Pasatiempo[]>(baseUrlUtil+"/eliminaPasatiempo", {params});
  }
  
}


