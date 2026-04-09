import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { app } from '../../firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  constructor(private firestore: Firestore) {}

  private auth = getAuth(app);

  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);

      return result;
    } catch (error: any) {
      console.error('Firebase login error:', error);
      throw error;
    }
  }

  async signup(name: string, email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);

      return result;
    } catch (error: any) {
      console.error('Firebase error:', error);
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      const result = await sendPasswordResetEmail(this.auth, email);
      return result;
    } catch (error) {
      console.error('Reset error:', error);
      throw error;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async getData(collectionName: string, type: string, field: string) {
    const colRef = collection(this.firestore, collectionName);
    const q = query(colRef, where('type', '==', type));

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const data: any = snapshot.docs[0].data();
      return data[field];
    }

    return null;
  }
}
