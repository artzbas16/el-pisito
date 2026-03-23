export interface FinderData{
    idTipo:number;
    idPoblacion:number;
    idOperacion:number;
}

export interface ModalData{
    titulo?:string;
    mensaje?:string;
    imagen?:string;
}

export enum EntidadImagen{
    INMUEBLE="INMUEBLE",
	BANNER="BANNER",
	BANNER_CAROUSEL="BANNER_CAROUSEL",
	INMOBILIARIA="INMOBILIARIA"
}