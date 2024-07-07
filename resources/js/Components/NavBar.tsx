import React from 'react';
import { Link } from '@inertiajs/react';
import { ChakraProvider, Container, Box, HStack, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import theme from '../theme';
import ApplicationLogo from './ApplicationLogo';

const NavBar: React.FC = () => {
  const username = "current_user"; // ここは実際のユーザー名を動的に取得する必要があります

  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" p={4} boxShadow="sm">
        <Container bg="white">
          <HStack bg="white" spacing={4} justifyContent="space-between">
            <Link href="/">
              <Box as={ApplicationLogo} h="9" w="auto" color="gray.800" bg="white" />
            </Link>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                color="gray.600"
                borderColor="gray.300"
                _hover={{ bg: 'gray.100' }}
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
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default NavBar;
