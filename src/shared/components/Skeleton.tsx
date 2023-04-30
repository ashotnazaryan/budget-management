import * as React from 'react';
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

type SkeletonProps = {
  type: 'list' | 'form' | 'summary' | 'circular'
} & MuiSkeletonProps;

const Skeleton: React.FC<SkeletonProps> = ({ type, ...props }) => {
  const isCircular = type === 'circular';
  const isForm = type === 'form';

  const getSize = () => {
    switch (type) {
    case 'list':
      return { firstBar: 40, secondBar: 40, thirdBar: 40 };

    case 'form':
      return { firstBar: 56, secondBar: 56, thirdBar: 56 };

    case 'summary':
      return { firstBar: 30, secondBar: 60, thirdBar: 120 };

    case 'circular':
      return { firstBar: 64, secondBar: 64, thirdBar: 64 };

    default:
      return { firstBar: 40, secondBar: 40, thirdBar: 40 };
    }
  };

  return isCircular
    ? (
      <Grid container columnGap={4}>
        <Grid item width={100} display='flex' justifyContent='center'>
          <MuiSkeleton {...props} variant='circular' height={getSize().firstBar} width={getSize().firstBar} />
        </Grid>
        <Grid item width={100} display='flex' justifyContent='center'>
          <MuiSkeleton {...props} variant='circular' height={getSize().secondBar} width={getSize().secondBar} />
        </Grid>
        <Grid item width={100} display='flex' justifyContent='center'>
          <MuiSkeleton {...props} variant='circular' height={getSize().thirdBar} width={getSize().firstBar} />
        </Grid>
      </Grid>
    )
    : (
      <Grid container justifyContent='center' rowGap={isForm ? 5 : 2}>
        <Grid item xs={12}>
          <MuiSkeleton {...props} variant='rounded' height={getSize().firstBar} />
        </Grid>
        <Grid item xs={12}>
          <MuiSkeleton {...props} variant='rounded' animation='wave' height={getSize().secondBar} />
        </Grid>
        <Grid item xs={12}>
          <MuiSkeleton {...props} variant='rounded' height={getSize().thirdBar} />
        </Grid>
      </Grid>
    );
};

export default Skeleton;
