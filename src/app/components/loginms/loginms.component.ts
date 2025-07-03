import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/serves/aout.service'; // عدل المسار حسب مشروعك

@Component({
  selector: 'app-loginms',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './loginms.component.html',
  styleUrls: ['./loginms.component.css']
})
export class LoginmsComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async navigate() {
    this.errorMsg = '';

    if (!this.email) {
      this.errorMsg = 'يرجى إدخال البريد الإلكتروني';
      return;
    }
    if (!this.password) {
      this.errorMsg = 'يرجى إدخال كلمة المرور';
      return;
    }

    try {
      // تسجيل الدخول باستخدام Firebase Auth
      await this.authService.loginms(this.email, this.password);

      // إذا نجح التسجيل توجيه المستخدم للصفحة المطلوبة
      this.router.navigate(['/Navadmin/deshborde']);

    } catch (error: any) {
      // رسائل خطأ مناسبة
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
