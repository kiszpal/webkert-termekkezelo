import {Injectable} from '@angular/core';
import {Transaction} from '../interfaces/transaction';
import {
  Firestore,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  setDoc,
  CollectionReference,
  DocumentReference
} from '@angular/fire/firestore';
import {ProductDto} from '../interfaces/product.dto';
import {v4} from 'uuid';
import {TransactionSaveRequest} from '../interfaces/requests/transaction.request';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private readonly firestore: Firestore
  ) {
  }

  private collectionName: string = 'transactions';

  async saveTransaction(req: TransactionSaveRequest): Promise<void> {
    const res = await this.findTodayTransaction(req.userEmail, req.soldItem);

    if (res) {
      await this.updateTransaction(res, req.itemCount);
    } else {
      await this.createTransaction(req.userEmail, req.soldItem, req.itemCount);
    }
  }

  private async findTodayTransaction(userEmail: string, soldItem: ProductDto) {
    const { startOfDay, endOfDay } = this.getTodayBounds();
    const collectionRef: CollectionReference = collection(this.firestore, this.collectionName);
    const q = query(collectionRef,
      where('userEmail', '==', userEmail),
      where('soldItem.id', '==', soldItem.id),
      where('transactionDate', '>=', startOfDay),
      where('transactionDate', '<', endOfDay)
    );
    try {
      const result = await getDocs(q);
      return result.docs[0]?.data() as Transaction;
    } catch (e) {
      console.log(e);
    }
    return {} as Transaction;
  }

  private async updateTransaction(existing: Transaction, addedCount: number): Promise<void> {
    const updated: Partial<Transaction> = {
      itemCount: existing.itemCount + addedCount,
      transactionDate: new Date()
    };
    const collectionRef: CollectionReference = collection(this.firestore, this.collectionName);
    const q = query(collectionRef, where('id', '==', existing.id));
    const docRef = await getDocs(q);
    await updateDoc(docRef.docs[0].ref, updated);
  }

  private async createTransaction(userEmail: string, soldItem: ProductDto, itemCount: number): Promise<void> {
    const newTransaction: Transaction = {
      id: v4(),
      userEmail,
      soldItem,
      itemCount,
      transactionDate: new Date()
    };
    const collectionRef: CollectionReference = collection(this.firestore, this.collectionName);
    const docRef: DocumentReference= doc(collectionRef);
    await setDoc(docRef, newTransaction);
  }

  private getTodayBounds(): { startOfDay: Date; endOfDay: Date } {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return { startOfDay, endOfDay };
  }
}
