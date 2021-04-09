export interface Provincias {
    cantidad:   number;
    inicio:     number;
    parametros: Parametros;
    provincias: Provincia[];
    total:      number;
}

export interface Parametros {
    campos: string[];
}

export interface Provincia {
    id:     string;
    nombre: string;
}




