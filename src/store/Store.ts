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
  filterOptions: any[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      products: observable,
      filterOptions: observable,
      setCategories: action,
      setProducts: action,
      setParams: action,
      setFilterOptions: action,
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

  setParams(params: Param[]) {
    this.params = params;
  }

  setFilterOptions(opts: any[]) {
    this.filterOptions = opts;
  }

  get mainCategories() {
    return this.categories.filter((cat) => cat.categoryId === null);
  }

  get subcategories() {
    return this.categories.filter((cat) => cat.categoryId !== null);
  }
}

export const Store = new StoreImpl();
