import { Component } from '@angular/core';
import { AdminnavComponent } from "../../components/adminnav/adminnav.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navadmin',
  standalone: true,
  imports: [AdminnavComponent,RouterOutlet],
  templateUrl: './navadmin.component.html',
  styleUrl: './navadmin.component.css'
})
export class NavadminComponent {

}
