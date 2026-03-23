import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { ImagenesService } from '../../../core/services/imagenes-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmobiliaria } from '../../../core/models/entities';
import { map, of, Subscription, switchMap } from 'rxjs';
import { URL_MEDIA } from '../../../core/enviroments/globals';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { FormsModule } from '@angular/forms';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { EntidadImagen } from '../../../core/models/auxiliar';

@Component({
  selector: 'app-edit-inmobiliaria',
  imports: [FormsModule, Preloader],
  templateUrl: './edit-inmobiliaria.html',
  styleUrl: './edit-inmobiliaria.css',
})
export class EditInmobiliaria {
  @ViewChild('imagen') inputImagen:ElementRef;

  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _imagenService:ImagenesService = inject(ImagenesService);
  private _route:ActivatedRoute = inject(ActivatedRoute);
  private _router:Router=inject(Router);

  cargaCompletada = signal<boolean>(false);

  imagenesSeleccionadas:FileList; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview: string | ArrayBuffer | null = null;
  labelElegirImagen:string = "ELEGIR LOGO";
  hayImagen = signal<boolean>(false);
  id:number;
  idImagen:number|undefined;
  inmobiliaria:InmobiliariaImagenDTO;
  suscripcion:Subscription;
  url:string = URL_MEDIA;
  inmobiliariaNueva:Inmobiliaria;

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {

    this.getDatos();
  }


  getDatos():void{

    this.suscripcion = this._route.paramMap.pipe(
              map(params => this.id= Number(params.get("id"))),
              switchMap( id => this._inmobiliariaService.getInmobiliaria(id))
        
            ).subscribe({
              next: (datos:InmobiliariaImagenDTO) => {
                this.inmobiliaria = datos;
                this.idImagen = datos.imagenes[0]?.id;

                if(this.inmobiliaria.imagenes){
                  this.hayImagen.set(true);
                }else{
                  this.hayImagen.set(false);
                }
                this.cargaCompletada.set(true);
              }
        
            });
  }



  edit():void{
     //CONVERTIMOS LOS BOOLEAN DEinmobiliariaNueva:Inmobiliaria LOS CHECKS EN NUMBER
    this.inmobiliaria.activo = Number(this.inmobiliaria.activo);

    this.inmobiliariaNueva= {
      id: this.inmobiliaria.id,
      nombre: this.inmobiliaria.nombre,
      representante: this.inmobiliaria.representante,
      telefono: this.inmobiliaria.telefono,
      activo: this.inmobiliaria.activo,
    };

    this._inmobiliariaService.editarInmobiliaria(this.inmobiliaria).pipe(

      switchMap((datos: InmobiliariaImagenDTO) => {

        // Si hay imagen → subirla
        if (this.imagenesSeleccionadas && this.imagenesSeleccionadas[0]) {
          return this.uploadImagen$(datos); // devolvemos observable
        }

        // Si no hay imagen → continuar flujo
        return [datos]; // observable simple
      })

    ).subscribe({
      next: () => {
        this._router.navigate(["/admin/list-inmobiliaria"]);
      }
    });

  }





  eliminarImagen():void{

    this.hayImagen.set(false);

    //Si elegimos sustituir la imagen debemos eliminarla para que la BBDD (relación OneToOne )
    //y la carpeta del servidor de archivos físicos no se llene de basura.
    //En la API deberemos romper la relación entre la inmobiliaria y el logo (ver método deleteImagen).
    //Pero tenemos que tener en cuenta que el objeto Inmobiliaria que tenemos en cliente (inmobiliaria)
    //lo hemos recibido con el logo actual o si no la tiene con null. Debemos "eliminar" también la imagen en cliente
    // (si la hubiera) para que al hacer una modificación no haya problemas de integridad relacional.
    //this.inmobiliaria.imagenes = ;

    if(this.idImagen){

      this._imagenService.deleteImagen(this.idImagen).subscribe({

        next:(datos) => {this.sustituirImagen();}
      });

    }

  }


  sustituirImagen():void{


    this.inputImagen.nativeElement.value=""; //Vaciamos el input
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.value; //Vaciamos imagenesSeleccionadas
    this.imagePreview = null;
    this.labelElegirImagen = "ELEGIR LOGO";


  }


  onImagenSelected( event: Event ):void{
    //Guardamos provisionalmente las imagenes seleccionadas sin enviarlas al servidor
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.files;
    const file = this.imagenesSeleccionadas[0];

    /* const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0]; */

    if (file && file.type.startsWith('image/jpeg')) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);//El readAsDataURL convierte la imagen en una URI base64 que puede usarse como src en un <img>.
      this.labelElegirImagen = "LOGO SELECCIONADO";

    }else {
      this.imagePreview = null; // Si no es una imagen reseteamos la variable
    }

  }




  uploadImagen$(inmobiliaria:InmobiliariaImagenDTO){
  
      //Si se ha seleccionado la imagen procedemos a subirla físicamente al servidor. El servicio de la API se encarga de añadirla en la BBDD
      
  
          const formData:FormData = new FormData();
  
          formData.append("file",this.imagenesSeleccionadas[0]);
          formData.append("entidadImagen", EntidadImagen.INMOBILIARIA);
          formData.append("entidadId", inmobiliaria.id.toString());
          formData.append("alt", "Logo de la inmobiliaria "+ inmobiliaria.nombre);
  
          return this._imagenService.upload(formData);
  
  
      
  
    }

}
