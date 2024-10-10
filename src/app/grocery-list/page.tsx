'use client';
import { GroceryList } from '@/components/GroceryList';
import { Box, IconButton, Modal, Paper, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const GroceriesPage = () => {
  const router = useRouter();

  const handleAddItemClick = () => {
    router.push('/grocery-list/add-item');
  };

  return (
    <div className='min-w-full'>
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
          <Typography variant='h4' className='text-primary'>My grocery list</Typography>
          <IconButton aria-label='Add item' title='Add item' onClick={handleAddItemClick}>
            <AddCircleIcon color="primary" />
          </IconButton>
        </div>
        <GroceryList />
      </Paper>
    </div>

  );
};

export default GroceriesPage;
