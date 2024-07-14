
import DefaultLayout from '@/Layouts/DefaultLayout';
import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

type Report = {
    id: number;
    date: string;
    title: string;
    group_slug: string;
    username: string;
    name: string;
};

type GroupReport = {
    data: Report[];
    group_slug: string;
    links: {
        prev: string | null;
        next: string | null;
    };
};

type UserGroupReports = {
    [groupName: string]: GroupReport;
};

interface DashboardProps extends PageProps {
    authUserReports: UserGroupReports;
}

export default function Dashboard({ auth, authUserReports }: DashboardProps) {
    const groupNames = Object.keys(authUserReports);
    const [activeTab, setActiveTab] = useState(groupNames[0]);
    const { delete: destroy } = useForm();
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const handleDelete = (username: string, group_slug: string, id: number) => {
        if (confirm('本当に削除しますか？')) {
            destroy(route('reports.delete', { username, group_slug, id }), {
                preserveState: true,
            });
        }
    };

    const toggleMenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <DefaultLayout title="報告の管理" auth={auth}>
            <Head title="報告の管理" />
            <div className="container mx-auto px-4 md:max-w-3xl lg:max-w-4xl">
                <div className="flex flex-col min-h-screen">
                    <main className="flex-1">
                        <h3 className="text-xl font-semibold mb-4 mt-6">あなたの報告一覧</h3>
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
                                {authUserReports[activeTab].data.map((report) => (
                                    <div key={report.id} className="border border-gray-500 rounded-lg p-4 bg-white mb-4">
                                        <div className="flex justify-between items-center">
                                            <Link href={`/reports/${report.username}/${authUserReports[activeTab].group_slug}/${report.id}`} className="flex-1">
                                                <div className="flex">
                                                    <span className="font-medium bg-white">{report.date}</span>
                                                    <span className="flex-1 bg-white pl-4">{report.name}</span>
                                                </div>
                                                <p className="py-1 bg-white">{report.title}</p>
                                            </Link>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('reports.edit', { username: report.username, group_slug: authUserReports[activeTab].group_slug, id: report.id })}
                                                    className="hidden sm:inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
                                                >
                                                    編集
                                                </Link>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => toggleMenu(report.id)}
                                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded text-sm flex items-center"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                    {openMenuId === report.id && (
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                                            <Link
                                                                href={route('reports.edit', { username: report.username, group_slug: authUserReports[activeTab].group_slug, id: report.id })}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 sm:hidden"
                                                            >
                                                                編集
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(report.username, authUserReports[activeTab].group_slug, report.id)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                削除
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex space-x-4 mt-4">
                                    {authUserReports[activeTab].links.prev && (
                                        <Link
                                            href={authUserReports[activeTab].links.prev as string}
                                            preserveState
                                            preserveScroll
                                            only={['authUserReports']}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            &laquo; 前のページ
                                        </Link>
                                    )}
                                    {authUserReports[activeTab].links.next && (
                                        <Link
                                            href={authUserReports[activeTab].links.next as string}
                                            preserveState
                                            preserveScroll
                                            only={['authUserReports']}
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
}
