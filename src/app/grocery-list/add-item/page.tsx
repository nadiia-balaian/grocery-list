'use client';

import { useAddGroceryItem } from '@/hooks/api-hooks';
import { Item } from '@/types/groceries';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Paper, Typography } from '@mui/material';
import { NewItemForm } from '@/components/NewItemForm';
import { useRouter } from 'next/navigation';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const AddItem: React.FC = () => {
  const { addItem, isLoading } = useAddGroceryItem();
  const router = useRouter();

  const handleAddItem = ({
    name,
    amount,
    isFood,
  }: {
    name: string;
    amount: number;
    isFood: boolean
  }) => {
    const newItem: Item = {
      id: uuidv4(),
      name: name,
      amount: amount,
      isFood,
      isPurchased: false,
    };

    addItem({ ...newItem }, {
      onSuccess: () => {
        router.push('/grocery-list');
      },
      onError: (error: any) => {
        console.error('Error adding item:', error);
      },
    });
  };

  return (
    <div className='min-w-full' >
      <Paper square={false} className='p-4' sx={{
        borderRadius: '12px',
        height: '65vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        <div className='flex justify-between items-center shadow-md mx-[-1rem] px-[1rem] pb-2 z-[1]'>
          <Typography variant='h4' className='text-primary'>Add new Item</Typography>
          <ExitToAppIcon color="primary" onClick={() => router.push('/grocery-list')} />
        </div>
        <NewItemForm onSubmit={handleAddItem} />
      </Paper>
    </div >
  );
};

export default AddItem;
