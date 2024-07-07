import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { ChakraProvider, Container, Box, HStack, Button, Text } from '@chakra-ui/react';
import { InertiaLink } from '@inertiajs/inertia-react';
import theme from '../theme';

interface NavBarUnderProps {
  auth: PageProps['auth'];
}

const NavBarUnder: React.FC<NavBarUnderProps> = ({ auth }) => {
  const username = auth?.user?.name;

  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" p={2} boxShadow="sm">
        <Container bg="white">
          <HStack bg="white" spacing={4} justifyContent="center">

            <Button as={InertiaLink} href={`/reports/${username}/create`} colorScheme="blue">
              新規報告
            </Button>

          </HStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default NavBarUnder;
