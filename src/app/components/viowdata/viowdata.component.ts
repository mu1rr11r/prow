import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ جديد
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-viowdata',
  standalone: true,
  imports: [CommonModule], // ✅ لازم
  templateUrl: './viowdata.component.html',
  styleUrls: ['./viowdata.component.css']
})
export class ViowdataComponent implements OnInit {
  supervisors: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.getSupervisors();
  }

async getSupervisors() {
  try {
    const usersRef = collection(this.firestore, 'users');
    const querySnapshot = await getDocs(usersRef);
    this.supervisors = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}


  async deleteSupervisor(uid: string) {
    try {
      await deleteDoc(doc(this.firestore, 'users', uid));
      this.supervisors = this.supervisors.filter(user => user.uid !== uid);
      alert('تم حذف المشرف بنجاح');
    } catch (error) {
      console.error('Error deleting supervisor:', error);
      alert('حدث خطأ أثناء الحذف');
    }
  }
}
