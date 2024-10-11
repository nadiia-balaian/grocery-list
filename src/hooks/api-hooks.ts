import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { addItemToGroceriesList, deleteItemFromGroceriesList, getGroceriesList, getGroceryItem, updateItemInGroceriesList } from '@/lib/api';
import { QueryKeys } from '@/types/queryKeys';
import { Item } from '@/types/groceries';

// Hook to fetch the grocery list
export const useGroceriesList = () => {
  const {data, isError, isLoading, isFetching, isPending} = useQuery<Item[]>({
    queryKey: [QueryKeys.GROCERIES_LIST],
    queryFn: getGroceriesList,
    staleTime: 30000,
    refetchInterval: 30000,
  });

  return {
    data,
    isEmpty: !data || data.length === 0,
    isLoading: isLoading || isPending || isFetching,
    isError,
  }
};

// Hook to add item to the grocery list
export const useAddGroceryItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addItemToGroceriesList,
    onSuccess: (newItem: Item) => {
      queryClient.setQueryData([QueryKeys.GROCERIES_LIST], (oldData: any) => {
        const updatedItems = [...oldData, newItem];
        return [
          ...updatedItems,
        ];
      });
    },
  });

  return {
    addItem: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError || mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Hook to update an item in the grocery list
export const useUpdateGroceryItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateItemInGroceriesList,
    onSuccess: (updatedItem: Item) => {
      queryClient.setQueryData([QueryKeys.GROCERIES_LIST], (oldData: any) => {

        const updatedItems = oldData.map((item: Item) =>
          item.id === updatedItem.id ? updatedItem : item
        );

        console.log(updatedItems)

        return [
          ...updatedItems
        ];
      });
    },
  });

  return {
    updateItem: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError || mutation.error,
    isSuccess: mutation.isSuccess,
  }
};

// Hook to delete an item from the grocery list
export const useDeleteGroceryItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteItemFromGroceriesList,
    onSuccess: (_, itemId: string, onSuccess) => {
      queryClient.setQueryData([QueryKeys.GROCERIES_LIST], (oldData: any) => {
        const updatedItems = oldData.filter((item: Item) => item.id !== itemId);

        return [
          ...updatedItems,
        ];
      });
     
    },
  });

  return {
    deleteItem: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError || mutation.error,
    isSuccess: mutation.isSuccess,
  }
};

export const useGetGroceryItem = (id: string) => {
  const { data: item, isLoading, isPending, isFetching, error, isError } = useQuery<Item>({
    queryKey: ['groceryItem', id],
    queryFn: () => getGroceryItem(id),
    enabled: !!id, // Only fetch if the ID is available
  });


  return {
    item,
    isLoading: isLoading || isFetching || isPending,
    error: isError || error,
  }
}