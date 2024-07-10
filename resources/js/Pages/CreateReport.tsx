import React, { FC, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import DefaultLayout from '../Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';
import {
  Container, Heading, Box, Flex, Text, Input, Textarea, Select,
  Button, VStack, Checkbox, Center,
} from "@chakra-ui/react";
import { PageProps } from '@/types';

interface Group {
  id: number;
  group_name: string;
  group_slug: string;
}

interface User {
  id: number;
  username: string;
  name: string;
}

interface Props extends PageProps {
  user: User;
  groups: Group[];
}

const CreateReport: FC<Props> = ({ user, groups, auth }) => {
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    what: '',
    who: '',
    when: '',
    where: '',
    memo: '',
    reply_type: '1',
    reply_memo: '',
    reply_limit: '',
    is_published: false,
    group_slug: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `/reports/${user.username}/${formData.group_slug}`;
    Inertia.post(url, formData);
  };

  // 共通スタイリング
  const commonFlexStyle = {
    direction: { base: "column", lg: "row" } as const,
    minHeight: "64px",
    alignItems: { base: "stretch", lg: "center" },
    gap: { base: 2, lg: 0 },
  };

  const labelStyle = {
    w: { base: '100%', lg: '200px' },
    fontWeight: "bold",
    py: { base: 2, lg: 4 },
    px: 3,
    height: { base: "auto", lg: "100%" },
    display: "flex",
    alignItems: "center",
  };

  const inputStyle = {
    flex: "1",
    bg: "white",
    display: "flex",
    alignItems: "center",
    minHeight: "100%",
    width: "100%",
    ml: { base: 0, lg: 4 },
  };

  return (
    <DefaultLayout auth={auth} >
      <Head title="報告を作る" />
      <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }} >
        <Box maxW="100%" mx="auto"  >
          <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={5} textAlign="center">
            報告を作る
          </Heading>
          <form onSubmit={handleSubmit} >
            <Flex {...commonFlexStyle} borderTop="1px solid" borderTopColor="gray.300">
              <Text {...labelStyle}>グループ</Text>
              <Box {...inputStyle}>
                <Select w="100%" name="group_slug" value={formData.group_slug} onChange={handleChange} required bg="white">
                  <option value="">選択してください</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.group_slug}>{group.group_name}</option>
                  ))}
                </Select>
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>日付</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="date" name="date" value={formData.date} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>タイトル</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>何をしていますか？またはしましたか？</Text>
              <Box {...inputStyle}>
                <Textarea w="100%" name="what" value={formData.what} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>だれが？</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="text" name="who" value={formData.who} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>いつ？</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="text" name="when" value={formData.when} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>どこで？</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="text" name="where" value={formData.where} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>何でも書いてください</Text>
              <Box {...inputStyle}>
                <Textarea w="100%" name="memo" value={formData.memo} onChange={handleChange} />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>リーダーにどうしてほしいか選んでください</Text>
              <Box {...inputStyle}>
                <Select w="100%" name="reply_type" value={formData.reply_type} onChange={handleChange} required bg="white">
                  <option value="1">確認だけでOK</option>
                  <option value="2">返事がほしい</option>
                  <option value="3">わからない、少し困っている</option>
                </Select>
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>どの事への返事がほしいですか？</Text>
              <Box {...inputStyle}>
                <Textarea w="100%" name="reply_memo" value={formData.reply_memo} onChange={handleChange} />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>いつまでに返事がほしいですか？</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="date" name="reply_limit" value={formData.reply_limit} onChange={handleChange} />
              </Box>
            </Flex>
            <Flex justifyContent="center" p={6}>
              <Box>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    style={{
                      width: '24px',
                      height: '24px',
                      marginRight: '8px',
                      cursor: 'pointer'
                    }}
                  />
                  <Text fontSize="lg" fontWeight="medium">公開する</Text>
                </label>
              </Box>
            </Flex>
            <Button type="submit" colorScheme="blue" size="lg" width="100%">
              {formData.is_published ? '公開して保存' : '下書きとして保存'}
            </Button>
          </form>
        </Box>
      </Container>
    </DefaultLayout>
  );
};

export default CreateReport;




// import React, { FC, useState } from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import DefaultLayout from '../Layouts/DefaultLayout';
// import { Head } from '@inertiajs/react';
// import {
//   Container, Heading, Box, Flex, Text, Input, Textarea, Select,
//   Button, VStack, Checkbox, Center,
//   border
// } from "@chakra-ui/react";
// import { PageProps } from '@/types';

// interface Group {
//   id: number;
//   group_name: string;
//   group_slug: string;
// }

// interface User {
//   id: number;
//   username: string;
//   name: string;
// }

// interface Props extends PageProps {
//   user: User;
//   groups: Group[];
// }

// const CreateReport: FC<Props> = ({ user, groups, auth }) => {
//   const [formData, setFormData] = useState({
//     date: '',
//     title: '',
//     what: '',
//     who: '',
//     when: '',
//     where: '',
//     memo: '',
//     reply_type: '1',
//     reply_memo: '',
//     reply_limit: '',
//     is_published: false,
//     group_slug: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
//     setFormData(prev => ({ ...prev, [name]: newValue }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const url = `/reports/${user.username}/${formData.group_slug}`;
//     Inertia.post(url, formData);
//   };

//   // 共通スタイリング
//   const commonFlexStyle = {
//     direction: { base: "column", lg: "row" } as const,
//     minHeight: "64px", // 最小の高さを設定
//     alignItems: "center", // 上下中央揃え
//   };

//   const labelStyle = {
//     w: { base: '100%', lg: '200px' },
//     fontWeight: "bold",
//     py: 4,
//     px: 3,
//     height: "100%", // 親要素の高さに合わせる
//     display: "flex",
//     alignItems: "center",
//   };

//   const inputStyle = {
//     flex: "1",
//     bg: "white",
//     ml: 4,
//     display: "flex",
//     alignItems: "center",
//     minHeight: "100%", // 親要素の高さに合わせる

//   };

//   return (
//     <DefaultLayout auth={auth} >
//       <Head title="報告を作る" />
//       <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }} >
//         <Box maxW="100%" mx="auto"  >
//           <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={5} textAlign="center">
//             報告を作る
//           </Heading>
//           <form onSubmit={handleSubmit} >
//             <Flex {...commonFlexStyle} borderTop="1px solid" borderTopColor="gray.300">
//               <Text {...labelStyle}>グループ</Text>
//               <Box {...inputStyle}>
//                 <Select w="100%" name="group_slug" value={formData.group_slug} onChange={handleChange} required bg="white">
//                   <option value="">選択してください</option>
//                   {groups.map((group) => (
//                     <option key={group.id} value={group.group_slug}>{group.group_name}</option>
//                   ))}
//                 </Select>
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>日付</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="date" name="date" value={formData.date} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>タイトル</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="text" name="title" value={formData.title} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>何をしていますか？またはしましたか？</Text>
//               <Box {...inputStyle}>
//                 <Textarea w="100%" name="what" value={formData.what} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>だれが？</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="text" name="who" value={formData.who} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>いつ？</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="text" name="when" value={formData.when} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>どこで？</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="text" name="where" value={formData.where} onChange={handleChange} required />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>何でも書いてください</Text>
//               <Box {...inputStyle}>
//                 <Textarea w="100%" name="memo" value={formData.memo} onChange={handleChange} />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>リーダーにどうしてほしいか選んでください</Text>
//               <Box {...inputStyle}>
//                 <Select w="100%" name="reply_type" value={formData.reply_type} onChange={handleChange} required bg="white">
//                   <option value="1">確認だけでOK</option>
//                   <option value="2">返事がほしい</option>
//                   <option value="3">わからない、少し困っている</option>
//                 </Select>
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>どの事への返事がほしいですか？</Text>
//               <Box {...inputStyle}>
//                 <Textarea w="100%" name="reply_memo" value={formData.reply_memo} onChange={handleChange} />
//               </Box>
//             </Flex>
//             <Flex {...commonFlexStyle}>
//               <Text {...labelStyle}>いつまでに返事がほしいですか？</Text>
//               <Box {...inputStyle}>
//                 <Input w="100%" type="date" name="reply_limit" value={formData.reply_limit} onChange={handleChange} />
//               </Box>
//             </Flex>
//             <Flex justifyContent="center" p={6}>
//               <Box>
//                 <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                   <input
//                     type="checkbox"
//                     name="is_published"
//                     checked={formData.is_published}
//                     onChange={handleChange}
//                     style={{
//                       width: '24px',
//                       height: '24px',
//                       marginRight: '8px',
//                       cursor: 'pointer'
//                     }}
//                   />
//                   <Text fontSize="lg" fontWeight="medium">公開する</Text>
//                 </label>
//               </Box>
//             </Flex>
//             <Button type="submit" colorScheme="blue" size="lg" width="100%">
//               {formData.is_published ? '公開して保存' : '下書きとして保存'}
//             </Button>
//           </form>
//         </Box>
//       </Container>
//     </DefaultLayout>
//   );
// };

// export default CreateReport;
// // import React, { FC, useState } from 'react';
// // import { Inertia } from '@inertiajs/inertia';
// // import DefaultLayout from '../Layouts/DefaultLayout';
// // import { Head } from '@inertiajs/react';
// // import {
// //   Container, Heading, Box, Flex, Text, Input, Textarea, Select,
// //   Button, VStack, Checkbox,
// //   Center
// // } from "@chakra-ui/react";
// // import { PageProps } from '@/types';

// // interface Group {
// //   id: number;
// //   group_name: string;
// //   group_slug: string;
// // }

// // interface User {
// //   id: number;
// //   username: string;
// //   name: string;
// // }

// // interface Props extends PageProps {
// //   user: User;
// //   groups: Group[];
// // }

// // const CreateReport: FC<Props> = ({ user, groups, auth }) => {
// //   const [formData, setFormData] = useState({
// //     date: '',
// //     title: '',
// //     what: '',
// //     who: '',
// //     when: '',
// //     where: '',
// //     memo: '',
// //     reply_type: '1',
// //     reply_memo: '',
// //     reply_limit: '',
// //     is_published: false,
// //     group_slug: '',
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //     const { name, value, type } = e.target;
// //     const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
// //     setFormData(prev => ({ ...prev, [name]: newValue }));
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const url = `/reports/${user.username}/${formData.group_slug}`;
// //     Inertia.post(url, formData);
// //   };

// //   // 共通スタイリング
// //   const commonFlexStyle = {
// //     direction: { base: "column", lg: "row" } as const,
// //     borderBottom: "1px solid",
// //     borderColor: "gray.200",
// //   };

// //   const labelStyle = {
// //     w: { base: '100%', lg: '200px' },
// //     fontWeight: "bold",
// //     py: 4,
// //     px: 3,
// //   };

// //   const inputStyle = {
// //     flex: "1",
// //     bg: "white",
// //     py: 2,
// //     px: 3,
// //     ml: 4,
// //   };

// //   return (
// //     <DefaultLayout auth={auth}>
// //       <Head title="あたらしい報告を作りましょう" />
// //       <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
// //         <Box maxW="100%" mx="auto" p={5}>
// //           <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={5} textAlign="center">
// //             新規報告作成
// //           </Heading>
// //           <form onSubmit={handleSubmit}>
// //             <Flex {...commonFlexStyle} borderTop="1px solid" borderTopColor="gray.200">
// //               <Text {...labelStyle}>グループ</Text>
// //               <Select {...inputStyle} name="group_slug" value={formData.group_slug} onChange={handleChange} required>
// //                 <option value="">選択してください</option>
// //                 {groups.map((group) => (
// //                   <option key={group.id} value={group.group_slug}>{group.group_name}</option>
// //                 ))}
// //               </Select>
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>日付</Text>
// //               <Input {...inputStyle} type="date" name="date" value={formData.date} onChange={handleChange} required />
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>タイトル</Text>
// //               <Input {...inputStyle} type="text" name="title" value={formData.title} onChange={handleChange} required />
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>何をしていますか？またはしましたか？</Text>
// //               <Textarea {...inputStyle} name="what" value={formData.what} onChange={handleChange} required />
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>だれが？</Text>
// //               <Input {...inputStyle} type="text" name="who" value={formData.who} onChange={handleChange} required />
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>いつ？</Text>
// //               <Input {...inputStyle} type="text" name="when" value={formData.when} onChange={handleChange} required />
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>どこで？</Text>
// //               <Input {...inputStyle} type="text" name="where" value={formData.where} onChange={handleChange} required />
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>何でも書いてください</Text>
// //               <Textarea {...inputStyle} name="memo" value={formData.memo} onChange={handleChange} />
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>リーダーにどうしてほしいか選んでください</Text>
// //               <Select {...inputStyle} name="reply_type" value={formData.reply_type} onChange={handleChange} required>
// //                 <option value="1">確認だけでOK</option>
// //                 <option value="2">返事がほしい</option>
// //                 <option value="3">わからない、少し困っている</option>
// //               </Select>
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>どの事への返事がほしいですか？</Text>
// //               <Textarea {...inputStyle} name="reply_memo" value={formData.reply_memo} onChange={handleChange} />
// //             </Flex>
// //             <Flex {...commonFlexStyle}>
// //               <Text {...labelStyle}>いつまでに返事がほしいですか？</Text>
// //               <Input {...inputStyle} type="date" name="reply_limit" value={formData.reply_limit} onChange={handleChange} />
// //             </Flex>
// //             <Flex justifyContent="center" p={6}>
// //               <Box>
// //                 <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
// //                   <input
// //                     type="checkbox"
// //                     name="is_published"
// //                     checked={formData.is_published}
// //                     onChange={handleChange}
// //                     style={{
// //                       width: '24px',
// //                       height: '24px',
// //                       marginRight: '8px',
// //                       cursor: 'pointer'
// //                     }}
// //                   />
// //                   <Text fontSize="lg" fontWeight="medium">公開する</Text>
// //                 </label>
// //               </Box>
// //             </Flex>
// //             <Button type="submit" colorScheme="blue" size="lg" width="100%">
// //               {formData.is_published ? '公開して保存' : '下書きとして保存'}
// //             </Button>


// //           </form>
// //         </Box>
// //       </Container>
// //     </DefaultLayout>
// //   );
// // };

// // export default CreateReport;
