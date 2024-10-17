import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { addItemToGroceriesList, deleteItemFromGroceriesList, getGroceriesList, getGroceryItem, updateItemInGroceriesList } from '@/lib/api';
import { QueryKeys } from '@/types/queryKeys';
import { Item } from '@/types/groceries';
import { SORT_BY } from '@/constants/ui';

const DEFAULT_SORT = "name";

// Hook to fetch the grocery list
export const useGroceriesList = (sortBy: SORT_BY) => {
  const {data, isError, isLoading, isFetching, isPending} = useQuery<Item[]>({
    queryKey: [QueryKeys.GROCERIES_LIST, sortBy],
    queryFn: () => getGroceriesList(sortBy),
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
      queryClient.setQueryData([QueryKeys.GROCERIES_LIST, DEFAULT_SORT], (oldData: Item[]) => {
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
export const useUpdateGroceryItem = ({
  sort
}: {sort: SORT_BY}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateItemInGroceriesList,
    onMutate: async (newItem: Item) => {
      await queryClient.cancelQueries({ queryKey: [QueryKeys.GROCERIES_LIST] })
      const previousItems = queryClient.getQueryData([QueryKeys.GROCERIES_LIST, sort]);

      queryClient.setQueryData([QueryKeys.GROCERIES_LIST, sort], (oldData: Item[]) => {
        const updatedItems = oldData.map((item: Item) =>
          item.id === newItem.id ? newItem : item
        );
        return updatedItems;
      });

      return { previousItems };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([QueryKeys.GROCERIES_LIST], context?.previousItems as Item[]);
    },
    // onSuccess: (updatedItem: Item) => {
    //   queryClient.setQueryData([QueryKeys.GROCERIES_LIST, sort], (oldData: Item[]) => {

    //     const updatedItems = oldData.map((item: Item) =>
    //       item.id === updatedItem.id ? updatedItem : item
    //     );

    //     return [
    //       ...updatedItems
    //     ];
    //   });
    // },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GROCERIES_LIST] })
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GROCERIES_LIST]});     
    },
  });

  return {
    deleteItem: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError || mutation.error,
    isSuccess: mutation.isSuccess,
  }
};


// Hook to get one item by id
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