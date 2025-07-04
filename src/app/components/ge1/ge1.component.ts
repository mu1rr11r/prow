import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Database, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-ge1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ge1.component.html',
  styleUrls: ['./ge1.component.css'],
})
export class Ge1Component implements OnInit {
  presentStudents: string[] = [];
  absentStudents: string[] = [];
  attendanceDate: string = '';
  loading: boolean = false;
  error: string = '';
  classroomNumber: string = '2';

  days: number[] = Array.from({ length: 30 }, (_, i) => i + 1); // أزرار الأيام

  // نسب مئوية
  totalStudents: number = 0;
  presentPercentage: number = 0;
  absentPercentage: number = 0;

  constructor(private db: Database) {}

  ngOnInit() {
    const today = new Date().getDate();
    this.loadAttendanceForDay(today); // تحميل اليوم الحالي عند الفتح
  }

  async loadAttendanceForDay(day: number) {
    this.loading = true;
    this.error = '';
    this.presentStudents = [];
    this.absentStudents = [];
    this.totalStudents = 0;
    this.presentPercentage = 0;
    this.absentPercentage = 0;

    // تحويل اليوم إلى YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const fullDate = `${year}-${month}-${dayStr}`;
    this.attendanceDate = fullDate;

    try {
      const path = `classrooms/classroom-${this.classroomNumber}/attendanceLogs/${fullDate}`;
      const snapshot = await get(ref(this.db, path));

      if (!snapshot.exists()) {
        this.error = `لا توجد بيانات لهذا اليوم (${fullDate})`;
        this.loading = false;
        return;
      }

      const data = snapshot.val();
      const attendance = data.attendance || [];

      this.totalStudents = attendance.length;

      attendance.forEach((student: any) => {
        if (student.present === true) {
          this.presentStudents.push(student.name);
        }
        if (student.absent === true) {
          this.absentStudents.push(student.name);
        }
      });

      if (this.totalStudents > 0) {
        this.presentPercentage = Math.round((this.presentStudents.length / this.totalStudents) * 100);
        this.absentPercentage = Math.round((this.absentStudents.length / this.totalStudents) * 100);
      }
    } catch (err) {
      console.error('❌ خطأ في جلب البيانات:', err);
      this.error = 'حدث خطأ أثناء جلب البيانات.';
    }

    this.loading = false;
  }
}
