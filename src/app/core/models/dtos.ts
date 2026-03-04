import { Operacion, Poblacion, Tipo } from "./entities";

export interface Credenciales { //JWTRequest en servidor
    username: string;
    password: string;
}

export interface CredencialesRespuesta { //JWTResponse en servidor
    mensaje: any;
}

export interface ImagenDTO { //ImagenDTO en el servidor
    id: number;
    url: string;
    altImagen: string;
    entidadId: number;
}

export interface BannerIdDTO{

    id:number;

}

export interface BannerImagenDTO { //BannerImagenDTO en el servidor
    id: number;
    titular: string;
    claim: string;
    link: string;
    activo?: number;
    imagenes: Array<ImagenDTO>;
}

export interface BannerCarouselIdDTO{
    id: number;
}

export interface BannerCarouselImagenDTO { //BannerCarouselImagenDTO en el servidor
    id: number;
    titular: string;
    claim: string;
    activo: number;
    imagenes: Array<ImagenDTO>;
}

export interface ErrorResponseDTO { //ErrorResponseDTO en el servidor
    timestamp: Date;
    status: number;
    error: string;
    mensaje: string;
    message: string;
    path: string;
}

export interface InmobiliariaIdDTO{
    id: number;
}

export interface InmobiliariaImagenDTO { //InmobiliariaImagenDTO en el servidor
    id: number;
    nombre: string;
    telefono: string;
    representante: string;
    activo: boolean;
    imagenes: Array<ImagenDTO>;
}

export interface InmuebleIdDTO{
    id: number;
}

export interface InmuebleImagenDTO { //InmuebleImagenDTO en el servidor
    id: number;
    via: string;
    claim: string;
    numeroVia: string;
    numero:String;
    planta: string;
    puerta: string;
    apertura: string;
    orientacion: string;
    superficieUtil: number;
    superficieConstruida: number;
    precio: number;
    habitaciones: number;
    banhos: number;
    descripcion: string;
    calefaccion: string;
    amueblado: number;
    balcones: number;
    garajes: number;
    piscina:number;
    trastero:number;
    ascensor:number;
    jardin:number;
    tendedero:number;
    portada:number;
    oportunidad:number;
    tipo: Tipo;
    operacion: Operacion;
    poblacion: Poblacion;
    inmobiliaria: InmobiliariaIdDTO;
    activo: number;
    imagenes: Array<ImagenDTO>;
}

export interface UsuarioDTO { //UsuarioDTO en el servidor
    id: number;
    nombre: string;
    rol: string;
    activo: number;
}

