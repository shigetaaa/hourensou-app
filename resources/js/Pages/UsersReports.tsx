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
                            <InertiaLink href={groupReport.links.prev}>&laquo; 前のページ</InertiaLink>
                        )}
                        {groupReport.links.next && (
                            <InertiaLink href={groupReport.links.next}>次のページ &raquo;</InertiaLink>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};


// export default Welcome;
export default UserReports;



// export default function Welcome({ auth, reports }: PageProps & GlobalReportsProps) {
//     return (
//         <AuthenticatedLayoutHome
//             user={auth.user}
//             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
//         >
//             <Head title="ほうれんそう" />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">You're logged in!</div>
//                         {/* <GlobalReports reports={reports} /> */}
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayoutHome>
//         // <h1>ほうれんそう</h1>
//     );
// }
