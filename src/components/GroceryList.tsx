'use client';

import { useGroceriesList } from "@/hooks/api-hooks";
import { Box, CircularProgress, List, ListItem, MenuItem, Select, Typography } from "@mui/material";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Product } from "./Product";
import { SORT_BY } from "@/constants/ui";
import { useState } from "react";

const SORT_BY_VALUES = [
  {
    value: "name",
    description: "Name"
  },
  {
    value: "isFood",
    description: "Food first"
  },
  {
    value: "isPurchased",
    description: "Already purchased"
  }
]

export const GroceryList = () => {
  const [sortBy, setSortBy] = useState<SORT_BY>("name");
  const { data, isLoading, isEmpty, isError } = useGroceriesList(sortBy);

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
      <>
        <Box className="flex items-center gap-3 justify-start w-full">
          Sort by:
          <Select
            className="min-w-[200px]"
            labelId="sort-by-label"
            id="sort-by-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SORT_BY)}
          >
            {SORT_BY_VALUES.map((i) =>
              <MenuItem value={i.value}>{i.description}</MenuItem>
            )}
          </Select>
        </Box>
        <List className="w-full max-h-full">
          {data?.map((item, index) => (
            <ListItem key={item.id} className="flex gap-4">
              <div className="rounded-full bg-primary text-gray-50 w-[30px] h-[30px] flex items-center justify-center">{index + 1}</div>
              <Product data={item} index={index} />
            </ListItem>
          ))}
        </List>
      </>
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen min-h-full overflow-auto flex-col pt-10">
      {renderContent()}
    </div>
  );
};
