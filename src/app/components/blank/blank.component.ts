import { Component } from '@angular/core';
import { AuthService } from '../../core/serves/aout.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {
constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/navout/login']);
    }).catch(error => {
      console.error('خطأ أثناء تسجيل الخروج:', error);
    });
  }
}
