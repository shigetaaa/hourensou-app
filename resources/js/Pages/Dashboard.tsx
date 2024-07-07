

// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import React, { FC, useState } from 'react';
// import { Link, Head } from '@inertiajs/react';
// import { PageProps } from '@/types';
// import { InertiaLink } from '@inertiajs/inertia-react';
// import { ChakraProvider, Box, Container, Heading, Text, VStack, HStack, Link as ChakraLink, Flex, VisuallyHidden } from '@chakra-ui/react';
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
// import theme from '../theme';

import '../../css/app.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { ChakraProvider, Box, Container, Heading, Text, VStack, HStack, Link as ChakraLink, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, VisuallyHidden } from '@chakra-ui/react';
import theme from '../theme';

type Report = {
    id: number;
    random_id: string;
    date: string;
    title: string;
    group_slug: string;
    username: string;
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

    return (
        <ChakraProvider theme={theme}>
            <Head title="ダッシュボード" />
            <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
                <AuthenticatedLayout
                    user={auth.user}
                    header={<Heading as="h2" size="lg">ダッシュボード</Heading>}
                >
                    <Box mt={6}>
                        <Heading as="h3" size="md" mb={4}>あなたの報告一覧</Heading>
                        {/* キーボード操作のガイダンス */}
                        <VisuallyHidden>
                            <p>
                                次にタブキーを押すと、タブパネルに移動します。読みたい地域グループを選べます。左右の矢印キーでタブを移動します。読みたい地域にきたらタブキーを押すと、その地域の報告一覧に移動します。報告のタイトルをクリックすると、詳細ページに移動します。
                            </p>
                        </VisuallyHidden>
                        <Tabs>
                            <TabList>
                                {groupNames.map((groupName) => (
                                    <Tab key={groupName}>{groupName}</Tab>
                                ))}
                            </TabList>

                            <TabPanels>
                                {groupNames.map((groupName) => (
                                    <TabPanel key={groupName}>
                                        <VStack align="stretch" spacing={4}>
                                            {authUserReports[groupName].data.map((report) => (
                                                <Box key={report.id} borderWidth="1px" borderRadius="lg" p={4}>

                                                    <ChakraLink as={Link} href={`/reports/${report.username}/${authUserReports[groupName].group_slug}/${report.id}`}>
                                                        <Text fontWeight="bold">{report.date}</Text>
                                                        <Text>{report.title}</Text>
                                                    </ChakraLink>
                                                </Box>
                                            ))}
                                        </VStack>
                                        <HStack spacing={4} mt={4}>
                                            {authUserReports[groupName].links.prev && (
                                                <ChakraLink
                                                    as={Link}
                                                    href={authUserReports[groupName].links.prev}
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
                                                    href={authUserReports[groupName].links.next}
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
                </AuthenticatedLayout>
            </Container>
        </ChakraProvider>
    );
}
