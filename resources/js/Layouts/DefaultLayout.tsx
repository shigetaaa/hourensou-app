import React from 'react';
import { Head } from '@inertiajs/react';
import NavBar from '../Components/NavBar';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from '../theme';

const DefaultLayout: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Head title={title || 'アプリケーション'} />
        <NavBar />
        <Box p={4}>
          {children}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default DefaultLayout;
