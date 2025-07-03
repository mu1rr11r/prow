import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ge1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ge1.component.html',
  styleUrls: ['./ge1.component.css']
})
export class Ge1Component implements OnInit {
  presentStudents: string[] = [];
  absentStudents: string[] = [];
  attendanceDate: string = ''; // التاريخ
  loading: boolean = false;
  error: string = '';
  classroomNumber: string = '2'; // رقم القاعة

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.loading = true;
    this.error = '';
    this.presentStudents = [];
    this.absentStudents = [];
    this.attendanceDate = '';

    try {
      const classroomsRef = collection(this.firestore, 'classrooms');
      const q = query(classroomsRef, where('classroom', '==', this.classroomNumber));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        this.error = 'لا يوجد بيانات للقاعة المحددة.';
      } else {
        let latestTimestamp = 0;

        querySnapshot.forEach(doc => {
          const data = doc.data() as {
            attendance?: { name: string; present: boolean; absent: boolean }[];
            attendanceDate?: string;
          };

          // حفظ أحدث تاريخ
          if (data.attendanceDate) {
            const time = new Date(data.attendanceDate).getTime();
            if (time > latestTimestamp) {
              latestTimestamp = time;
              this.attendanceDate = data.attendanceDate;
            }
          }

          // جمع الطلاب
          if (Array.isArray(data.attendance)) {
            data.attendance.forEach(a => {
              if (a.present && !this.presentStudents.includes(a.name)) {
                this.presentStudents.push(a.name);
              }

              if (a.absent && !this.absentStudents.includes(a.name)) {
                this.absentStudents.push(a.name);
              }
            });
          }
        });
      }
    } catch (err) {
      this.error = 'حدث خطأ أثناء جلب البيانات.';
      console.error(err);
    }

    this.loading = false;
  }
}
