import { makeAutoObservable } from "mobx";
import { Type } from "typescript";

export interface ProductG {
  id: number;
  name: string;
  categoryId: number;
  orders?: number;
  img?: string;
  cost?: number;
}

export interface Phone extends ProductG {
  display: string;
}

export interface Car extends ProductG {
  tireVolume: number;
}

export type Product = Phone | Car;

export class testStore {
  private _products: ProductG[] = [];

  private _map: Map<string, ProductG[]> = new Map<string, ProductG[]>();

  constructor() {
    makeAutoObservable(this);
  }

  setProducts<T extends ProductG>(collectionName: string, products: Array<T>) {
    this._map.set(collectionName, products);
  }

  getProducts<T extends ProductG>(collectionName: string): T[] {
    return this._map.get(collectionName) as T[];

    // return this._products as T[];
  }
}
