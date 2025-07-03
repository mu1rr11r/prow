import { Component } from '@angular/core';
import { OutaComponent } from "../../components/outa/outa.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navout',
  standalone: true,
  imports: [RouterOutlet, OutaComponent, NavoutComponent],
  templateUrl: './navout.component.html',
  styleUrl: './navout.component.css'
})
export class NavoutComponent {

}
