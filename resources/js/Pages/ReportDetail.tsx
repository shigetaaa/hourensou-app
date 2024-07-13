import DefaultLayout from '../Layouts/DefaultLayout';
import React, { FC } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

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
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <main>
          <div className="max-w-full mx-auto p-5">
            <header>
              <div className="text-center mb-5 w-full md:w-4/5 lg:w-3/4 mx-auto">
                <h1 tabIndex={0} className="text-xl md:text-2xl font-bold py-2 tabindex-0">{report.title}</h1>
                <p tabIndex={0}>{reportDetail.name}</p>
              </div>
            </header>

            <section aria-label="報告詳細" tabIndex={0}>
              <div className="flex flex-col">
                {[
                  { label: 'グループ名', content: reportDetail.group_name },
                  { label: '日付', content: report.date },
                  { label: '何をしましたか?', content: report.what },
                  { label: 'だれが?', content: report.who },
                  { label: 'いつ?', content: report.when },
                  { label: 'どこで?', content: report.where },
                  { label: '何でも書いてください', content: report.memo },
                  { label: 'リーダーにどうしてほしいか', content: getReplyTypeText(report.reply_type) },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row border-b border-gray-200 last:border-b-0">
                    <div className="w-full md:w-[300px] bg-[#f7e8e7] font-bold py-4 px-3">
                      {item.label}
                    </div>
                    <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section aria-label="リーダーの返信" tabIndex={0}>
              <div className="text-center p-4 w-full md:w-4/5 lg:w-3/4 mx-auto">
                <h2 className="text-xl md:text-2xl font-bold">返信</h2>
              </div>
              <div className="flex flex-col md:flex-row border-t border-gray-200">
                <div className="w-full md:w-[300px] bg-[#d3e9f2] font-bold py-4 px-3">
                  リーダーの返信
                </div>
                <div className="w-full md:w-[calc(100%-300px)] bg-white py-4 px-3">
                  {report.is_reply_published ? report.reply_content : "返信はまだです。"}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </DefaultLayout>
  );
};

export default ReportDetail;
