import { Injectable, signal } from '@angular/core';
//import { BehaviorSubject } from 'rxjs';
import { ModalData } from '../models/auxiliar';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  
  // private modalSubject:BehaviorSubject<ModalData> = new BehaviorSubject<ModalData>({});

  // modalState$ = this.modalSubject.asObservable();

  // accionModal(datos:ModalData){//Recibe datos ModalData

  //   this.modalSubject.next(datos);//notifica el cambio a todos los subscriptores

  // }

  //El servicio controla el estado del modal, datos del modal, abrir y cerrar...
  modalData = signal<ModalData | null>(null);
  isOpen = signal<boolean>(false);

  open(data:ModalData):void{
    this.modalData.set(data);
    this.isOpen.set(true);//cambia estado y ejecuta effect
  }

  close():void{
    this.modalData.set(null);//reseteamos los datos
    this.isOpen.set(false);
  }

}
