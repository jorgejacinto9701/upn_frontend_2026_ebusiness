import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Modalidad } from '../models/modalidad.model';
import { AppSettings } from '../../app.settings';


const baseUrl =  AppSettings.API_ENDPOINT + "/modalidad";

@Injectable({
  providedIn: 'root',
})
export class ModalidadService {

  constructor(private http:HttpClient){}

  registraModalidad(formData: Modalidad): any{
        return this.http.post(baseUrl,formData );
  }
  
}
