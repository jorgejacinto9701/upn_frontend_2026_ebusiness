import { Deporte } from "./deporte.model";

export class Modalidad {
    idModalidad ?: number;
    nombre ?: string
    numhombres ?: number;
    nummujeres ?: number;
    edadmaxima ?: number;
    edadminima ?: number;
    sede ?: string;
    deporte  ?: Deporte ;
}
