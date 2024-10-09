'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getGroceryItem } from '@/lib/api';
import { Item } from '@/types/groceries';

const GroceryItemPage = () => {
  const params = useParams(); // Get URL parameters
  const id = params.id; // Extract the id from the URL


  const { data: item, isLoading, error } = useQuery<Item>({
    queryKey: ['groceryItem', id],
    queryFn: () => getGroceryItem(Number(id)),
    enabled: !!id, // Only fetch if the ID is available
  });

  if (isLoading) return <p>Loading item...</p>;
  if (error) return <p>Error loading item.</p>;

  return (
    <div>
      <h1>Grocery Item</h1>
      {item ? (
        <h2>{item.name}</h2>
      ) : (
        <p>No item found.</p>
      )}
    </div>
  );
};

export default GroceryItemPage;
