import { Item } from "@/types/groceries";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  debounce,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Slider,
  Typography,
} from "@mui/material";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import CategoryIcon from "@mui/icons-material/Category";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDeleteGroceryItem, useUpdateGroceryItem } from "@/hooks/api-hooks";
import { useRouter } from "next/navigation";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { SORT_BY } from "@/constants/ui";


interface ProductProps {
  data: Item;
  index?: number;
  itemMode?: boolean;
  sortBy?: SORT_BY;
}

export const Product = ({ data, index = 1, itemMode, sortBy = "name" }: ProductProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [productData, setProductData] = useState<Item>(data);
  const { name, isFood, isPurchased, id } = productData;
  const { deleteItem } = useDeleteGroceryItem();
  const { updateItem } = useUpdateGroceryItem({ sort: sortBy });

  const router = useRouter();

  useEffect(() => {
    setProductData(data);
  }, [data]);

  const handleChange = useCallback((updatedItem: Item) => {
    updateItem({
      ...updatedItem
    }, {
      onSuccess: (item) => {
        setProductData(item);
      }
    })
  }, []);

  const debouncedHandleChange = useMemo(() => debounce(handleChange, 200), [handleChange]);

  return (
    <>
      <Card className="flex-1" sx={
        {
          backgroundColor: index % 2 === 0 ? "rgba(127, 241, 227, 0.3)" : "rgba(0, 0, 0, 0.08)",
          maxWidth: 600
        }
      }>
        {/* Header */}
        <CardHeader
          action={itemMode ?
            <IconButton aria-label="Back to list" title="Back to list" onClick={() => router.push('/grocery-list')}>
              <ExitToAppIcon color="primary" />
            </IconButton> :
            <IconButton aria-label={`View ${name}`} title={`View ${name}`}>
              <RemoveRedEyeIcon />
            </IconButton>
          }
          title={<Typography variant="h5" color="textPrimary" sx={{
            textDecoration: isPurchased ? "line-through" : 'none'
          }}>{name}</Typography>}
          sx={
            !itemMode ? {
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              },
            } : null}
          onClick={() => !itemMode ? router.push(`/grocery-list/${id}`) : null}
          className="flex items-center"
        />

        <Divider />

        {/* Main content */}
        <CardContent className="flex gap-4 items-center">
          <Box className="flex items-center justify-center p-5 bg-gray-200 w-[50px] h-[50px] rounded-full">
            {isFood ? <BakeryDiningIcon sx={{ fontSize: 40 }} /> : <CategoryIcon />}
          </Box>

          <Box className="flex-1">
            <Typography color="textPrimary" fontWeight={600} variant="h6">Qty <span className="text-primary">{productData.amount}</span></Typography>
            {itemMode && (
              <div className="flex gap-2 items-center py-3">
                <RemoveCircleIcon color={isPurchased ? "disabled" : "primary"} aria-label="Decrease amount" titleAccess="Decrease amount"
                  onClick={() => debouncedHandleChange({
                    ...productData,
                    amount: (productData.amount - 1) < 1 ? 1 : productData.amount - 1
                  })}
                />

                <Slider sx={{
                  maxWidth: "200px"
                }}
                  disabled={isPurchased}
                  aria-label="Amount" min={0} max={50} step={1} value={productData.amount} valueLabelDisplay="auto"
                  onChange={(_event, value) => debouncedHandleChange({
                    ...productData,
                    amount: value as number
                  })}
                />

                <AddCircleIcon color={isPurchased ? "disabled" : "primary"} aria-label="Increase amount" titleAccess="Increase amount"
                  onClick={() => debouncedHandleChange({
                    ...productData,
                    amount: productData.amount + 1
                  })}
                />
              </div>
            )}
          </Box>
        </CardContent>

        <Divider />

        {/* Footer */}
        <CardActions className="w-full flex justify-between">
          <IconButton aria-label={`Delete ${name}`} title={`Delete ${name}`} onClick={() => setIsConfirmDialogOpen(true)}>
            <DeleteForeverIcon />
          </IconButton>

          <Button
            size="small"
            aria-label={`Mark ${name} as checked`}
            title={`Mark ${name} as checked`}
            disabled={isPurchased}
          >
            <div className="flex gap-2 items-center">
              {isPurchased ? <><DoneAllIcon color="success" />
                <Typography color="success">You've got it!</Typography></> :
                <>
                  <Checkbox checked={isPurchased}
                    onChange={() => handleChange({
                      ...data,
                      isPurchased: true
                    })} />
                  <Typography color="primary">Add it!</Typography>
                </>
              }
            </div>
          </Button>
        </CardActions>
      </Card>

      {/* Confirmation delete modal */}
      <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}
        aria-labelledby="confirm-dialog-title">
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete {name} item?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
          <Button autoFocus
            onClick={() => {
              deleteItem(id, {
                onSuccess: () => {
                  setIsConfirmDialogOpen(false);
                  if (itemMode) router.push('/grocery-list/');
                  // add success alert
                },
                onError: (error) => {
                  console.error("Error deleting item:", error);
                  // add error alert
                },
              });
            }}
          >Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
