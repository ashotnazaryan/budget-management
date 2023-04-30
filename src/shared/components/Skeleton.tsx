import * as React from 'react';
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

type SkeletonProps = {
  type: 'list' | 'form' | 'summary' | 'circular'
} & MuiSkeletonProps;

const Skeleton: React.FC<SkeletonProps> = ({ type, ...props }) => {
  const isCircular = type === 'circular';

  const getSize = () => {
    switch (type) {
    case 'list':
      return { firstBar: 30, secondBar: 30, thirdBar: 30 };

    case 'form':
      return { firstBar: 60, secondBar: 60, thirdBar: 60 };

    case 'summary':
      return { firstBar: 30, secondBar: 60, thirdBar: 120 };

    case 'circular':
      return { firstBar: 64, secondBar: 64, thirdBar: 64 };

    default:
      return { firstBar: 30, secondBar: 30, thirdBar: 30 };
    }
  };

  return isCircular
    ? (
      <Grid container columnGap={4}>
        <Grid item width={100}>
          <MuiSkeleton {...props} variant='circular' height={getSize().firstBar} width={getSize().firstBar} />
        </Grid>
        <Grid item width={100}>
          <MuiSkeleton {...props} variant='circular' height={getSize().secondBar} width={getSize().secondBar} />
        </Grid>
        <Grid item width={100}>
          <MuiSkeleton {...props} variant='circular' height={getSize().thirdBar} width={getSize().firstBar} />
        </Grid>
      </Grid>
    )
    : (
      <Grid container justifyContent='center' rowGap={4}>
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
