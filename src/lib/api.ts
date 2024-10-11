import { BASE_URL } from "@/constants/default";
import { SORT_BY } from "@/constants/ui";
import { Item } from "@/types/groceries";
import exp from "constants";

// TODO: add filtering and pagination
export const getGroceriesList = async (sort?: SORT_BY): Promise<Item[]> => {
  return apiService.get(`items?_sort=${sort}`);
};

export const getGroceryItem = async (itemId: string): Promise<Item> => {
  return apiService.get(`items/${itemId}`);
}

export const addItemToGroceriesList = async (newItem: Item): Promise<Item> => {
  return apiService.post('items', { ...newItem });
}

export const updateItemInGroceriesList = async (updatedItem: Item): Promise<Item> => {
  return apiService.put(`items/${updatedItem.id}`, { ...updatedItem });
}

export const deleteItemFromGroceriesList = async (itemId: string) => {
  return apiService.delete(`items/${itemId}`);
}

export const apiService = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}/${path}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return response.json();
  },

  async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Failed to post data: ${response.statusText}`);
    }
    return response.json();
  },

  async put<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Failed to update data: ${response.statusText}`);
    }
    return response.json();
  },

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete data: ${response.statusText}`);
    }
    return response.json();
  },
};
