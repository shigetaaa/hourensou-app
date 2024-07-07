import React from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { ChakraProvider, Container, Box, Flex, HStack, Menu, MenuButton, MenuList, MenuItem, IconButton, Text, Button, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import theme from '../theme';
import { InertiaLink } from '@inertiajs/inertia-react';
import ApplicationLogo from './ApplicationLogo';

interface NavBarProps {
  auth: PageProps['auth'];
}

const NavBar: React.FC<NavBarProps> = ({ auth }) => {
  const username = auth?.user?.name;
  const showLogo = useBreakpointValue({ base: false, md: true });

  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" p={4} boxShadow="sm">
        <Container bg="white" >
          <Flex justifyContent="space-between" alignItems="center" bg="white">
            <Box flex="1" bg="white" >
              {showLogo && (
                <Link href="/">
                  <Box as={ApplicationLogo} h="9" w="auto" color="gray.800" bg="white" />
                </Link>
              )}
            </Box>
            <HStack spacing={4} bg="white">
              <Link href={`/reports/${username}`}>
                {auth?.user && <Text bg="white">{auth.user.name}</Text>}
              </Link>
              <Button as={InertiaLink} href={`/reports/${username}/create`} colorScheme="blue">
                新規報告
              </Button>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  color="gray.600"
                  borderColor="gray.300"
                  bg="white"
                  _hover={{ bg: 'gray.50' }}
                />
                <MenuList>
                  <MenuItem as={Link} href={`/reports/${username}/create`}>
                    新規投稿
                  </MenuItem>
                  <MenuItem as={Link} href={`/favorites/${username}`}>
                    お気に入り
                  </MenuItem>
                  <MenuItem as={Link} href="/logout">
                    ログアウト
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default NavBar;



// import React from 'react';
// import { Link } from '@inertiajs/react';
// import { PageProps } from '@/types';
// import { ChakraProvider, Container, Box, HStack, Menu, MenuButton, MenuList, MenuItem, IconButton, Text, Button, useBreakpointValue } from '@chakra-ui/react';
// import { HamburgerIcon } from '@chakra-ui/icons';
// import theme from '../theme';
// import { InertiaLink } from '@inertiajs/inertia-react';
// import ApplicationLogo from './ApplicationLogo';

// interface NavBarProps {
//   auth: PageProps['auth'];
// }


// const NavBar: React.FC<NavBarProps> = ({ auth }) => {
//   const username = auth?.user?.name;
//   const showLogo = useBreakpointValue({ base: false, md: true });

//   return (
//     <ChakraProvider theme={theme}>
//       <Box bg="white" p={4} boxShadow="sm">
//         <Container bg="white">
//           <HStack bg="white" spacing={4} justifyContent="space-between">
//             {showLogo && (
//               <Link href="/">
//                 <Box as={ApplicationLogo} h="9" w="auto" color="gray.800" bg="white" />
//               </Link>
//             )}
//             <Box>
//               <HStack bg="white" spacing={4}>

//                 <Link href="/reports/${username}">
//                   {auth?.user && <Text bg="white">{auth.user.name}</Text>}
//                 </Link>
//                 <Button as={InertiaLink} href={`/reports/${username}/create`} colorScheme="blue">
//                   新規報告
//                 </Button>
//                 <Menu>
//                   <MenuButton
//                     as={IconButton}
//                     aria-label="Options"
//                     icon={<HamburgerIcon bg="white" />}
//                     variant="outline"
//                     color="gray.600"
//                     borderColor="gray.300"
//                     _hover={{ bg: 'gray.50' }}
//                   />
//                   <MenuList>
//                     <MenuItem as={Link} href={`/reports/${username}/create`}>
//                       新規投稿
//                     </MenuItem>
//                     <MenuItem as={Link} href={`/favorites/${username}`}>
//                       お気に入り
//                     </MenuItem>
//                     <MenuItem as={Link} href="/logout">
//                       ログアウト
//                     </MenuItem>
//                   </MenuList>
//                 </Menu>
//               </HStack>
//             </Box>

//           </HStack>
//         </Container>
//       </Box>
//     </ChakraProvider>
//   );
// };

// export default NavBar;
