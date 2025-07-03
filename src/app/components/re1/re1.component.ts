// RE1Component: رفع أسماء الطلاب إلى Firestore
import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-re1',
  standalone: true,
  imports: [],
  templateUrl: './re1.component.html',
  styleUrls: ['./re1.component.css']
})
export class RE1Component {
  constructor(private firestore: Firestore) {}

  async saveData(event: Event) {
    event.preventDefault();
    const classroomSelect = document.getElementById('classroom') as HTMLSelectElement;
    const studentsTextarea = document.getElementById('studentsNames') as HTMLTextAreaElement;

    const classroom = classroomSelect.value;
    const studentsRaw = studentsTextarea.value.trim();

    if (!classroom) {
      alert('يرجى اختيار القاعة');
      return;
    }
    if (!studentsRaw) {
      alert('يرجى إدخال أسماء الطلبة');
      return;
    }

    const students = studentsRaw.split('\n').map(name => name.trim()).filter(name => name);

    try {
      await addDoc(collection(this.firestore, 'classrooms'), {
        classroom,
        students,
        attendance: [],
        attendanceDate: ''
      });
      alert('تم رفع البيانات بنجاح!');
      classroomSelect.value = '';
      studentsTextarea.value = '';
    } catch (error) {
      console.error('خطأ في رفع البيانات:', error);
      alert('حدث خطأ أثناء رفع البيانات');
    }
  }
}
