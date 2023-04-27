import * as React from 'react';
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

type SkeletonProps = {
  type: 'list' | 'form' | 'summary'
} & MuiSkeletonProps;

const Skeleton: React.FC<SkeletonProps> = ({ type, ...props }) => {
  const getHeight = () => {
    switch (type) {
    case 'list':
      return { firstBar: 30, secondBar: 30, thirdBar: 30 };

    case 'form':
      return { firstBar: 60, secondBar: 60, thirdBar: 60 };

    case 'summary':
      return { firstBar: 30, secondBar: 60, thirdBar: 120 };

    default:
      return { firstBar: 30, secondBar: 30, thirdBar: 30 };
    }
  };

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12}>
        <MuiSkeleton {...props} variant='rounded' height={getHeight().firstBar} />
      </Grid>
      <Grid item xs={12}>
        <MuiSkeleton {...props} variant='rounded' animation='wave' height={getHeight().secondBar} sx={{ marginTop: 3 }} />
      </Grid>
      <Grid item xs={12}>
        <MuiSkeleton {...props} variant='rounded' height={getHeight().thirdBar} sx={{ marginTop: 3 }} />
      </Grid>
    </Grid>
  );
};

export default Skeleton;
