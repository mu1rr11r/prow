import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface StudentAttendance {
  name: string;
  present: boolean;
  absent: boolean;
  docRef: DocumentReference;
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
  classroomName: string = 'القاعة 2';
  loading: boolean = false;
  today: Date = new Date();
  attendanceDate: string = '';

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.today = new Date();
    this.attendanceDate = this.today.toISOString().substring(0, 10); // yyyy-mm-dd
    await this.loadStudents();
  }

  async loadStudents() {
    this.loading = true;
    try {
      const classroomsRef = collection(this.firestore, 'classrooms');
      const q = query(classroomsRef, where('classroom', '==', '2'));
      const querySnapshot = await getDocs(q);

      this.students = [];

      if (querySnapshot.empty) {
        console.warn('لا يوجد مستندات تطابق الشرط.');
      } else {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as {
            students?: string[];
            attendance?: { name: string; present: boolean; absent: boolean }[];
          };
          const docRef = doc.ref;

          if (Array.isArray(data.students)) {
            const newStudents = data.students.map((name) => {
              const att = data.attendance?.find((a) => a.name === name);
              return {
                name,
                present: att ? att.present : false,
                absent: att ? att.absent : false,
                docRef,
              };
            });

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
      const studentsByDoc = new Map<DocumentReference, StudentAttendance[]>();

      this.students.forEach((student) => {
        const arr = studentsByDoc.get(student.docRef) || [];
        arr.push(student);
        studentsByDoc.set(student.docRef, arr);
      });

      for (const [docRef, students] of studentsByDoc.entries()) {
        const attendanceData = students.map((s) => ({
          name: s.name,
          present: s.present,
          absent: s.absent,
        }));

        await updateDoc(docRef, {
          attendance: attendanceData,
          attendanceDate: this.attendanceDate,
        });
      }

      alert('تم حفظ بيانات الحضور والغياب بنجاح.');
    } catch (error) {
      console.error('خطأ أثناء حفظ البيانات:', error);
      alert('حدث خطأ أثناء حفظ البيانات.');
    }
    this.loading = false;
  }
}
