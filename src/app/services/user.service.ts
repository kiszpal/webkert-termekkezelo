import {inject, Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {RegisterRequest} from '../interfaces/requests/register.request';
import {LoginRequest} from '../interfaces/requests/login.request';
import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
  getDocs,
  query,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where
} from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = getAuth();

  async register(req: RegisterRequest): Promise<User> {
    await createUserWithEmailAndPassword(this.auth, req.email, req.password);

    await addDoc(collection(this.firestore, "users"), {
      username: req.username,
      email: req.email
    });

    return this.getUserByEmail(req.email);
  }

  async login(req: LoginRequest): Promise<User> {
    await signInWithEmailAndPassword(this.auth, req.email, req.password);
    return this.getUserByEmail(req.email);
  }

  private async getUserByEmail(email: string): Promise<User> {
    const userCollectionRef: CollectionReference = collection(this.firestore, 'users');
    const q: Query = query(userCollectionRef, where("email", "==", email));
    const querySnapshot: QuerySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const snapshot: QueryDocumentSnapshot = querySnapshot.docs[0];
      return snapshot.data() as User;
    } else {
      throw new Error('This user could not be found');
    }

  }
}
