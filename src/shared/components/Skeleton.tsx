import * as React from 'react';
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from '@mui/material/Skeleton';

type SkeletonProps = MuiSkeletonProps;

const Skeleton: React.FC<SkeletonProps> = ({ ...props }) => {
  return (
    <>
      <MuiSkeleton variant='rounded' />
      <MuiSkeleton {...props} variant='rounded' animation='wave' height={100} sx={{ marginTop: 3 }} />
      <MuiSkeleton {...props} variant='rounded' height={200} sx={{ marginTop: 3 }} />
    </>
  );
};

export default Skeleton;
