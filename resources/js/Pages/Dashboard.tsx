
import DefaultLayout from '@/Layouts/DefaultLayout';
import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

type Report = {
    id: number;
    date: string;
    title: string;
    group_slug: string;
    username: string;
    name: string;
};

type GroupReport = {
    data: Report[];
    group_slug: string;
    links: {
        prev: string | null;
        next: string | null;
    };
};

type UserGroupReports = {
    [groupName: string]: GroupReport;
};

interface DashboardProps extends PageProps {
    authUserReports: UserGroupReports;
}

export default function Dashboard({ auth, authUserReports }: DashboardProps) {
    const groupNames = Object.keys(authUserReports);
    const [activeTab, setActiveTab] = useState(groupNames[0]);
    const { delete: destroy } = useForm();
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const handleDelete = (username: string, group_slug: string, id: number) => {
        if (confirm('本当に削除しますか？')) {
            destroy(route('reports.delete', { username, group_slug, id }), {
                preserveState: true,
            });
        }
    };

    const toggleMenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <DefaultLayout title="報告の管理" auth={auth}>
            <Head title="報告の管理" />
            <div className="container mx-auto px-4 md:max-w-3xl lg:max-w-4xl">
                <div className="flex flex-col min-h-screen">
                    <main className="flex-1">
                        <h3 className="text-xl font-semibold mb-4 mt-6">あなたの報告一覧</h3>
                        <p className="sr-only">
                            次にタブキーを押すと、タブパネルに移動します。読みたい地域グループを選べます。左右の矢印キーでタブを移動します。読みたい地域にきたらエンターキーを押すと、その地域の報告一覧に移動します。報告のタイトルをクリックすると、詳細ページに移動します。
                        </p>
                        <div className="mb-4">
                            <div className="flex border-b border-gray-200">
                                {groupNames.map((groupName) => (
                                    <button
                                        key={groupName}
                                        onClick={() => setActiveTab(groupName)}
                                        className={`px-4 py-2 font-medium text-lg focus:outline-none focus:text-blue-500 focus:border-blue-500 hover:text-blue-500 ${activeTab === groupName ? 'border-b-2 border-blue-500 text-blue-500' : ''
                                            }`}
                                    >
                                        {groupName}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4">
                                {authUserReports[activeTab].data.map((report) => (
                                    <div key={report.id} className="border border-gray-500 rounded-lg p-4 bg-white mb-4">
                                        <div className="flex justify-between items-center">
                                            <Link href={`/reports/${report.username}/${authUserReports[activeTab].group_slug}/${report.id}`} className="flex-1">
                                                <div className="flex">
                                                    <span className="font-medium bg-white">{report.date}</span>
                                                    <span className="flex-1 bg-white pl-4">{report.name}</span>
                                                </div>
                                                <p className="py-1 bg-white">{report.title}</p>
                                            </Link>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('reports.edit', { username: report.username, group_slug: authUserReports[activeTab].group_slug, id: report.id })}
                                                    className="hidden sm:inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                                                >
                                                    編集
                                                </Link>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => toggleMenu(report.id)}
                                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded text-sm flex items-center"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                    {openMenuId === report.id && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                                            <Link
                                                                href={route('reports.edit', { username: report.username, group_slug: authUserReports[activeTab].group_slug, id: report.id })}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 sm:hidden"
                                                            >
                                                                編集
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(report.username, authUserReports[activeTab].group_slug, report.id)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                削除
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex space-x-4 mt-4">
                                    {authUserReports[activeTab].links.prev && (
                                        <Link
                                            href={authUserReports[activeTab].links.prev as string}
                                            preserveState
                                            preserveScroll
                                            only={['authUserReports']}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            &laquo; 前のページ
                                        </Link>
                                    )}
                                    {authUserReports[activeTab].links.next && (
                                        <Link
                                            href={authUserReports[activeTab].links.next as string}
                                            preserveState
                                            preserveScroll
                                            only={['authUserReports']}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            次のページ &raquo;
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </DefaultLayout>
    );
}





// import DefaultLayout from '@/Layouts/DefaultLayout';
// import React from 'react';
// import { Link, Head, useForm } from '@inertiajs/react';
// import { PageProps } from '@/types';
// import {
//     Box, Container, Heading, Text, VStack, HStack,
//     Link as ChakraLink, Flex, Tabs, TabList, TabPanels,
//     Tab, TabPanel, VisuallyHidden, Button, Menu,
//     MenuButton, MenuList, MenuItem, IconButton
// } from '@chakra-ui/react';
// import { EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
// import theme from '../theme';

// type Report = {
//     id: number;
//     date: string;
//     title: string;
//     group_slug: string;
//     username: string;
//     name: string;
// };

// type GroupReport = {
//     data: Report[];
//     group_slug: string;
//     links: {
//         prev: string | null;
//         next: string | null;
//     };
// };

// type UserGroupReports = {
//     [groupName: string]: GroupReport;
// };

// interface DashboardProps extends PageProps {
//     authUserReports: UserGroupReports;
// }

// export default function Dashboard({ auth, authUserReports }: DashboardProps) {
//     const groupNames = Object.keys(authUserReports);
//     const { delete: destroy } = useForm();

//     const handleDelete = (username: string, group_slug: string, id: number) => {
//         if (confirm('本当に削除しますか？')) {
//             destroy(route('reports.delete', { username, group_slug, id }), {
//                 preserveState: true,
//             });
//         }
//     };

//     return (
//         <DefaultLayout title="報告の管理" auth={auth}>
//             <Head title="報告の管理" />
//             <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
//                 <Flex direction="column" minHeight="100vh">
//                     <Box as="main" flex={1}>
//                         <Heading as="h3" size="md" mb={4} mt={6}>あなたの報告一覧</Heading>
//                         <VisuallyHidden>
//                             <p>
//                                 次にタブキーを押すと、タブパネルに移動します。読みたい地域グループを選べます。左右の矢印キーでタブを移動します。読みたい地域にきたらタブキーを押すと、その地域の報告一覧に移動します。報告のタイトルをクリックすると、詳細ページに移動します。
//                             </p>
//                         </VisuallyHidden>
//                         <Tabs>
//                             <TabList>
//                                 {groupNames.map((groupName) => (
//                                     <Tab key={groupName} fontWeight="medium">
//                                         <Text>{groupName}</Text>
//                                     </Tab>
//                                 ))}
//                             </TabList>

//                             <TabPanels>
//                                 {groupNames.map((groupName) => (
//                                     <TabPanel key={groupName}>
//                                         <VStack align="stretch" spacing={4}>
//                                             {authUserReports[groupName].data.map((report) => (
//                                                 <Box key={report.id} borderColor="gray.500" borderWidth="1px" borderRadius="lg" p={4} bg="white">
//                                                     <Flex justifyContent="space-between" alignItems="center">
//                                                         <ChakraLink as={Link} href={`/reports/${report.username}/${authUserReports[groupName].group_slug}/${report.id}`}>
//                                                             <Flex>
//                                                                 <Text fontWeight="medium" bg="white">{report.date}</Text>
//                                                                 <Text flex="1" bg="white" pl={4}>{report.name}</Text>
//                                                             </Flex>
//                                                             <Text py={1} bg="white">{report.title}</Text>
//                                                         </ChakraLink>
//                                                         <HStack>
//                                                             <Button
//                                                                 as={Link}
//                                                                 href={route('reports.edit', { username: report.username, group_slug: authUserReports[groupName].group_slug, id: report.id })}
//                                                                 size="sm"
//                                                                 leftIcon={<EditIcon />}
//                                                             >
//                                                                 編集
//                                                             </Button>
//                                                             <Menu>
//                                                                 <MenuButton
//                                                                     as={IconButton}
//                                                                     aria-label="メニュー"
//                                                                     variant="outline"
//                                                                     size="sm"
//                                                                 >
//                                                                     <Box display="flex" flexDirection="column" alignItems="center">
//                                                                         <ChevronDownIcon />
//                                                                         <Text fontSize="xs" mt="-1">メニュー</Text>
//                                                                     </Box>
//                                                                 </MenuButton>
//                                                                 <MenuList>
//                                                                     <MenuItem
//                                                                         as={Link}
//                                                                         href={route('reports.edit', { username: report.username, group_slug: authUserReports[groupName].group_slug, id: report.id })}
//                                                                         icon={<EditIcon />}
//                                                                     >
//                                                                         編集
//                                                                     </MenuItem>
//                                                                     <MenuItem
//                                                                         onClick={() => handleDelete(report.username, authUserReports[groupName].group_slug, report.id)}
//                                                                         icon={<DeleteIcon />}
//                                                                     >
//                                                                         削除
//                                                                     </MenuItem>
//                                                                 </MenuList>
//                                                             </Menu>
//                                                         </HStack>
//                                                     </Flex>
//                                                 </Box>
//                                             ))}
//                                         </VStack>
//                                         <HStack spacing={4} mt={4}>
//                                             {authUserReports[groupName].links.prev && (
//                                                 <ChakraLink
//                                                     as={Link}
//                                                     // href={authUserReports[groupName].links.prev}
//                                                     href={authUserReports[groupName].links.prev as string | undefined}
//                                                     preserveState
//                                                     preserveScroll
//                                                     only={['authUserReports']}
//                                                 >
//                                                     &laquo; 前のページ
//                                                 </ChakraLink>
//                                             )}
//                                             {authUserReports[groupName].links.next && (
//                                                 <ChakraLink
//                                                     as={Link}
//                                                     // href={authUserReports[groupName].links.next}
//                                                     href={authUserReports[groupName].links.next as string | undefined}
//                                                     preserveState
//                                                     preserveScroll
//                                                     only={['authUserReports']}
//                                                 >
//                                                     次のページ &raquo;
//                                                 </ChakraLink>
//                                             )}
//                                         </HStack>
//                                     </TabPanel>
//                                 ))}
//                             </TabPanels>
//                         </Tabs>
//                     </Box>

//                     <Box as="footer" bg="gray.100" py={4}>
//                         <Text textAlign="center">&copy; 2024 レポートシステム. All rights reserved.</Text>
//                     </Box>
//                 </Flex>
//             </Container>
//         </DefaultLayout>
//     );
// }
