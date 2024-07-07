import '../../css/app.css';
import React, { FC } from 'react';
import { Link, Head } from '@inertiajs/react';
import { ChakraProvider, Container, Heading, Box, Flex, Text } from "@chakra-ui/react";

// 型定義
export type Reports = {
  id: number;
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
  group: {
    id: number;
    group_slug: string;
    group_name: string;
  };
};

const ReportDetail: FC<{ report?: Reports }> = ({ report }) => {
  if (!report) {
    return <div>報告はありません。</div>;
  }

  return (
    <ChakraProvider>
      <Head title={`${report.title} - ${report.group.group_name}`} />
      <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
        <Box maxW="100%" mx="auto" p={5}>
          <Flex direction="column">
            <Flex direction={{ base: "column", md: "row" }}>
              <Box w='200px' bg='green.500' fontWeight="bold" pl={2} pr={2}>日付</Box>
              <Box flex='1' bg='tomato' pl={2} pr={2}><Text>2024-07-03</Text></Box>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }}>
              <Text fontWeight="bold">何をしましたか?</Text>
              <Text>テスト1</Text>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }}>
              <Text fontWeight="bold">だれが?</Text>
              <Text>松田さん</Text>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }}>
              <Text fontWeight="bold">いつ?</Text>
              <Text>2 週間前</Text>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }}>
              <Text fontWeight="bold">どこで?</Text>
              <Text>テスト1</Text>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }}>
              <Text fontWeight="bold">伝えたいこと聞きたいこと</Text>
              <Text>テスト1</Text>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }}>
              <Text fontWeight="bold">リーダーにしてほしいこと</Text>
              <Text>2</Text>
            </Flex>
            <Flex direction={{ base: "column", md: "row" }}>
              <Text fontWeight="bold">リーダーの返信</Text>
              <Text>返信はまだです</Text>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </ChakraProvider>


  );
};

export default ReportDetail;
