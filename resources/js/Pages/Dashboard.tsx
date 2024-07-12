import DefaultLayout from '@/Layouts/DefaultLayout';
import React from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import {
    Box, Container, Heading, Text, VStack, HStack,
    Link as ChakraLink, Flex, Tabs, TabList, TabPanels,
    Tab, TabPanel, VisuallyHidden, Button, Menu,
    MenuButton, MenuList, MenuItem, IconButton
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import theme from '../theme';

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
    const { delete: destroy } = useForm();

    const handleDelete = (username: string, group_slug: string, id: number) => {
        if (confirm('本当に削除しますか？')) {
            destroy(route('reports.delete', { username, group_slug, id }), {
                preserveState: true,
            });
        }
    };

    return (
        <DefaultLayout title="報告の管理" auth={auth}>
            <Head title="報告の管理" />
            <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
                <Flex direction="column" minHeight="100vh">
                    <Box as="main" flex={1}>
                        <Heading as="h3" size="md" mb={4} mt={6}>あなたの報告一覧</Heading>
                        <VisuallyHidden>
                            <p>
                                次にタブキーを押すと、タブパネルに移動します。読みたい地域グループを選べます。左右の矢印キーでタブを移動します。読みたい地域にきたらタブキーを押すと、その地域の報告一覧に移動します。報告のタイトルをクリックすると、詳細ページに移動します。
                            </p>
                        </VisuallyHidden>
                        <Tabs>
                            <TabList>
                                {groupNames.map((groupName) => (
                                    <Tab key={groupName} fontWeight="medium">
                                        <Text>{groupName}</Text>
                                    </Tab>
                                ))}
                            </TabList>

                            <TabPanels>
                                {groupNames.map((groupName) => (
                                    <TabPanel key={groupName}>
                                        <VStack align="stretch" spacing={4}>
                                            {authUserReports[groupName].data.map((report) => (
                                                <Box key={report.id} borderColor="gray.500" borderWidth="1px" borderRadius="lg" p={4} bg="white">
                                                    <Flex justifyContent="space-between" alignItems="center">
                                                        <ChakraLink as={Link} href={`/reports/${report.username}/${authUserReports[groupName].group_slug}/${report.id}`}>
                                                            <Flex>
                                                                <Text fontWeight="medium" bg="white">{report.date}</Text>
                                                                <Text flex="1" bg="white" pl={4}>{report.name}</Text>
                                                            </Flex>
                                                            <Text py={1} bg="white">{report.title}</Text>
                                                        </ChakraLink>
                                                        <HStack>
                                                            <Button
                                                                as={Link}
                                                                href={route('reports.edit', { username: report.username, group_slug: authUserReports[groupName].group_slug, id: report.id })}
                                                                size="sm"
                                                                leftIcon={<EditIcon />}
                                                            >
                                                                編集
                                                            </Button>
                                                            <Menu>
                                                                <MenuButton
                                                                    as={IconButton}
                                                                    aria-label="メニュー"
                                                                    variant="outline"
                                                                    size="sm"
                                                                >
                                                                    <Box display="flex" flexDirection="column" alignItems="center">
                                                                        <ChevronDownIcon />
                                                                        <Text fontSize="xs" mt="-1">メニュー</Text>
                                                                    </Box>
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <MenuItem
                                                                        as={Link}
                                                                        href={route('reports.edit', { username: report.username, group_slug: authUserReports[groupName].group_slug, id: report.id })}
                                                                        icon={<EditIcon />}
                                                                    >
                                                                        編集
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() => handleDelete(report.username, authUserReports[groupName].group_slug, report.id)}
                                                                        icon={<DeleteIcon />}
                                                                    >
                                                                        削除
                                                                    </MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </HStack>
                                                    </Flex>
                                                </Box>
                                            ))}
                                        </VStack>
                                        <HStack spacing={4} mt={4}>
                                            {authUserReports[groupName].links.prev && (
                                                <ChakraLink
                                                    as={Link}
                                                    // href={authUserReports[groupName].links.prev}
                                                    href={authUserReports[groupName].links.prev as string | undefined}
                                                    preserveState
                                                    preserveScroll
                                                    only={['authUserReports']}
                                                >
                                                    &laquo; 前のページ
                                                </ChakraLink>
                                            )}
                                            {authUserReports[groupName].links.next && (
                                                <ChakraLink
                                                    as={Link}
                                                    // href={authUserReports[groupName].links.next}
                                                    href={authUserReports[groupName].links.next as string | undefined}
                                                    preserveState
                                                    preserveScroll
                                                    only={['authUserReports']}
                                                >
                                                    次のページ &raquo;
                                                </ChakraLink>
                                            )}
                                        </HStack>
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </Box>

                    <Box as="footer" bg="gray.100" py={4}>
                        <Text textAlign="center">&copy; 2024 レポートシステム. All rights reserved.</Text>
                    </Box>
                </Flex>
            </Container>
        </DefaultLayout>
    );
}
