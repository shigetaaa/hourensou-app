import React, { FC, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
// import { InertiaLink } from '@inertiajs/inertia-react';


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
};

type GroupReport = {
    data: Reports[];
    group_slug: string;
    links: {
        prev: string | null;
        next: string | null;
    };
};

type UsersGroupReports = {
    [groupName: string]: GroupReport;
};

interface UserReportsProps {
    usersGroupReports: UsersGroupReports;
}

const UserReports: React.FC<UserReportsProps> = ({ usersGroupReports }) => {
    // デバッグ用
    console.log(usersGroupReports);

    if (!usersGroupReports || Object.keys(usersGroupReports).length === 0) {
        return <div>報告はありません。</div>;
    }
    return (
        <div>
            {Object.entries(usersGroupReports).map(([groupName, groupReport]) => (
                <div key={groupName}>
                    <h2>{groupName}</h2>
                    {groupReport.data.map((report) => (
                        <div key={report.id}>
                            <Link href={`/${report.username}/reports/${groupReport.group_slug}/${report.random_id}`}>
                                <h3>{report.date}</h3>
                                <p>{report.title}</p>
                            </Link>
                        </div>
                    ))}
                    <div>
                        {groupReport.links.prev && (
                            <Link href={groupReport.links.prev}>&laquo; 前のページ</Link>
                        )}
                        {groupReport.links.next && (
                            <Link href={groupReport.links.next}>次のページ &raquo;</Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};


// export default Welcome;
export default UserReports;
