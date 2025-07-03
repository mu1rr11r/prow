import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

interface RawAttendance {
  name: string;
  status: 'present' | 'absent';
}

interface StudentAttendance {
  name: string;
  daysPresent: number;
  daysAbsent: number;
  presentPercent: number;
  absentPercent: number;
}

@Component({
  selector: 'app-seting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seting.component.html',
  styleUrls: ['./seting.component.css']
})
export class SetingComponent implements OnInit {
  students: StudentAttendance[] = [];
  loading = false;
  error = '';

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    this.loading = true;
    this.error = '';
    try {
      const attendanceCollection = collection(this.firestore, 'attendance');
      const snapshot = await getDocs(attendanceCollection);

      // تجميع بيانات الحضور والغياب لكل طالب
      const grouped: { [name: string]: { daysPresent: number; daysAbsent: number } } = {};

      snapshot.forEach(doc => {
        const data = doc.data() as RawAttendance;

        if (!grouped[data.name]) {
          grouped[data.name] = { daysPresent: 0, daysAbsent: 0 };
        }

        if (data.status === 'present') {
          grouped[data.name].daysPresent++;
        } else if (data.status === 'absent') {
          grouped[data.name].daysAbsent++;
        }
      });

      // تحويل البيانات المجمعة إلى مصفوفة مع حساب النسب المئوية
      this.students = Object.entries(grouped).map(([name, counts]) => {
        const total = counts.daysPresent + counts.daysAbsent;
        const presentPercent = total === 0 ? 0 : Math.round((counts.daysPresent / total) * 100);
        const absentPercent = total === 0 ? 0 : 100 - presentPercent;

        return {
          name,
          daysPresent: counts.daysPresent,
          daysAbsent: counts.daysAbsent,
          presentPercent,
          absentPercent
        };
      });

    } catch (e) {
      this.error = 'حدث خطأ أثناء جلب البيانات';
      console.error(e);
    }
    this.loading = false;
  }
}
