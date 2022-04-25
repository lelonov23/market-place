import { makeObservable, observable, action, computed } from "mobx";
import { Product, Store } from "./Store";

export interface CartItem {
  id: string;
  product: Product;
  count: number;
}

export interface Order {
  id: string | number;
  items: CartItem[];
  date: Date;
}

export class CartStoreImpl {
  items: CartItem[] = [];
  orders: Order[] = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      addNewItem: action,
      addExistingItem: action,
      removeExistingItem: action,
      removeAllOfItem: action,
      confirmOrder: action,
      totalPrice: computed,
    });
  }

  addNewItem(item: Product) {
    const stock = Store.getItemStock(item.id);
    if (stock > 0) {
      const newItem = {
        id: new Date().toISOString(),
        product: item,
        count: 1,
      };
      this.items.push(newItem);
      Store.changeStock(item.id, -1);
    }
  }

  addExistingItem(item: Product) {
    const stock = Store.getItemStock(item.id);
    if (stock > 0) {
      const foundItem = this.items.find((i) => i.product.id === item.id);
      if (foundItem) {
        foundItem.count++;
        Store.changeStock(item.id, -1);
      }
    }
  }

  removeExistingItem(item: Product) {
    const foundItem = this.items.find((i) => i.product.id === item.id);
    if (foundItem) foundItem.count--;
    if (foundItem?.count === 0) {
      this.removeAllOfItem(item);
    }
    Store.changeStock(item.id, 1);
  }

  removeAllOfItem(item: Product) {
    this.items = this.items.filter((foundItem) => {
      const count = foundItem.count;
      Store.changeStock(item.id, count);
      return foundItem.product.id !== item.id;
    });
  }

  confirmOrder() {
    const newOrder: Order = {
      id: new Date().toISOString(),
      items: [...this.items],
      date: new Date(),
    };

    this.orders = [...this.orders, newOrder];

    this.items = [];
  }

  get totalPrice() {
    return this.items
      .map((item) => item.product.cost * item.count)
      .reduce((sum, num) => sum + num, 0);
  }
}
export const CartStore = new CartStoreImpl();
