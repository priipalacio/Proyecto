export interface Localidades {
    cantidad:    number;
    inicio:      number;
    localidades: Localidad[];
    parametros:  Parametros;
    total:       number;
}

export interface Localidad {
    categoria:        Categoria;
    centroide:        Centroide;
    departamento:     Departamento;
    id:               string;
    localidad_censal: Departamento;
    municipio:        Departamento;
    nombre:           string;
    provincia:        Departamento;
}

export enum Categoria {
    ComponenteDeLocalidadCompuesta = "Componente de localidad compuesta",
    Entidad = "Entidad",
    LocalidadSimple = "Localidad simple",
}

export interface Centroide {
    lat: number;
    lon: number;
}

export interface Departamento {
    id:     null | string;
    nombre: null | string;
}

export interface Parametros {
}

