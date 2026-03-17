import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoImagenBanner]',
})
export class NoImagenBanner {
  //ALLA DONDE COLOQUE ESTA DIRECTIVA EL "nodoDOM" (LA ETIQUETA HTML)
  //SERA LA ETIQUETA REFERENCIADA
  private nodoDOM:ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  @HostListener("error")
  onError():void{
    this.renderer.setAttribute(this.nodoDOM.nativeElement, "src", "assets/img/no-banner.jpg");
    
  }

}
