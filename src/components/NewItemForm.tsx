import { Box, Button, Checkbox, FormControlLabel, Input, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  name: string
  amount: number,
  isFood: boolean
}

export const NewItemForm = ({
  onSubmit
}: {
  onSubmit: SubmitHandler<Inputs>
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-3 h-full">
      <Box className="flex flex-col align-top flex-1">
        <Input size="medium" placeholder="apple" {...register("name", {
          required: {
            value: true,
            message: "Name field is required"
          }
        })} className="mb-4" />

        <Input size="medium" type="number" {...register("amount", {
          required: {
            value: true,
            message: "Amount field is required"
          }, min: {
            value: 1,
            message: "Amount must be greater than 0"
          },
          max: {
            value: 50,
            message: "Amount must be less than 50"
          }
        })} className="mb-4" />

        <Box alignItems="center">
          <Checkbox {...register("isFood")} />
          Is it food?
        </Box>

        {/* errors will return when field validation fails  */}
        <Typography color="error">{errors.name?.message?.toString()}</Typography>
        <Typography color="error">{errors.amount?.message?.toString()}</Typography>
      </Box>
      <Button type="submit" color={!isDirty || !isValid ? "error" : "primary"}>Submit</Button>
    </form>
  )
};