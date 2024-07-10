
// LoginLayout.tsx
import React from 'react';
import { Box, Container } from '@chakra-ui/react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        {children}
      </Container>
    </Box>
  );
};

export default LoginLayout;





// LoginLayout.tsx
// import React from 'react';
// import { ChakraProvider, Box, Container, Flex, useColorModeValue } from '@chakra-ui/react';

// interface LoginLayoutProps {
//   children: React.ReactNode;
// }

// const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
//   return (
//     <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
//       <Container maxW="md" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
//         {children}
//       </Container>
//     </Box>
//   );
// };

// export default LoginLayout;
