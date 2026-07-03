import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { HttpClient } from '@angular/common/http';
import { Docente } from '../models/docente.model';

const baseUrl =  AppSettings.API_ENDPOINT + "/docente";

@Injectable({
  providedIn: 'root',
})
export class DocenteService {

    constructor(private http:HttpClient){}

      registraDocente(formData: Docente): any{
            return this.http.post(baseUrl,formData );
      }
}
