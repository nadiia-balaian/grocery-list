import { Item } from "@/types/groceries";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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


interface ProductProps {
  data: Item;
}

export const Product = ({ data }: ProductProps) => {
  const { name, isFood, amount: savedAmount, isPurchased } = data;
  const [amount, setAmount] = useState(savedAmount);


  return (
    <Card className="flex-1">
      <CardHeader
        avatar={
          <Avatar aria-label={isFood ? "Food item" : "Non-food item"}>
            {isFood ? <BakeryDiningIcon /> : <CategoryIcon />}
          </Avatar>
        }
        action={
          <IconButton aria-label={`Delete ${name}`} title={`Delete ${name}`}>
            <DeleteForeverIcon />
          </IconButton>
        }
        title={<Typography variant="h6" color="textPrimary">{name}</Typography>}
      />
      <Divider />
      <CardContent>
        Qty {amount}
        <div className="flex gap-2 items-center">
          <RemoveCircleIcon color="primary" aria-label="Decrease amount" titleAccess="Decrease amount" onClick={() => setAmount(amount - 1)} />
          <Slider aria-label="Amount" min={0} max={50} step={1} value={amount} marks valueLabelDisplay="auto" onChange={(_event, value) => setAmount(value as number)} />
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
  );
};
