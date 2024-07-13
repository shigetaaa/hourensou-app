
import React, { FC } from 'react';
import { useForm } from '@inertiajs/react';
import DefaultLayout from '../Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';
import { User, PageProps } from '@/types';

interface Group {
  id: number;
  group_name: string;
  group_slug: string;
}

interface Report {
  id: number;
  date: string;
  title: string;
  what: string;
  who: string;
  when: string;
  where: string;
  memo: string;
  reply_type: string;
  reply_memo: string;
  reply_limit: string;
  is_report_published: boolean;
  group: Group;
}

interface Props extends PageProps {
  report: Report;
  auth: {
    user: User;
  };
}

const EditReport: FC<Props> = ({ report, auth }) => {
  const { data, setData, put, processing, errors } = useForm({
    date: report.date,
    title: report.title,
    what: report.what,
    who: report.who,
    when: report.when,
    where: report.where,
    memo: report.memo,
    reply_type: report.reply_type,
    reply_memo: report.reply_memo,
    reply_limit: report.reply_limit,
    is_published: report.is_report_published,
    group_slug: report.group.group_slug,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setData(name as any, newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('reports.update', { username: auth.user.username, group_slug: report.group.group_slug, id: report.id }));
  };

  return (
    <DefaultLayout auth={auth}>
      <Head title="報告を編集" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-full mx-auto">
          <h1 className="text-xl md:text-2xl font-bold mb-5 text-center">報告を編集</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">グループ</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <input className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2" value={report.group.group_name} readOnly />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">日付</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <input className="w-full border border-gray-300 rounded px-3 py-2" type="date" name="date" value={data.date} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">タイトル</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <input className="w-full border border-gray-300 rounded px-3 py-2" type="text" name="title" value={data.title} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">何をしていますか？またはしましたか？</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <textarea className="w-full border border-gray-300 rounded px-3 py-2" name="what" value={data.what} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">だれが？</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <input className="w-full border border-gray-300 rounded px-3 py-2" type="text" name="who" value={data.who} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">いつ？</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <input className="w-full border border-gray-300 rounded px-3 py-2" type="text" name="when" value={data.when} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">どこで？</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <input className="w-full border border-gray-300 rounded px-3 py-2" type="text" name="where" value={data.where} onChange={handleChange} required />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">何でも書いてください</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <textarea className="w-full border border-gray-300 rounded px-3 py-2" name="memo" value={data.memo} onChange={handleChange} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">リーダーにどうしてほしいか選んでください</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <select className="w-full border border-gray-300 rounded px-3 py-2" name="reply_type" value={data.reply_type} onChange={handleChange} required>
                    <option value="1">確認だけでOK</option>
                    <option value="2">返事がほしい</option>
                    <option value="3">わからない、少し困っている</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">どの事への返事がほしいですか？</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <textarea className="w-full border border-gray-300 rounded px-3 py-2" name="reply_memo" value={data.reply_memo} onChange={handleChange} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">いつまでに返事がほしいですか？</div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  <input className="w-full border border-gray-300 rounded px-3 py-2" type="date" name="reply_limit" value={data.reply_limit} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="flex justify-center p-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={data.is_published}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-lg font-medium">公開する</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
              disabled={processing}
            >
              {data.is_published ? '公開して更新' : '下書きとして更新'}
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditReport;

// import React, { FC } from 'react';
// import { useForm } from '@inertiajs/react';
// import DefaultLayout from '../Layouts/DefaultLayout';
// import { Head } from '@inertiajs/react';
// import {
//   Container, Heading, Box, Flex, Text, Input, Textarea, Select,
//   Button, Checkbox,
// } from "@chakra-ui/react";
// import { User, PageProps } from '@/types';

// interface Group {
//   id: number;
//   group_name: string;
//   group_slug: string;
// }

// interface Report {
//   id: number;
//   date: string;
//   title: string;
//   what: string;
//   who: string;
//   when: string;
//   where: string;
//   memo: string;
//   reply_type: string;
//   reply_memo: string;
//   reply_limit: string;
//   is_report_published: boolean;
//   group: Group;
// }

// interface Props extends PageProps {
//   report: Report;
//   auth: {
//     user: User;
//   };
// }

// const EditReport: FC<Props> = ({ report, auth }) => {
//   const { data, setData, put, processing, errors } = useForm({
//     date: report.date,
//     title: report.title,
//     what: report.what,
//     who: report.who,
//     when: report.when,
//     where: report.where,
//     memo: report.memo,
//     reply_type: report.reply_type,
//     reply_memo: report.reply_memo,
//     reply_limit: report.reply_limit,
//     is_published: report.is_report_published,
//     group_slug: report.group.group_slug,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
//     setData(name as any, newValue);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     put(route('reports.update', { username: auth.user.username, group_slug: report.group.group_slug, id: report.id }));
//   };

//   const commonFlexStyle = {
//     direction: { base: "column", lg: "row" } as const,
//     minHeight: "64px",
//     alignItems: { base: "stretch", lg: "center" },
//     gap: { base: 2, lg: 0 },
//   };

//   const labelStyle = {
//     w: { base: '100%', lg: '200px' },
//     fontWeight: "bold",
//     py: { base: 2, lg: 4 },
//     px: 3,
//     height: { base: "auto", lg: "100%" },
//     display: "flex",
//     alignItems: "center",
//   };

//   const inputStyle = {
//     flex: "1",
//     bg: "white",
//     display: "flex",
//     alignItems: "center",
//     minHeight: "100%",
//     width: "100%",
//     ml: { base: 0, lg: 4 },
//   };

//   return (
//     <DefaultLayout auth={auth}>
//       <Head title="報告を編集" />
//       <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
//         <Box maxW="100%" mx="auto">
//           <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={5} textAlign="center">
//             報告を編集
//           </Heading>
//           <form onSubmit={handleSubmit}>
//             <Flex {...commonFlexStyle} borderTop="1px solid" borderTopColor="gray.300">
//               <Text {...labelStyle}>グループ</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" value={report.group.group_name} readOnly />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>日付</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="date" name="date" value={data.date} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>タイトル</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="text" name="title" value={data.title} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>何をしていますか？またはしましたか？</Text>
//               <Box {...inputStyle}>
//                 <Textarea w="100%" name="what" value={data.what} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>だれが？</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="text" name="who" value={data.who} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>いつ？</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="text" name="when" value={data.when} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>どこで？</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="text" name="where" value={data.where} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>何でも書いてください</Text>
//               <Box {...inputStyle}>
//                 <Textarea w="100%" name="memo" value={data.memo} onChange={handleChange} />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>リーダーにどうしてほしいか選んでください</Text>
//               <Box {...inputStyle}>
//                 <Select w="100%" name="reply_type" value={data.reply_type} onChange={handleChange} required bg="white">
//                   <option value="1">確認だけでOK</option>
//                   <option value="2">返事がほしい</option>
//                   <option value="3">わからない、少し困っている</option>
//                 </Select>
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>どの事への返事がほしいですか？</Text>
//               <Box {...inputStyle}>
//                 <Textarea w="100%" name="reply_memo" value={data.reply_memo} onChange={handleChange} />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>いつまでに返事がほしいですか？</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="date" name="reply_limit" value={data.reply_limit} onChange={handleChange} />
//               </Box>
//             </Flex>
//             <Flex justifyContent="center" p={6}>
//               <Box>
//                 <Checkbox
//                   name="is_published"
//                   isChecked={data.is_published}
//                   onChange={handleChange}
//                   size="lg"
//                 >
//                   <Text fontSize="lg" fontWeight="medium">公開する</Text>
//                 </Checkbox>
//               </Box>
//             </Flex>
//             <Button
//               type="submit"
//               colorScheme="blue"
//               size="lg"
//               width="100%"
//               isLoading={processing}
//               disabled={processing}
//             >
//               {data.is_published ? '公開して更新' : '下書きとして更新'}
//             </Button>
//           </form>
//         </Box>
//       </Container>
//     </DefaultLayout>
//   );
// };

// export default EditReport;
