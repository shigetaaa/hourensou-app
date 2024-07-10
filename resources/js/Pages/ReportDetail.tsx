
// import '../../css/app.css';
import DefaultLayout from '../Layouts/DefaultLayout';
import React, { FC } from 'react';
import { Link, Head } from '@inertiajs/react';
import { ChakraProvider, Container, Heading, Box, Flex, Text } from "@chakra-ui/react";
import { PageProps } from '@/types';
import theme from '../theme';

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

// 共通スタイル
const commonFlexStyle = {
  direction: { base: "column", lg: "row" } as const,
  borderBottom: "1px solid",
  borderColor: "gray.200",
};

const labelStyle = {
  w: { base: '100%', lg: '200px' },
  bg: '#efddd8',
  fontWeight: "bold",
  py: 4,
  px: 3,
};

const contentStyle = {
  flex: "1",
  bg: "white",
  py: 4,
  px: 3,
};

const ReportDetail: FC<{ reportDetail?: { data: Reports; group_name: string; name: string }; auth: PageProps['auth'] }> = ({ reportDetail, auth }) => {
  if (!reportDetail || !reportDetail.data) {
    return <div>報告はありません。</div>;
  }

  const report = reportDetail.data;

  const getReplyTypeText = (replyType: number): string => {
    switch (replyType) {
      case 1:
        return "確認だけでOK";
      case 2:
        return "返事がほしい";
      case 3:
        return "わからない、少し困っている";
      default:
        return "不明";
    }
  };

  return (
    <DefaultLayout auth={auth}>
      <Head title={`${report.title} - ${reportDetail.group_name}`} />
      <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
        <main>
          <Box maxW="100%" mx="auto" p={5}>
            <header>
              <Box
                textAlign="center"
                mb={5}
                w={{ base: '95%', md: '80%', lg: '800px' }}
                mx="auto"
              >
                <Heading
                  as="h1"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  tabIndex={0}
                >{report.title}</Heading>
                <Text tabIndex={0}>{reportDetail.name}</Text>
              </Box>
            </header>

            <section aria-label="報告詳細" tabIndex={0}>
              <Flex direction="column">
                <Flex {...commonFlexStyle} borderTop="1px solid" borderTopColor="gray.200">
                  <Text {...labelStyle}>グループ名</Text>
                  <Text {...contentStyle}>{reportDetail.group_name}</Text>
                </Flex>
                <Flex {...commonFlexStyle}>
                  <Text {...labelStyle}>日付</Text>
                  <Text {...contentStyle}>{report.date}</Text>
                </Flex>
                <Flex {...commonFlexStyle}>
                  <Text {...labelStyle}>何をしましたか?</Text>
                  <Text {...contentStyle}>{report.what}</Text>
                </Flex>
                <Flex {...commonFlexStyle}>
                  <Text {...labelStyle}>だれが?</Text>
                  <Text {...contentStyle}>{report.who}</Text>
                </Flex>
                <Flex {...commonFlexStyle}>
                  <Text {...labelStyle}>いつ?</Text>
                  <Text {...contentStyle}>{report.when}</Text>
                </Flex>
                <Flex {...commonFlexStyle}>
                  <Text {...labelStyle}>どこで?</Text>
                  <Text {...contentStyle}>{report.where}</Text>
                </Flex>
                <Flex {...commonFlexStyle}>
                  <Text {...labelStyle}>何でも書いてください</Text>
                  <Text {...contentStyle}>{report.memo}</Text>
                </Flex>
                <Flex {...commonFlexStyle}>
                  <Text {...labelStyle}>リーダーにどうしてほしいか</Text>
                  <Text {...contentStyle}>{getReplyTypeText(report.reply_type)}</Text>
                </Flex>
              </Flex>
            </section>

            <section aria-label="リーダーの返信" tabIndex={0}>
              <Box
                textAlign="center"
                p={4}
                w={{ base: '95%', md: '80%', lg: '800px' }}
                mx="auto">
                <Heading
                  as="h2"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                >返信</Heading>
              </Box>
              <Flex {...commonFlexStyle} borderTop="1px solid" borderTopColor="gray.200">
                <Text {...labelStyle} bg='#d3e9f2'>リーダーの返信</Text>
                <Text {...contentStyle}>
                  {report.is_reply_published ? report.reply_content : "返信はまだです。"}
                </Text>
              </Flex>
            </section>
          </Box>
        </main>
      </Container>
    </DefaultLayout>
  );
};

export default ReportDetail;

// import '../../css/app.css';
// import DefaultLayout from '../Layouts/DefaultLayout';
// import React, { FC } from 'react';
// import { Link, Head } from '@inertiajs/react';
// import { ChakraProvider, Container, Heading, Box, Flex, Text } from "@chakra-ui/react";
// import { PageProps } from '@/types';
// import theme from '../theme';

// // 型定義
// export type Reports = {
//   id: number;
//   date: string;
//   title: string;
//   what: string;
//   who: string;
//   when: string;
//   where: string;
//   memo: string;
//   reply_type: number;
//   reply_memo: string;
//   reply_limit: string;
//   is_report_published: boolean;
//   reply_content: string;
//   is_reply_published: boolean;
//   group: {
//     id: number;
//     group_slug: string;
//     group_name: string;
//   };
// };

// // 共通スタイル
// const commonFlexStyle = {
//   direction: { base: "column", md: "row" } as const,
//   borderBottom: "1px solid",
//   borderColor: "gray.300",
// };

// const labelStyle = {
//   w: { base: '100%', lg: '200px' },
//   bg: '#efddd8',
//   fontWeight: "bold",
//   py: 4,
//   px: 3,
// };

// const contentStyle = {
//   flex: "1",
//   bg: "white",
//   py: 4,
//   px: 3,
// };

// const ReportDetail: FC<{ reportDetail?: { data: Reports; group_name: string; name: string }; auth: PageProps['auth'] }> = ({ reportDetail, auth }) => {
//   if (!reportDetail || !reportDetail.data) {
//     return <div>報告はありません。</div>;
//   }

//   const report = reportDetail.data;

//   const getReplyTypeText = (replyType: number): string => {
//     switch (replyType) {
//       case 1:
//         return "確認だけでOK";
//       case 2:
//         return "返事がほしい";
//       case 3:
//         return "わからない、少し困っている";
//       default:
//         return "不明";
//     }
//   };

//   return (
//     <DefaultLayout title="ホーム" auth={auth}>
//       <Head title={`${report.title} - ${reportDetail.group_name}`} />
//       <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
//         <Box as="main" maxW="100%" mx="auto" p={5}>
//           <Box
//             textAlign="center"
//             mb={5}
//             w={{ base: '95%', md: '80%', lg: '800px' }}
//             mx="auto"
//           >
//             <Text
//               as="h1"
//               fontSize={{ base: "xl", md: "2xl" }}
//               fontWeight="bold"
//             >{report.title}</Text>
//             <Text>{reportDetail.name}</Text>
//           </Box>
//           <Flex direction="column">
//             <Flex {...commonFlexStyle} borderTop="1px solid" borderTopColor="gray.500" >
//               <Text {...labelStyle}>グループ名</Text>
//               <Text {...contentStyle}>{reportDetail.group_name}</Text>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>日付</Text>
//               <Text {...contentStyle}>{report.date}</Text>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>何をしましたか?</Text>
//               <Text {...contentStyle}>{report.what}</Text>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>だれが?</Text>
//               <Text {...contentStyle}>{report.who}</Text>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>いつ?</Text>
//               <Text {...contentStyle}>{report.when}</Text>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>どこで?</Text>
//               <Text {...contentStyle}>{report.where}</Text>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>何でも書いてください</Text>
//               <Text {...contentStyle}>{report.memo}</Text>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>リーダーにどうしてほしいか</Text>
//               <Text {...contentStyle}>{getReplyTypeText(report.reply_type)}</Text>
//             </Flex>
//             <Box
//               textAlign="center"
//               p={4}
//               // mb={5}
//               w={{ base: '95%', md: '80%', lg: '800px' }}
//               mx="auto">
//               <Text
//                 as="h2"
//                 fontSize={{ base: "xl", md: "2xl" }}
//                 fontWeight="bold"
//               >返信</Text>
//             </Box>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>リーダーの返信</Text>
//               <Text {...contentStyle}>
//                 {report.is_reply_published ? report.reply_content : "返信はまだです。"}
//               </Text>
//             </Flex>
//           </Flex>
//         </Box>
//       </Container>
//     </DefaultLayout>
//   );
// };

// export default ReportDetail;
