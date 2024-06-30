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
                                <Link href={`/${report.username}/reports/${groupReports[groupName].group_slug}/${report.random_id}`}>
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

        //     {Object.keys(groupReports).map((groupName) => (
        //         <div key={groupName}>
        //             <h2>{groupName}</h2>
        //             {groupReports[groupName].map((report) => (
        //                 <div key={report.id}>
        //                     <Link href={`/reports/${report.id}`}>
        //                         <h3>{report.date}</h3>
        //                         <p>{report.title}</p>
        //                     </Link>
        //                 </div>
        //             ))}
        //         </div>
        //     ))}
        // </div>
    );
};


export default Welcome;



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
