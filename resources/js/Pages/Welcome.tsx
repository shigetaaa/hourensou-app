import '../../css/app.css';
import '../../css/welcome.css';

import React, { FC, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { InertiaLink } from '@inertiajs/inertia-react';


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
    meta: {
        // メタデータの型定義をここに書く
    };
};

type GroupReports = {
    [groupName: string]: GroupReport;
};



const Welcome = ({ groupReports }: { groupReports: GroupReports }) => {
    // デバッグ用
    console.log(groupReports);

    if (!groupReports) {
        return <div>報告はありません。</div>;
    }
    return (
        <div>
            {Object.keys(groupReports).map((groupName) => (
                <div key={groupName}>
                    <h2>{groupName}</h2>
                    {groupReports[groupName].data.map((report) => {
                        // console.log(report);  // ここを追加デバッグ用後で消す
                        return (
                            <div key={report.id}>
                                <Link href={`/reports/${report.username}/${groupReports[groupName].group_slug}/${report.random_id}`}>
                                    <h3>{report.date}</h3>
                                    <p>{report.title}</p>
                                </Link>
                            </div>
                        );
                    })}
                    <div>
                        {groupReports[groupName].links.prev && (
                            <InertiaLink href={groupReports[groupName].links.prev}>&laquo; 前のページ</InertiaLink>
                        )}
                        {groupReports[groupName].links.next && (
                            <InertiaLink href={groupReports[groupName].links.next}>次のページ &raquo;</InertiaLink>
                        )}

                    </div>
                </div>
            ))}
        </div>
    );
};


export default Welcome;
