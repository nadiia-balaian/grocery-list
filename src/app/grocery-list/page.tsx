import { GroceryList } from '@/components/GroceryList';
import { Paper, Typography } from '@mui/material';
import React from 'react';

const GroceriesPage = () => {
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
        <Typography variant='h4' className='text-primary shadow-md' marginBottom={2} sx={{
          margin: '0 -1rem',
          padding: '1rem',
          zIndex: 1,
        }}>My grocery list</Typography>
        <GroceryList />
      </Paper>
    </div>

  );
};

export default GroceriesPage;
