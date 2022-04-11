import { makeObservable, observable, action, computed } from "mobx";

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  orders?: number;
}

export class CartStoreImpl {
  items: Product[] = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      addItem: action,
    });
  }

  addItem(item: Product) {
    this.items.push(item);
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
export const CartStore = new CartStoreImpl();
