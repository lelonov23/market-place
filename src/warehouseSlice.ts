import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./app/store";

export type Category = {
  id: number;
  name: string;
  subcategories?: Category[];
};

export interface WarehouseState {
  value: Category[];
}

const initialState: WarehouseState = {
  value: [],
};

export const warehouseSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Category[]>) => {
      state.value = action.payload;
    },
  },
});

export const { load } = warehouseSlice.actions;

export const selectWarehouse = (state: RootState) => state.warehouse.value;

export default warehouseSlice.reducer;
