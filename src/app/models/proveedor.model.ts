import { Pais } from "./pais.model";
import { Tipo } from "./tipo.model";

export class Proveedor {
    idProveedor ?: number;
    nombre ?: string;
    dni ?: string;
    estado ?: number;
    tipo ?: Tipo;
    pais ?: Pais;
}
