import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  // تسجيل مستخدم جديد
  async register(email: string, password: string, fullName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // تحديث اسم المستخدم في Firebase Auth
      await updateProfile(userCredential.user, { displayName: fullName });

      // حفظ بيانات المستخدم في Firestore
      const userDocRef = doc(this.firestore, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        fullName,
        email,
        createdAt: new Date()
      });

      return userCredential;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  // تسجيل الدخول
  async loginms(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  // تسجيل الخروج
  logout() {
    return this.auth.signOut();
  }
}
