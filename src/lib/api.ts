import { BASE_URL } from "@/constants/default";
import { Item } from "@/types/groceries";
import exp from "constants";

// TODO: add filtering by isPurchased or/and pagination
export const getGroceriesList = async (): Promise<Item[]> => {
  return apiService.get('items');
};

export const getGroceryItem = async (itemId: number): Promise<Item> => {
  return apiService.get(`items/${itemId}`);
}

export const addItemToGroceriesList = async (newItem: Item): Promise<Item> => {
  return apiService.post('items', { ...newItem });
}

export const updateItemInGroceriesList = async (updatedItem: Item): Promise<Item> => {
  return apiService.put(`items/${updatedItem.id}`, { item: updatedItem });
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
