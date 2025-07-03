import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface StudentAttendance {
  name: string;
  present: boolean;
  absent: boolean;
}

@Component({
  selector: 'app-ke1',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './ke1.component.html',
  styleUrls: ['./ke1.component.css']
})
export class Ke1Component implements OnInit {
  students: StudentAttendance[] = [];
  classroomName: string = '';
  loading: boolean = false;
  today: Date = new Date();
  private classroomDocRef: any = null; // لتخزين مرجع المستند

  constructor(private firestore: Firestore) {}
async ngOnInit() {
  this.loading = true;
  try {
    const classroomsRef = collection(this.firestore, 'classrooms');
    const q = query(classroomsRef, where('classroom', '==', '1'));
    const querySnapshot = await getDocs(q);

    this.students = [];
    this.classroomName = 'القاعة 1'; // لو حابب تظهر اسم ثابت أو تقدر تجيبه من أول مستند

    if (querySnapshot.empty) {
      console.warn('لا يوجد مستندات تطابق الشرط.');
    } else {
      querySnapshot.forEach(doc => {
        const data = doc.data() as { students?: string[] };

        if (Array.isArray(data.students)) {
          // ضيف الطلاب الجدد للمصفوفة مع تحويلهم لكائنات مع حالات الحضور والغياب
          const newStudents = data.students.map(name => ({
            name,
            present: false,
            absent: false,
          }));

          this.students = this.students.concat(newStudents);
        }
      });
    }
  } catch (error) {
    console.error('خطأ في جلب البيانات من Firestore:', error);
    this.students = [];
    this.classroomName = '';
  }
  this.loading = false;
}

}
