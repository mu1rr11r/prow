import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Database, ref, set } from '@angular/fire/database';

interface StudentAttendance {
  name: string;
  present: boolean;
  absent: boolean;
}

@Component({
  selector: 'app-ke2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ke2.component.html',
  styleUrls: ['./ke2.component.css'],
})
export class Ke2Component implements OnInit {
  students: StudentAttendance[] = [];
  classroomNumber: string = '2';
  loading: boolean = false;
  today: Date = new Date();
  attendanceDate: string = '';

  constructor(private db: Database) {}

  ngOnInit() {
    this.today = new Date();
    this.attendanceDate = this.today.toISOString().substring(0, 10); // yyyy-mm-dd
    this.loadStudents();
  }

  loadStudents() {
    // مثال لملء الطلاب مبدئيًا (يمكنك تعديلها لجلب بيانات حقيقية من مكان آخر)
    this.students = [
      { name: 'أحمد علي', present: false, absent: false },
      { name: 'محمود محمد', present: false, absent: false },
            { name: 'محمود محمد', present: false, absent: false },
      { name: 'ابراهيم محمد', present: false, absent: false },
      { name: 'عمر محمد', present: false, absent: false },
      { name: 'خالد علي ', present: false, absent: false },
      { name: 'علي  محمد', present: false, absent: false },
      { name: 'مصعب محمد', present: false, absent: false },
      { name: 'عبدالرحمن محمد', present: false, absent: false },
      { name: 'امير حمزه', present: false, absent: false },
      { name: 'محمد محمد', present: false, absent: false },
      { name: 'علي محمد', present: false, absent: false },

    ];
  }

  onAttendanceChange(student: StudentAttendance, isPresentChecked: boolean) {
    if (isPresentChecked) {
      student.absent = !student.present;
    } else {
      student.present = !student.absent;
    }
  }

  async saveData() {
    if (this.students.length === 0) {
      alert('لا يوجد طلاب للحفظ.');
      return;
    }

    if (!this.attendanceDate) {
      alert('يرجى اختيار تاريخ الحضور.');
      return;
    }

    this.loading = true;

    try {
      const attendanceRef = ref(
        this.db,
        `classrooms/classroom-${this.classroomNumber}/attendanceLogs/${this.attendanceDate}`
      );

      const attendanceData = {
        attendanceDate: this.attendanceDate,
        attendance: this.students.map((s) => ({
          name: s.name,
          present: s.present,
          absent: s.absent,
        })),
      };

      await set(attendanceRef, attendanceData);

      alert('✅ تم حفظ بيانات الحضور بنجاح في Realtime Database.');
    } catch (error) {
      console.error('❌ خطأ أثناء الحفظ:', error);
      alert('❌ حدث خطأ أثناء حفظ البيانات.');
    }

    this.loading = false;
  }
}
