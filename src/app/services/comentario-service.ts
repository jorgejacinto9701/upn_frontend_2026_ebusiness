
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comentario {
  idComentario?: number;
  descripcion: string;
  idUsuario?: number;
  idProducto: number;
  nombreUsuario?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private baseUrl = 'http://localhost:8091/url/comentario';

  constructor(private http: HttpClient) {}

  listarPorProducto(idProducto: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(
      `${this.baseUrl}/producto/${idProducto}`
    );
  }

  registrar(comentario: Comentario): Observable<any> {
    return this.http.post<any>(
      this.baseUrl,
      comentario
    );
  }
}
