import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BlankComponent } from "../../components/blank/blank.component";

@Component({
  selector: 'app-navblank',
  standalone: true,
  imports: [RouterOutlet, NavblankComponent, BlankComponent],
  templateUrl: './navblank.component.html',
  styleUrl: './navblank.component.css'
})
export class NavblankComponent {

}
