import React from 'react';
import { Link, router } from '@inertiajs/react';
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
  const username = auth?.user?.username || '';
  const showLogo = useBreakpointValue({ base: false, md: true });

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      router.post(route('logout'));
    }
  };

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
                  color="gray.900"
                  borderColor="gray.500"
                  bg="white"
                  _hover={{ bg: 'gray.50' }}
                />
                <MenuList>
                  {[
                    { label: '報告の管理', href: '/dashboard' },
                    { label: 'お気に入り', href: `/favorites/${username}` },
                    { label: 'ログアウト', onClick: handleLogout }
                  ].map((item) => (
                    <MenuItem
                      key={item.label}
                      as={item.href ? Link : undefined}
                      href={item.href}
                      onClick={item.onClick}
                      p={4}
                      fontWeight="normal"
                      justifyContent="flex-start"
                    >
                      {item.label}
                    </MenuItem>
                  ))}

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
