import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {
  constructor(private router: Router) {}

  logout() {
    // هنا تقدر تضيف تنظيف بيانات المستخدم مثل مسح التوكن أو بيانات ال session
    // مثال: localStorage.removeItem('token');

    // ثم توجه المستخدم لصفحة تسجيل الدخول (أو الصفحة الرئيسية)
    this.router.navigate(['/navout/login']);
  }
}
