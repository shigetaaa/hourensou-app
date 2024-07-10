import React from 'react';
import { Head } from '@inertiajs/react';
import NavBar from '../Components/NavBar';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from '../theme';
import { PageProps } from '@/types';

interface DefaultLayoutProps extends PageProps {
  children: React.ReactNode;
  title?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, title, auth }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Head title={title || 'アプリケーション'} />
        <NavBar auth={auth} />
        <Box p={4}>
          {children}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default DefaultLayout;
