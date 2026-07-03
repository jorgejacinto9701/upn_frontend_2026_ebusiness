import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';

const baseUrl =  AppSettings.API_ENDPOINT + "/util";

@Injectable({
  providedIn: 'root',
})
export class DeporteService {

  constructor(private http: HttpClient){ }

  listaDeporte() {
      return this.http.get(baseUrl+"/listaDeporte");
  }
}
