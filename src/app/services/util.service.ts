import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { Usuario } from '../models/usuario.model';
import { Pasatiempo } from '../models/pasatiempo.model';
import { Pais } from '../models/pais.model';
import { Tipo } from '../models/tipo.model';


const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { }

  listaUsuario():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(baseUrlUtil+"/listaUsuario");
  }

  listaPasatiempo():Observable<Pasatiempo[]>{
    return this.http.get<Pasatiempo[]>(baseUrlUtil+"/listaPasatiempo");
  }
  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil+"/listaPais");
  }
  listaTipoProveedor():Observable<Tipo[]>{
    return this.http.get<Tipo[]>(baseUrlUtil+"/listaTiposDeProveedor");
  }

  
}


