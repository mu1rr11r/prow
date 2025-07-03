import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface StudentAttendance {
  name: string;
  present: boolean;
  absent: boolean;
}

@Component({
  selector: 'app-ke3',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ke3.component.html',
  styleUrls: ['./ke3.component.css']
})
export class Ke3Component implements OnInit {
  students: StudentAttendance[] = [];
  classroomName: string = '';
  loading: boolean = false;
  today: Date = new Date();

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.loading = true;
    try {
      const classroomsRef = collection(this.firestore, 'classrooms');
      const q = query(classroomsRef, where('classroom', '==', '3')); // هنا بنغير لـ "3"
      const querySnapshot = await getDocs(q);

      this.students = [];
      this.classroomName = 'القاعة 3';

      if (querySnapshot.empty) {
        console.warn('لا يوجد مستندات تطابق الشرط.');
      } else {
        querySnapshot.forEach(doc => {
          const data = doc.data() as { students?: string[] };

          if (Array.isArray(data.students)) {
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
