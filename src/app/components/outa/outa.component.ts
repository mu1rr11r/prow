import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavoutComponent } from '../../layouts/navout/navout.component';

@Component({
  selector: 'app-outa',
  standalone: true,
  imports: [RouterOutlet,OutaComponent,NavoutComponent,RouterLinkActive,RouterLink],
  templateUrl: './outa.component.html',
  styleUrl: './outa.component.css'
})
export class OutaComponent {

}
