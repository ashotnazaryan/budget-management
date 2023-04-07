import * as React from 'react';
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

type SkeletonProps = MuiSkeletonProps;

const Skeleton: React.FC<SkeletonProps> = ({ ...props }) => {
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12}>
        <MuiSkeleton variant='rounded' />
      </Grid>
      <Grid item xs={12}>
        <MuiSkeleton {...props} variant='rounded' animation='wave' height={50} sx={{ marginTop: 3 }} />
      </Grid>
      <Grid item xs={12}>
        <MuiSkeleton {...props} variant='rounded' height={100} sx={{ marginTop: 3 }} />
      </Grid>
    </Grid>
  );
};

export default Skeleton;
