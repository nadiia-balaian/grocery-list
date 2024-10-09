import { Item } from "./groceries";

export interface GetGroceriesListResponse {
  items: Item[];
  
  // TODO: add pagination
  // total: number;
  // page: number;
}