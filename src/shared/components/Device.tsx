import * as React from 'react';
import * as rdd from 'react-device-detect';
import Box from '@mui/material/Box';

type DeviceProps = {
  children: (props: typeof rdd) => React.ReactNode;
};

const Device: React.FC<DeviceProps> = ({ ...props }) => {
  return (
    <Box>
      {props.children(rdd)}
    </Box>
  );
};

export default Device;
