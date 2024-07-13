import DefaultLayout from '../Layouts/DefaultLayout';
import React, { FC, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';



type Reports = {
    id: number;
    username: string;
    name: string;
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
    group_id: number; // 追加
    links: {
        prev: string;
        next: string;
    };
};

type GroupReports = {
    [groupName: string]: GroupReport;
};


const Welcome = ({ auth, groupReports }: PageProps & { groupReports: GroupReports }) => {
    const groupNames = Object.keys(groupReports);
    const [activeTab, setActiveTab] = useState(groupNames[0]); // 最初のグループをデフォルトで選択

    if (!groupReports) {
        return <div>報告はありません。</div>;
    }

    return (
        <DefaultLayout title="ホーム" auth={auth}>
            <Head title="Welcome" />
            <div className="container mx-auto px-4 md:max-w-3xl lg:max-w-4xl">
                <div className="flex flex-col min-h-screen">
                    <main className="flex-1">
                        <p className="sr-only">
                            次にタブキーを押すと、タブパネルに移動します。読みたい地域グループを選べます。左右の矢印キーでタブを移動します。読みたい地域にきたらエンターキーを押すと、その地域の報告一覧に移動します。報告のタイトルをクリックすると、詳細ページに移動します。
                        </p>
                        <div className="mb-4">
                            <div className="flex border-b border-gray-200">
                                {groupNames.map((groupName) => (
                                    <button
                                        key={groupName}
                                        onClick={() => setActiveTab(groupName)}
                                        className={`px-4 py-2 font-medium text-lg focus:outline-none focus:text-blue-500 focus:border-blue-500 hover:text-blue-500 ${activeTab === groupName ? 'border-b-2 border-blue-500 text-blue-500' : ''
                                            }`}
                                    >
                                        {groupName}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4">
                                {groupReports[activeTab].data.map((report) => (
                                    <div key={report.id} className="border border-gray-500 rounded-lg p-4 bg-white mb-4">
                                        <Link href={`/reports/${report.username}/${groupReports[activeTab].group_slug}/${report.id}`}>
                                            <div className="flex">
                                                <span className="font-medium bg-white">{report.date}</span>
                                                <span className="flex-1 bg-white pl-4">{report.name}</span>
                                            </div>
                                            <p className="py-1 bg-white">{report.title}</p>
                                        </Link>
                                    </div>
                                ))}
                                <div className="flex space-x-4 mt-4">
                                    {groupReports[activeTab].links.prev && (
                                        <Link
                                            href={groupReports[activeTab].links.prev}
                                            preserveState
                                            preserveScroll
                                            data={{
                                                group_id: groupReports[activeTab].group_id
                                            }}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            &laquo; 前のページ
                                        </Link>
                                    )}
                                    {groupReports[activeTab].links.next && (
                                        <Link
                                            href={groupReports[activeTab].links.next}
                                            preserveState
                                            preserveScroll
                                            data={{
                                                group_id: groupReports[activeTab].group_id
                                            }}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            次のページ &raquo;
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Welcome;



// const Welcome = ({ auth, groupReports }: PageProps & { groupReports: GroupReports }) => {
//     console.log(groupReports);

//     if (!groupReports) {
//         return <div>報告はありません。</div>;
//     }

//     const groupNames = Object.keys(groupReports);

//     return (
//         <DefaultLayout title="ホーム" auth={auth}>
//             <Head title="Welcome" />
//             <div className="container mx-auto px-4 md:max-w-3xl lg:max-w-4xl">
//                 <div className="flex flex-col min-h-screen">
//                     <main className="flex-1">
//                         {/* キーボード操作のガイダンス */}
//                         <p className="sr-only">
//                             次にタブキーを押すと、タブパネルに移動します。読みたい地域グループを選べます。左右の矢印キーでタブを移動します。読みたい地域にきたらタブキーを押すと、その地域の報告一覧に移動します。報告のタイトルをクリックすると、詳細ページに移動します。
//                         </p>
//                         <div className="mb-4">
//                             <div className="flex border-b border-gray-200">
//                                 {groupNames.map((groupName) => (
//                                     <button
//                                         key={groupName}
//                                         className="px-4 py-2 font-medium text-sm focus:outline-none focus:text-blue-500 focus:border-blue-500 hover:text-blue-500"
//                                     >
//                                         {groupName}
//                                     </button>
//                                 ))}
//                             </div>
//                             <div className="mt-4">
//                                 {groupNames.map((groupName) => (
//                                     <div key={groupName} className="space-y-4">
//                                         {groupReports[groupName].data.map((report) => (
//                                             <div key={report.id} className="border border-gray-500 rounded-lg p-4 bg-white">
//                                                 <Link href={`/reports/${report.username}/${groupReports[groupName].group_slug}/${report.id}`}>
//                                                     <div className="flex">
//                                                         <span className="font-medium bg-white">{report.date}</span>
//                                                         <span className="flex-1 bg-white pl-4">{report.name}</span>
//                                                     </div>
//                                                     <p className="py-1 bg-white">{report.title}</p>
//                                                 </Link>
//                                             </div>
//                                         ))}
//                                         <div className="flex space-x-4 mt-4">
//                                             {groupReports[groupName].links.prev && (
//                                                 <Link
//                                                     href={groupReports[groupName].links.prev}
//                                                     preserveState
//                                                     preserveScroll
//                                                     data={{
//                                                         group_id: groupReports[groupName].group_id
//                                                     }}
//                                                     className="text-blue-500 hover:text-blue-700"
//                                                 >
//                                                     &laquo; 前のページ
//                                                 </Link>
//                                             )}
//                                             {groupReports[groupName].links.next && (
//                                                 <Link
//                                                     href={groupReports[groupName].links.next}
//                                                     preserveState
//                                                     preserveScroll
//                                                     data={{
//                                                         group_id: groupReports[groupName].group_id
//                                                     }}
//                                                     className="text-blue-500 hover:text-blue-700"
//                                                 >
//                                                     次のページ &raquo;
//                                                 </Link>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </DefaultLayout>
//     );
// };

// export default Welcome;
