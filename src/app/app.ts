import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { MenuPrincipal } from "./shared/components/menu-principal/menu-principal";
import { Footer } from "./shared/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MenuPrincipal, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('el-pisito');
}
