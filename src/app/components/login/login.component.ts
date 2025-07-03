import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/serves/aout.service'; // عدل المسار حسب مشروعك

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'يرجى إدخال البريد الإلكتروني وكلمة المرور';
      return;
    }

    try {
      await this.authService.loginms(this.email, this.password);
      // تسجيل دخول ناجح — توجيه لصفحة الإدارة
this.router.navigate(['/Navblank', 'ke1']);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.errorMsg = 'البريد الإلكتروني غير موجود';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMsg = 'كلمة المرور غير صحيحة';
      } else {
        this.errorMsg = 'حدث خطأ أثناء محاولة تسجيل الدخول';
      }
    }
  }
}
