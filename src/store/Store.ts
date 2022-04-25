import { makeObservable, observable, action, computed } from "mobx";
import { isThisTypeNode } from "typescript";
import { FOpts } from "../components/filter/Filter";

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
  type: string;
  img: string;
  cost: number;
  stock: number;
}

interface FilterData {
  name: string;
  value: string[];
}

export interface Param {
  [index: string]: any;
  productId: number;
  type: string;
  display?: string;
  os?: string;
  battery?: string;
  resolution?: string;
  processor?: string;
}

export interface Opts {
  [index: string]: any;
}

export class StoreImpl {
  categories: Category[] = [];
  products: Product[] = [];
  currentProducts: Product[] = [];
  params: Param[] = [];
  filterOptions: any = {};
  filterData: FilterData[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      products: observable,
      currentProducts: observable,
      filterOptions: observable,
      filterData: observable,
      filterProducts: action,
      filterProductsByParams: action,
      setCategories: action,
      setProducts: action,
      setParams: action,
      setFilterOptions: action,
      addFilterData: action,
      changeStock: action,
      getItemStock: action,
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

  setFilterOptions(opts: any) {
    this.filterOptions = opts;
  }

  filterProducts(type: string) {
    this.filterData = [];

    this.currentProducts = this.products.filter((prod) => {
      return prod.type === type;
    });

    const opts: Opts = {};
    this.currentProducts.forEach((prod) => {
      const param = Store.params.find((param) => param.productId === prod.id);
      if (param)
        Object.keys(param).forEach((key) => {
          if (opts[key] && !opts[key].includes(param[key])) {
            opts[key] = [...opts[key], param[key]];
          } else if (!opts[key]) {
            opts[key] = [param[key]];
          }
        });
    });
    delete opts.productId;
    delete opts.type;
    this.setFilterOptions(opts);
  }

  addFilterData(data: FOpts, type: string | undefined) {
    if (this.filterData.length === 0) {
      this.filterData = [{ name: data.name, value: [data.value] }];
    } else {
      let isIncluded = false;
      this.filterData.forEach((opt) => {
        if (opt.name === data.name) isIncluded = true;
      });
      if (isIncluded) {
        if (data.checked) {
          this.filterData = this.filterData.map((opt) => {
            if (opt.name === data.name) {
              return {
                name: opt.name,
                value: [...opt.value, data.value],
              };
            } else return opt;
          });
        } else {
          this.filterData = this.filterData.map((opt) => {
            if (opt.name === data.name) {
              return {
                name: opt.name,
                value: opt.value.filter((val) => val !== data.value),
              };
            } else return opt;
          });
        }
      } else {
        this.filterData = [
          ...this.filterData,
          { name: data.name, value: [data.value] },
        ];
      }
    }
    this.filterProductsByParams(type);
  }

  filterProductsByParams(type: string | undefined) {
    this.currentProducts = this.products.filter((prod) => {
      return prod.type === type;
    });

    if (this.filterData.length > 0) {
      this.filterData = this.filterData.filter((opt) => {
        return opt.value.length;
      });

      this.filterData.forEach((opt) => {
        this.currentProducts = this.currentProducts.filter((prod) => {
          const paramList = this.params.find(
            (param) => param.productId === prod.id
          );

          if (paramList) {
            return (
              paramList[opt.name] && opt.value.includes(paramList[opt.name])
            );
          }
        });
      });
    }
  }

  changeStock(prodId: number | undefined, payload: number) {
    const foundProd = this.products.find((prod) => prod.id === prodId);
    if (foundProd) {
      foundProd.stock += payload;
      this.products = this.products.map((prod) => {
        if (prod.id === prodId) {
          return foundProd;
        } else return prod;
      });
    }
  }

  getItemStock(prodId: number): number {
    const foundProd = this.products.find((prod) => prod.id === prodId);
    if (foundProd && foundProd.stock) return foundProd.stock;
    else return 0;
  }

  get mainCategories() {
    return this.categories.filter((cat) => cat.categoryId === null);
  }

  get subcategories() {
    return this.categories.filter((cat) => cat.categoryId !== null);
  }
}

export const Store = new StoreImpl();
