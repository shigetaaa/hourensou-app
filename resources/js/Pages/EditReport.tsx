
import React, { FC } from 'react';
import { useForm } from '@inertiajs/react';
import DefaultLayout from '../Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';
import {
  Container, Heading, Box, Flex, Text, Input, Textarea, Select,
  Button, Checkbox,
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
    <DefaultLayout auth={auth}>
      <Head title="報告を編集" />
      <Container maxW={{ base: "100%", md: "768px", lg: "1024px" }}>
        <Box maxW="100%" mx="auto">
          <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={5} textAlign="center">
            報告を編集
          </Heading>
          <form onSubmit={handleSubmit}>
            <Flex {...commonFlexStyle} borderTop="1px solid" borderTopColor="gray.300">
              <Text {...labelStyle}>グループ</Text>
              <Box {...inputStyle}>
                <Input w="100%" value={report.group.group_name} readOnly />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>日付</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="date" name="date" value={data.date} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>タイトル</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="text" name="title" value={data.title} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>何をしていますか？またはしましたか？</Text>
              <Box {...inputStyle}>
                <Textarea w="100%" name="what" value={data.what} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>だれが？</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="text" name="who" value={data.who} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>いつ？</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="text" name="when" value={data.when} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>どこで？</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="text" name="where" value={data.where} onChange={handleChange} required />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>何でも書いてください</Text>
              <Box {...inputStyle}>
                <Textarea w="100%" name="memo" value={data.memo} onChange={handleChange} />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>リーダーにどうしてほしいか選んでください</Text>
              <Box {...inputStyle}>
                <Select w="100%" name="reply_type" value={data.reply_type} onChange={handleChange} required bg="white">
                  <option value="1">確認だけでOK</option>
                  <option value="2">返事がほしい</option>
                  <option value="3">わからない、少し困っている</option>
                </Select>
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>どの事への返事がほしいですか？</Text>
              <Box {...inputStyle}>
                <Textarea w="100%" name="reply_memo" value={data.reply_memo} onChange={handleChange} />
              </Box>
            </Flex>
            <Flex {...commonFlexStyle}>
              <Text {...labelStyle}>いつまでに返事がほしいですか？</Text>
              <Box {...inputStyle}>
                <Input w="100%" type="date" name="reply_limit" value={data.reply_limit} onChange={handleChange} />
              </Box>
            </Flex>
            <Flex justifyContent="center" p={6}>
              <Box>
                <Checkbox
                  name="is_published"
                  isChecked={data.is_published}
                  onChange={handleChange}
                  size="lg"
                >
                  <Text fontSize="lg" fontWeight="medium">公開する</Text>
                </Checkbox>
              </Box>
            </Flex>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="100%"
              isLoading={processing}
              disabled={processing}
            >
              {data.is_published ? '公開して更新' : '下書きとして更新'}
            </Button>
          </form>
        </Box>
      </Container>
    </DefaultLayout>
  );
};

export default EditReport;
