'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetGroceryItem } from '@/hooks/api-hooks';
import { CircularProgress, Typography } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Product } from '@/components/Product';

const GroceryItemPage = () => {
  const params = useParams();
  const id = params.id;

  const { item, isLoading, error } = useGetGroceryItem(id as string)

  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress aria-label="Loading items..." />;
    }

    if (error) {
      return <Typography color="error" variant="h5">Error loading items. Please try again later.</Typography>
    }

    if (!item) {
      return (
        <div className="flex items-center justify-center min-h-full gap-4">
          <ProductionQuantityLimitsIcon fontSize="large" color="success" />
          <Typography color="success" variant="h5">No item found.</Typography>
        </div>
      );
    }

    return (
      <Product data={item} itemMode={true}></Product>
    )
  };

  return (
    <div className="min-w-full flex items-center justify-center flex-1 overflow-auto max-h-fit">
      {renderContent()}
    </div>
  );
};

export default GroceryItemPage;
