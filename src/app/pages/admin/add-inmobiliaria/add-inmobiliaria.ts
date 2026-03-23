import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Inmobiliaria } from '../../../core/models/entities';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { FormsModule } from '@angular/forms';
import { ImagenesService } from '../../../core/services/imagenes-service';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { Router } from '@angular/router';
import { EntidadImagen } from '../../../core/models/auxiliar';

@Component({
  selector: 'app-add-inmobiliaria',
  imports: [FormsModule],
  templateUrl: './add-inmobiliaria.html',
  styleUrl: './add-inmobiliaria.css',
})
export class AddInmobiliaria {

  @ViewChild('imagen') inputImagen:ElementRef;

  private _router:Router=inject(Router);
  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);
  private _imagenService:ImagenesService = inject(ImagenesService);

  imagenesSeleccionadas:FileList | null = null; //En esta variable guardamos provisionalmente las imagenes seleccioandas
  imagePreview= signal<string | ArrayBuffer | null>(null);
  labelElegirImagen:string = "ELEGIR LOGO";

  inmobiliaria:Inmobiliaria={

   nombre:"",
   representante:"",
   telefono:""


  }


  add():void{

    this._inmobiliariaService.addInmobiliaria(this.inmobiliaria).subscribe({
      next: (datos:InmobiliariaImagenDTO) => {
        if(this.imagenesSeleccionadas && this.imagenesSeleccionadas.length > 0){
          this.uploadImagen(datos);
        }
      },
      complete: () => {
        this._router.navigate(["/admin/list-inmobiliaria"]);
      }
    });


  }

  sustituirImagen():void{ //...cuando ya la has elegido y te arrepientes...y quieres poner otra antes de crearla


    this.inputImagen.nativeElement.value=""; //Vaciamos el input
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.value; //Vaciamos imagenesSeleccionadas
    this.imagePreview.set(null);
    this.labelElegirImagen = "ELEGIR LOGO";


  }


  onImagenSelected( event: Event ):void{
    //Guardamos provisionalmente las imagenes seleccionadas sin enviarlas al servidor
    this.imagenesSeleccionadas = this.inputImagen.nativeElement.files;
    let file = null;
    if(this.imagenesSeleccionadas && this.imagenesSeleccionadas.length > 0){
       file = this.imagenesSeleccionadas[0];
    }

    /* const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0]; */

    if (file && file.type.startsWith('image/jpeg')) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview.set(reader.result);
      };

      reader.readAsDataURL(file);//El readAsDataURL convierte la imagen en una URI base64 que puede usarse como src en un <img>. La imagen se renderiza en el thumbnail de imagen

      this.labelElegirImagen = "LOGO SELECCIONADO";

      }else {
      this.imagePreview.set(null); // Si no es una imagen reseteamos la variable
      }
    }




  uploadImagen(inmobiliaria:InmobiliariaImagenDTO):void{

    //Si se ha seleccionado la imagen procedemos a subirla físicamente al servidor. El servicio de la API se encarga de añadirla en la BBDD
    if(this.imagenesSeleccionadas && this.imagenesSeleccionadas.length > 0){

        const formData:FormData = new FormData();
        
        formData.append("file",this.imagenesSeleccionadas[0]);
        formData.append("entidadImagen", EntidadImagen.INMOBILIARIA);
        formData.append("entidadId", inmobiliaria.id.toString());
        formData.append("alt", "Logo de la inmobiliaria "+ inmobiliaria.nombre);

        this._imagenService.upload(formData).subscribe({

          next: (datos)=>{
            this._router.navigate(["/admin/list-inmobiliaria"]);
          }

        });


    }

  }


}
