import { makeObservable, observable, action, computed } from "mobx";

export interface Category {
  id: number;
  name: string;
  categoryId: number | null;
  type?: string;
  img?: string;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  type?: string;
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
  currentProducts: Product[] = [];
  params: Param[] = [];
  filterOptions: any[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      products: observable,
      currentProducts: observable,
      filterOptions: observable,
      filterProducts: action,
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

  filterProducts(type: string) {
    this.currentProducts = this.products.filter((prod) => {
      return prod.type === type;
    });
  }

  get mainCategories() {
    return this.categories.filter((cat) => cat.categoryId === null);
  }

  get subcategories() {
    return this.categories.filter((cat) => cat.categoryId !== null);
  }
}

export const Store = new StoreImpl();
