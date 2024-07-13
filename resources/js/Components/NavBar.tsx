import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import ApplicationLogo from './ApplicationLogo';

interface NavBarProps {
  auth: PageProps['auth'];
}

const NavBar: React.FC<NavBarProps> = ({ auth }) => {
  const username = auth?.user?.username || '';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      // Inertiaのrouterを使用してログアウトを実行
      // この部分は@inertiajs/reactのuseFormフックを使用して実装することをお勧めします
    }
  };

  return (
    <nav className="bg-white p-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="hidden md:block">
            <ApplicationLogo className="h-8 w-auto text-gray-800" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              {auth?.user && <span>{auth.user.name}</span>}
            </Link>
            <Link
              href={route('reports.create', { username })}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              新規報告
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-900 border border-gray-500 hover:bg-gray-50 focus:outline-none"
                aria-label="Options"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Link
                    href={route('dashboard')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    報告の管理
                  </Link>
                  <Link
                    href={route('home')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    お気に入り
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    ログアウト
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;





// import React, { useState } from 'react';
// import { Link, router } from '@inertiajs/react';
// import { PageProps } from '@/types';
// import { InertiaLink } from '@inertiajs/inertia-react';
// import ApplicationLogo from './ApplicationLogo';

// interface NavBarProps {
//   auth: PageProps['auth'];
// }

// interface NavBarProps {
//   auth: {
//     user: {
//       name: string;
//       username: string;
//     } | null;
//   };
// }



// const NavBar: React.FC<NavBarProps> = ({ auth }) => {
//   const username = auth?.user?.username || '';
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     if (confirm('ログアウトしますか？')) {
//       router.post(route('logout'));
//     }
//   };

//   return (
//     <nav className="bg-white p-4 shadow-sm">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center">
//           <Link href="/" className="hidden md:block">
//             <ApplicationLogo className="h-8 w-auto text-gray-800" />
//           </Link>
//           <div className="flex items-center space-x-4">
//             <Link href={`/`} className="text-gray-700 hover:text-gray-900">
//               {auth?.user && <span>{auth.user.name}</span>}
//             </Link>
//             <Link
//               href={`/reports/${username}/create`}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//             >
//               新規報告
//             </Link>
//             <div className="relative">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-2 rounded-md text-gray-900 border border-gray-500 hover:bg-gray-50 focus:outline-none"
//                 aria-label="Options"
//               >
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//               {isMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//                   {[
//                     { label: '報告の管理', href: '/dashboard' },
//                     { label: 'お気に入り', href: `/` },
//                     { label: 'ログアウト', onClick: handleLogout }
//                   ].map((item) => (
//                     <Link
//                       key={item.label}
//                       href={item.href}
//                       onClick={item.onClick}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       {item.label}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;



// // import React from 'react';
// // import { Link, router } from '@inertiajs/react';
// // import { PageProps } from '@/types';
// // import { ChakraProvider, Container, Box, Flex, HStack, Menu, MenuButton, MenuList, MenuItem, IconButton, Text, Button, useBreakpointValue } from '@chakra-ui/react';
// // import { HamburgerIcon } from '@chakra-ui/icons';
// // import theme from '../theme';
// // import { InertiaLink } from '@inertiajs/inertia-react';
// // import ApplicationLogo from './ApplicationLogo';

// // interface NavBarProps {
// //   auth: PageProps['auth'];
// // }

// // const NavBar: React.FC<NavBarProps> = ({ auth }) => {
// //   const username = auth?.user?.username || '';
// //   const showLogo = useBreakpointValue({ base: false, md: true });

// //   const handleLogout = () => {
// //     if (confirm('ログアウトしますか？')) {
// //       router.post(route('logout'));
// //     }
// //   };

// //   return (
// //     <ChakraProvider theme={theme}>
// //       <Box bg="white" p={4} boxShadow="sm">
// //         <Container bg="white" >
// //           <Flex justifyContent="space-between" alignItems="center" bg="white">
// //             <Box flex="1" bg="white" >
// //               {showLogo && (
// //                 <Link href="/">
// //                   <Box as={ApplicationLogo} h="9" w="auto" color="gray.800" bg="white" />
// //                 </Link>
// //               )}
// //             </Box>
// //             <HStack spacing={4} bg="white">
// //               {/* <Link href={`/reports/${username}`}> */}
// //               <Link href={`/`}>
// //                 {auth?.user && <Text bg="white">{auth.user.name}</Text>}
// //               </Link>
// //               <Button as={InertiaLink} href={`/reports/${username}/create`} colorScheme="blue">
// //                 新規報告
// //               </Button>
// //               <Menu>
// //                 <MenuButton
// //                   as={IconButton}
// //                   aria-label="Options"
// //                   icon={<HamburgerIcon />}
// //                   variant="outline"
// //                   color="gray.900"
// //                   borderColor="gray.500"
// //                   bg="white"
// //                   _hover={{ bg: 'gray.50' }}
// //                 />
// //                 <MenuList>
// //                   {[
// //                     { label: '報告の管理', href: '/dashboard' },
// //                     { label: 'お気に入り', href: `/` },
// //                     { label: 'ログアウト', onClick: handleLogout }
// //                   ].map((item) => (
// //                     <MenuItem
// //                       key={item.label}
// //                       as={item.href ? Link : undefined}
// //                       href={item.href}
// //                       onClick={item.onClick}
// //                       p={4}
// //                       fontWeight="normal"
// //                       justifyContent="flex-start"
// //                     >
// //                       {item.label}
// //                     </MenuItem>
// //                   ))}

// //                 </MenuList>
// //               </Menu>
// //             </HStack>
// //           </Flex>
// //         </Container>
// //       </Box>
// //     </ChakraProvider>
// //   );
// // };

// // export default NavBar;
