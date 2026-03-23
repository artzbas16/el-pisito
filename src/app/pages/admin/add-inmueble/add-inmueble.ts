import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { TipoService } from '../../../core/services/tipo-service';
import { OperacionService } from '../../../core/services/operacion-service';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { Inmobiliaria, Inmueble, Operacion, Poblacion, Tipo } from '../../../core/models/entities';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { NgClass } from '@angular/common';
import { EntidadImagen } from '../../../core/models/auxiliar';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { ImagenesService } from '../../../core/services/imagenes-service';

@Component({
  selector: 'app-add-inmueble',
  imports: [FormsModule, Preloader, NgClass],
  templateUrl: './add-inmueble.html',
  styleUrl: './add-inmueble.css',
})
export class AddInmueble {

  @ViewChild('imagen') inputImagen:ElementRef;


  private _inmuebleService:InmuebleService = inject(InmuebleService);
  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _tipoService:TipoService = inject(TipoService);
  private _operacionService:OperacionService = inject(OperacionService);
  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _router:Router=inject(Router);
  private _imagenService:ImagenesService = inject(ImagenesService);

  cargaCompletada = signal<boolean>(false);

  aTipos= signal<Array<Tipo>>([]);
  aInmobiliarias= signal<Array<Inmobiliaria>>([]);
  aPoblaciones= signal<Array<Poblacion>>([]);
  aOperaciones= signal<Array<Operacion>>([]);

  imagePreview= signal<Array<string> | ArrayBuffer | null>(null);
  imagenesSeleccionadas:FileList | null = null;
  labelElegirImagen:string = "ELEGIR LOGO";

  inmueble:Inmueble = {

    amueblado:0,
    apertura:"",
    ascensor:0,
    descripcion:"",
    inmobiliaria:{
        nombre:"",
        representante:"",
        telefono:""
    }
    ,
    jardin:0,
    nombreVia:"",
    numero:"",
    balcones:0,
    banhos:0,
    habitaciones:0,
    operacion:{nombre:""},
    oportunidad:0,
    orientacion:"",
    piscina:0,
    planta:"",
    garajes:0,
    portada:0,
    precio:0,
    puerta:"",
    superficieConstruida:0,
    superficieUtil:0,
    tendedero:0,
    calefaccion:"",
    claim:"",
    trastero:0,
    via:"",
    poblacion: {
        nombre:"",
        provincia:{
          nombre: ""
        }
    }
    ,
    tipo: {
      nombre:""
    }

  }



  ngOnInit(): void {
    this.getDatos();
  }



  getDatos():void{

    forkJoin({
        tipos: this._tipoService.getTipos(),
        operaciones: this._operacionService.getOperaciones(),
        poblaciones: this._poblacionService.getPoblaciones(),
        inmobiliarias: this._inmobiliariaService.getInmobiliarias()
      })
    .subscribe({
      next: (datos) => {
        this.aTipos.set(datos.tipos);
        this.aOperaciones.set(datos.operaciones);
        this.aPoblaciones.set(datos.poblaciones);
        this.aInmobiliarias.set(datos.inmobiliarias);
        this.cargaCompletada.set(true);
      }
    });
  }


  add():void{

    this.inmueble.amueblado = Number(this.inmueble.amueblado);
    this.inmueble.ascensor = Number(this.inmueble.ascensor);
    this.inmueble.piscina = Number(this.inmueble.piscina);
    this.inmueble.trastero = Number(this.inmueble.trastero);
    this.inmueble.jardin = Number(this.inmueble.jardin);
    this.inmueble.tendedero = Number(this.inmueble.tendedero);
    this.inmueble.portada = Number(this.inmueble.portada);
    this.inmueble.oportunidad = Number(this.inmueble.oportunidad);



    this.inmueble.claim = this.inmueble.claim.toUpperCase();
    this.inmueble.nombreVia = this.inmueble.nombreVia.toUpperCase();


    this._inmuebleService.addInmueble(this.inmueble).subscribe({

      next: (datos:InmuebleImagenDTO) => {
        //if(!this.uploadImagenes(datos)){
          this._router.navigate(["/admin/list-inmueble"]);
        //}
      }

    });


  }

  sustituirImagen():void{ //...cuando ya la has elegido y te arrepientes...y quieres poner otra antes de crearla


    this.inputImagen.nativeElement.value=""; //Vaciamos el input
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.value; //Vaciamos imagenesSeleccionadas
    this.imagePreview.set(null);
    this.labelElegirImagen = "ELEGIR LOGO";


  }
/*
  onImagenSelected( event: Event ):void{
    //Guardamos provisionalmente las imagenes seleccionadas sin enviarlas al servidor
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.files;
    let file = null;
    if(this.imagenesSeleccionadas && this.imagenesSeleccionadas.length > 0){
       file = this.imagenesSeleccionadas[0];
    }

    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    //if (file && file.type.startsWith('image/jpeg')) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview.set(reader.result);
      };

      reader.readAsDataURL(file);//El readAsDataURL convierte la imagen en una URI base64 que puede usarse como src en un <img>. La imagen se renderiza en el thumbnail de imagen

      this.labelElegirImagen = "IMAGENES SELECCIONADAS";

      }else {
      this.imagePreview.set(null); // Si no es una imagen reseteamos la variable
      }
  }
  */
    uploadImagenes(inmueble:InmuebleImagenDTO):boolean{
    
        //Si se ha seleccionado la imagen procedemos a subirla físicamente al servidor. El servicio de la API se encarga de añadirla en la BBDD
        if(this.imagenesSeleccionadas && this.imagenesSeleccionadas.length > 0){
            for (let imagenSeleccionada of this.imagenesSeleccionadas){
              const formData:FormData = new FormData();
              
              formData.append("file",imagenSeleccionada);
              formData.append("entidadImagen", EntidadImagen.INMUEBLE);
              formData.append("entidadId", inmueble.id.toString());
              formData.append("alt", `Imagen ${inmueble.id} del inmueble`);
      
              this._imagenService.upload(formData).subscribe({
      
                next: (datos)=>{
                  //this._router.navigate(["/admin/list-inmueble"]);
                }
      
              });
            }
            return true;
    
        }

        return false;
    
      }

}
