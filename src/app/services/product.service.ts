import {inject, Injectable} from '@angular/core';
import {addDoc, collection, doc, Firestore, getDoc, getDocs, query, where} from '@angular/fire/firestore';
import {ProductSaveRequest} from '../interfaces/requests/product.request';
import {ProductDto} from '../interfaces/product.dto';
import {v4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private firestore: Firestore = inject(Firestore);

  async createProduct(req: ProductSaveRequest): Promise<ProductDto> {
    const docRef = await addDoc(collection(this.firestore, 'products'), {
      ...req,
      id: v4()
    });
    return (await getDoc(docRef)).data() as ProductDto;
  }

  async listProducts(userEmail: string): Promise<ProductDto[]> {
    const productCollectionRef = collection(this.firestore, 'products');
    const q = query(productCollectionRef, where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs.map((value) => value.data() as ProductDto);
    } else {
      return [];
    }
  }
}
