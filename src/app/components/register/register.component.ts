import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/serves/aout.service'; // عدل المسار حسب مشروعك
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMsg = '';

    // تأكد من تطابق كلمة المرور وتأكيدها
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'كلمتا المرور غير متطابقتين';
      return;
    }

    // تحقق إضافي للحقول (ممكن تفعله حسب الحاجة)
    if (this.fullName.length < 2 || this.fullName.length > 60) {
      this.errorMsg = 'الاسم يجب أن يكون بين حرفين و60 حرفًا';
      return;
    }

    // تحقق من نمط الباسورد (لو حبيت تتأكد هنا أيضاً)
    const passwordRegex = /^[A-Z]{1}[0-9]{6}$/;
    if (!passwordRegex.test(this.password)) {
      this.errorMsg = 'كلمة المرور يجب أن تبدأ بحرف كبير متبوع بـ 6 أرقام فقط';
      return;
    }

    // التسجيل في Firebase مع الاسم، الإيميل، والباسورد فقط
    this.authService.register(this.email, this.password, this.fullName)
      .then(() => {
        this.router.navigate(['/navout/login']);
      })
      .catch(err => {
        this.errorMsg = err.message || 'حدث خطأ أثناء التسجيل';
      });
  }
}
