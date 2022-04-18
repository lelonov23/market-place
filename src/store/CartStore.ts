import { makeObservable, observable, action, computed } from "mobx";

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  orders?: number;
  cost: number;
}

export interface CartItem {
  id: string;
  product: Product;
  count: number;
}

export class CartStoreImpl {
  items: CartItem[] = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      addNewItem: action,
      addExistingItem: action,
      removeExistingItem: action,
      removeAllOfItem: action,
      totalPrice: computed,
    });
  }

  addNewItem(item: Product) {
    const newItem = {
      id: new Date().toISOString(),
      product: item,
      count: 1,
    };
    this.items.push(newItem);
  }

  addExistingItem(item: Product) {
    const foundItem = this.items.find((i) => i.product.id === item.id);
    if (foundItem) foundItem.count++;
  }

  removeExistingItem(item: Product) {
    const foundItem = this.items.find((i) => i.product.id === item.id);
    if (foundItem) foundItem.count--;
    if (foundItem?.count === 0) {
      this.removeAllOfItem(item);
    }
  }

  removeAllOfItem(item: Product) {
    this.items = this.items.filter(
      (foundItem) => foundItem.product.id !== item.id
    );
  }

  get totalPrice() {
    return this.items
      .map((item) => item.product.cost * item.count)
      .reduce((sum, num) => sum + num, 0);
  }
}
export const CartStore = new CartStoreImpl();
