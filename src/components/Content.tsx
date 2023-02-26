import Box from '@mui/system/Box';
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import Home from './Home';

const Content: React.FC = () => {
  return (
    <Box sx={{ paddingY: 2, paddingX: 4 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Box>
  );
};

export default Content;
