
import DefaultLayout from '../Layouts/DefaultLayout';
import React, { FC, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { InertiaLink } from '@inertiajs/inertia-react';
import { ChakraProvider, Box, Container, Heading, Text, VStack, HStack, Link as ChakraLink, Flex, VisuallyHidden, Button } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import theme from '../theme';


type Reports = {
    id: number;
    username: string;
    name: string;
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
    group_id: number; // 追加
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
        <DefaultLayout title="ホーム" auth={auth}>
            <Head title="Welcome" />
            <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
                <Flex direction="column" minHeight="100vh">
                    <Box as="main" flex={1}>
                        {/* キーボード操作のガイダンス */}
                        <VisuallyHidden>
                            <p>
                                次にタブキーを押すと、タブパネルに移動します。読みたい地域グループを選べます。左右の矢印キーでタブを移動します。読みたい地域にきたらタブキーを押すと、その地域の報告一覧に移動します。報告のタイトルをクリックすると、詳細ページに移動します。
                            </p>
                        </VisuallyHidden>
                        <Tabs>
                            <TabList>
                                {groupNames.map((groupName) => (
                                    <Tab key={groupName} fontWeight="medium">
                                        <Text>
                                            {groupName}
                                        </Text>
                                    </Tab>
                                ))}
                            </TabList>

                            <TabPanels>
                                {groupNames.map((groupName) => (
                                    <TabPanel key={groupName}>
                                        <VStack align="stretch" spacing={4}>
                                            {groupReports[groupName].data.map((report) => (
                                                <Box key={report.id} borderColor="gray.500" borderWidth="1px" borderRadius="lg" p={4} bg="white">
                                                    <ChakraLink as={Link} href={`/reports/${report.username}/${groupReports[groupName].group_slug}/${report.id}`}>
                                                        <Flex >
                                                            <Text fontWeight="medium" bg="white">{report.date}</Text>
                                                            <Text flex="1" bg="white" pl={4}>{report.name}</Text>
                                                        </Flex>
                                                        <Text py={1} bg="white">{report.title}</Text>
                                                    </ChakraLink>
                                                </Box>
                                            ))}
                                        </VStack>
                                        <HStack spacing={4} mt={4}>
                                            {groupReports[groupName].links.prev && (
                                                <Link
                                                    href={groupReports[groupName].links.prev}
                                                    preserveState
                                                    preserveScroll
                                                    data={{
                                                        group_id: groupReports[groupName].group_id
                                                    }}
                                                >
                                                    &laquo; 前のページ
                                                </Link>
                                            )}
                                            {groupReports[groupName].links.next && (
                                                <Link
                                                    href={groupReports[groupName].links.next}
                                                    preserveState
                                                    preserveScroll
                                                    data={{
                                                        group_id: groupReports[groupName].group_id
                                                    }}
                                                >
                                                    次のページ &raquo;
                                                </Link>
                                            )}
                                        </HStack>
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Flex>
            </Container>
        </DefaultLayout>
    );
};


export default Welcome;
