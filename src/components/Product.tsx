import { Item } from "@/types/groceries";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useState } from "react";
import { useDeleteGroceryItem } from "@/hooks/api-hooks";
import CheckIcon from '@mui/icons-material/Check';


interface ProductProps {
  data: Item;
  index: number;
}

export const Product = ({ data, index }: ProductProps) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { name, isFood, amount: savedAmount, isPurchased, id } = data;
  const [amount, setAmount] = useState(savedAmount);
  const { deleteItem, isLoading, isSuccess } = useDeleteGroceryItem();

  return (
    <>
      <Card className="flex-1" sx={
        { backgroundColor: index % 2 === 0 ? "rgba(127, 241, 227, 0.3)" : "rgba(0, 0, 0, 0.08)" }
      }>
        <CardHeader
          avatar={
            <Avatar aria-label={isFood ? "Food item" : "Non-food item"}>
              {isFood ? <BakeryDiningIcon /> : <CategoryIcon />}
            </Avatar>
          }
          action={
            <IconButton aria-label={`Delete ${name}`} title={`Delete ${name}`} onClick={() => setIsConfirmDialogOpen(true)}>
              <DeleteForeverIcon />
            </IconButton>
          }
          title={<Typography variant="h6" color="textPrimary">{name}</Typography>}
        />
        <Divider />
        <CardContent>
          <Typography color="textPrimary" fontWeight={600} marginBottom={2}>Qty {amount}</Typography>
          <div className="flex gap-2 items-center">
            <RemoveCircleIcon color="primary" aria-label="Decrease amount" titleAccess="Decrease amount" onClick={() => setAmount(amount - 1)} />
            <Slider aria-label="Amount" min={0} max={50} step={1} value={amount} valueLabelDisplay="auto" onChange={(_event, value) => setAmount(value as number)} />
            <AddCircleIcon color="primary" aria-label="Increase amount" titleAccess="Increase amount" onClick={() => setAmount(amount + 1)} />
          </div>

        </CardContent>
        <CardActions className="w-full flex justify-end">

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
                  <AddShoppingCartIcon color="primary" />
                  <Typography color="primary">Add it!</Typography>
                </>
              }
            </div>
          </Button>
        </CardActions>
      </Card>
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
                },
                onError: (error) => {
                  console.error("Error deleting item:", error);
                },
              });
            }}
          >Confirm</Button>
        </DialogActions>
      </Dialog >
      {isSuccess && (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Deletion was successful.
        </Alert>
      )
      }
    </>
  );
};
