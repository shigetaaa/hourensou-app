import '../../css/app.css';
// import '../../css/welcome.css';


import React, { FC, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';


// 型定義
export type Reports = {
  id: number;
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
  group: {
    id: number;
    group_slug: string;
    group_name: string;
  };
};

const ReportDetail: FC<{ report?: Reports }> = ({ report }) => {
  console.log(report);
  if (!report) {
    return <div>報告はありません。</div>;
  }
  return (
    <div>
      <h2>{report.group.group_name}</h2>
      <div key={report.id}>
        <h3>{report.date}</h3>
        <p>{report.title}</p>
      </div>
    </div>
  );
};




export default ReportDetail;
