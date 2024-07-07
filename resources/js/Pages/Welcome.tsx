
import '../../css/app.css';
// import '../../css/welcome.css';

import DefaultLayout from '../Layouts/DefaultLayout';
import React, { FC, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { InertiaLink } from '@inertiajs/inertia-react';
import { ChakraProvider, Box, Container, Heading, Text, VStack, HStack, Link as ChakraLink, Flex, VisuallyHidden } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import theme from '../theme';





type Reports = {
    id: number;
    username: string;
    random_id: string;
    date: string;
    title: string;
    what: string;
    who: string;
    when: string;
    where: string;
    memo: string;
    reply_type: number;
    reply_memo: string;
    reply_limit: string;
    is_report_published: boolean;
    reply_content: string;
    is_reply_published: boolean;
    group_slug: string;
};

type GroupReport = {
    data: Reports[];
    username: string;
    group_slug: string;
    links: {
        prev: string;
        next: string;
    };
};

type GroupReports = {
    [groupName: string]: GroupReport;
};



const Welcome = ({ auth, groupReports }: PageProps & { groupReports: GroupReports }) => {
    // デバッグ用
    console.log(groupReports);

    if (!groupReports) {
        return <div>報告はありません。</div>;
    }

    const groupNames = Object.keys(groupReports);

    return (
        <DefaultLayout title="ホーム">
            {/* <ChakraProvider theme={theme}> */}
            <Head title="Welcome" />
            <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
                <Flex direction="column" minHeight="100vh">
                    <Box as="header" bg="gray.100" py={4}>
                        <Flex maxW="container.xl" mx="auto" px={4} justifyContent="space-between" alignItems="center">
                            <Heading as="h1" size="lg">ほうれんそう</Heading>
                            {auth && <Text>{auth.user.name}</Text>}
                        </Flex>
                    </Box>

                    <Box as="main" flex={1} p={5}>
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
                                            {groupReports[groupName].data.map((report) => (
                                                <Box key={report.id} borderWidth="1px" borderRadius="lg" p={4}>
                                                    <ChakraLink as={Link} href={`/reports/${report.username}/${groupReports[groupName].group_slug}/${report.id}`}>
                                                        <Heading as="h3" size="md">{report.date}</Heading>
                                                        <Text>{report.title}</Text>
                                                    </ChakraLink>
                                                </Box>
                                            ))}
                                        </VStack>
                                        <HStack spacing={4} mt={4}>
                                            {groupReports[groupName].links.prev && (
                                                <ChakraLink
                                                    as={Link}
                                                    href={groupReports[groupName].links.prev}
                                                    preserveState
                                                    preserveScroll
                                                    only={[`groupReports.${groupName}`]}
                                                >
                                                    &laquo; 前のページ
                                                </ChakraLink>
                                            )}
                                            {groupReports[groupName].links.next && (
                                                <ChakraLink
                                                    as={Link}
                                                    href={groupReports[groupName].links.next}
                                                    preserveState
                                                    preserveScroll
                                                    only={[`groupReports.${groupName}`]}
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
            {/* </ChakraProvider> */}
        </DefaultLayout>
    );
};


export default Welcome;
