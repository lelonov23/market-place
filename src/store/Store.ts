import { makeAutoObservable } from "mobx";
import { FOpts } from "../components/filter/Filter";

export interface Category {
  id: number;
  name: string;
  categoryId: number | null;
  type?: string;
  img?: string;
  filters?: PresetFilter[];
}

export interface PresetFilter {
  id: number;
  name: string;
  filters: FilterData[];
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  type: string;
  img: string;
  cost: number;
  stock: number;
  orders: number;
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
  filterOptions: { [index: string]: any } = {};
  filterData: FilterData[] = [];

  constructor() {
    makeAutoObservable(this);
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

  setFilterOptions(opts: { [index: string]: any }) {
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

  filterByPresetData(type: string | undefined, data: PresetFilter) {
    data.filters.forEach((filter) => {
      Store.filterData = [...Store.filterData, filter];
    });
    Store.filterProductsByParams(type);
  }

  filterProductsByParams(type: string | undefined) {
    console.log(this.filterData);

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

  changeOrderCount(id: number, value: number) {
    const product = this.products.find((prod) => prod.id === id);

    if (product) {
      const newProduct = { ...product, orders: product.orders + value };
      this.products = this.products.map((prod) => {
        if (prod.id === id) return newProduct;
        else return prod;
      });
    }
  }

  getCategoryOrders(catId: number) {
    return this.products
      .filter((prod) => prod.categoryId === catId)
      .reduce((acc, currentProduct) => acc + currentProduct.orders, 0);
  }

  get priceRange(): number[] {
    const priceArray = this.currentProducts.map((prod) => prod.cost);
    const rangeArray: [number, number] = [Infinity, -Infinity];
    priceArray.forEach((price) => {
      if (price < rangeArray[0]) rangeArray[0] = price;
      if (price > rangeArray[1]) rangeArray[1] = price;
    });
    return rangeArray;
  }

  get mainCategories() {
    return this.categories.filter((cat) => cat.categoryId === null);
  }

  get subcategories() {
    return this.categories.filter((cat) => cat.categoryId !== null);
  }

  get popularCategories() {
    return this.subcategories.sort(
      (a, b) => this.getCategoryOrders(b.id) - this.getCategoryOrders(a.id)
    );
  }
}

export const Store = new StoreImpl();
