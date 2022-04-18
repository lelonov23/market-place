import { makeObservable, observable, action, computed } from "mobx";

export interface Category {
  id: number;
  name: string;
  categoryId: number | null;
  img?: string;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  orders?: number;
  img?: string;
  cost: number;
}

export interface Param {
  productId: number;
  type: string;
  display?: string;
  os?: string;
  battery: string;
}

export class StoreImpl {
  categories: Category[] = [];
  products: Product[] = [];
  params: Param[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      products: observable,
      setCategories: action,
      setProducts: action,
      setParams: action,
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

  setParams(params: any[]) {
    this.params = params;
  }

  get mainCategories() {
    return this.categories.filter((cat) => cat.categoryId === null);
  }

  get subcategories() {
    return this.categories.filter((cat) => cat.categoryId !== null);
  }
}

export const Store = new StoreImpl();
