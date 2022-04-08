import { makeObservable, observable, action, computed } from "mobx";

export interface Category {
  id: number;
  name: string;
  categoryId: number | null;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  orders?: number;
}

export class StoreImpl {
  categories: Category[] = [];
  products: Product[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      products: observable,
      setCategories: action,
      setProducts: action,
      mainCategories: computed,
      subcategories: computed,
    });
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  get mainCategories() {
    return this.categories.filter((cat) => cat.categoryId === null);
  }

  get subcategories() {
    return this.categories.filter((cat) => cat.categoryId !== null);
  }
}

export const Store = new StoreImpl();
