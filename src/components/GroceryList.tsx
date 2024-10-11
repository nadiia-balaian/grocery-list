'use client';

import { useGroceriesList } from "@/hooks/api-hooks";
import { CircularProgress, List, ListItem, Typography } from "@mui/material";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Product } from "./Product";

export const GroceryList = () => {
  const { data, isLoading, isEmpty, isError } = useGroceriesList();

  const renderContent = () => {
    if (isLoading) {
      return (
        <CircularProgress aria-label="Loading items..." />
      );
    }

    if (isError) {
      return <Typography color="error" variant="h5">Error loading items. Please try again later.</Typography>;
    }

    if (isEmpty) {
      return (
        <div className="flex items-center justify-center min-h-full gap-4">
          <ProductionQuantityLimitsIcon fontSize="large" color="success" />
          <Typography color="success" variant="h5">No items found.<br /> It looks like you've already bought everything you need!</Typography>
        </div>
      );
    }

    return (
      <List className="w-full max-h-full">
        {data?.map((item, index) => (
          <ListItem key={item.id} className="flex gap-4">
            <div className="rounded-full bg-primary text-gray-50 w-[30px] h-[30px] flex items-center justify-center">{index + 1}</div>
            <Product data={item} index={index} />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen min-h-full overflow-auto">
      {renderContent()}
    </div>
  );
};
