import { makeObservable, observable, action } from "mobx";

interface CategoryItem {
  id: number;
  name: string;
  subcategories?: CategoryItem[];
}

export class CategoryStoreImpl {
  categories: CategoryItem[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      setCategories: action,
    });
  }

  setCategories(categories: CategoryItem[]) {
    this.categories = categories;
  }
}

export const CategoryStore = new CategoryStoreImpl();
