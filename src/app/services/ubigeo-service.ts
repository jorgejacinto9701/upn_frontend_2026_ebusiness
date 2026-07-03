import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ubigeo } from '../models/ubigeo.model';

const baseUrl =  AppSettings.API_ENDPOINT + "/ubigeo";

@Injectable({
  providedIn: 'root',
})
export class UbigeoService {

  constructor(private http:HttpClient){}

  listaDepartamento():Observable<string[]>{
        return this.http.get<string[]>(baseUrl + "/listaDepartamento");
  }

  listaProvincia(dep : string):Observable<string[]>{
        return this.http.get<string[]>(baseUrl + "/listaProvincia/"+ dep );
  }

  listaDistrito(dep : string,dis : string):Observable<Ubigeo[]>{
        return this.http.get<Ubigeo[]>(baseUrl + "/listaDistrito/"+ dep +"/" + dis);
  }

}
