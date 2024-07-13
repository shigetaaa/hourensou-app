
import React, { FC, useState, FormEventHandler } from 'react';
// import { Inertia } from '@inertiajs/inertia';
// import { InertiaFormProps } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import DefaultLayout from '../Layouts/DefaultLayout';
import { Head } from '@inertiajs/react';
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

interface FormData {
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
  is_published: boolean;
  group_slug: string;
}

type FormDataConvertible = string | number | boolean | File | null | undefined;

const CreateReport: FC<Props> = ({ user, groups, auth }) => {
  const [formData, setFormData] = useState<FormData>({
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

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const url = `/reports/${user.username}/${formData.group_slug}`;

    const payload: Record<string, FormDataConvertible> = {
      ...formData,
      is_published: formData.is_published ? '1' : '0',
    };

    router.post(url, payload);
  };

  const formFields = [
    { label: '日付', name: 'date', type: 'date' },
    { label: 'タイトル', name: 'title', type: 'text' },
    { label: '何をしていますか？またはしましたか？', name: 'what', type: 'textarea' },
    { label: 'だれが？', name: 'who', type: 'text' },
    { label: 'いつ？', name: 'when', type: 'text' },
    { label: 'どこで？', name: 'where', type: 'text' },
    { label: '何でも書いてください', name: 'memo', type: 'textarea' },
    {
      label: 'リーダーにどうしてほしいか選んでください',
      name: 'reply_type',
      type: 'select',
      options: [
        { id: 1, name: '確認だけでOK', value: '1' },
        { id: 2, name: '返事がほしい', value: '2' },
        { id: 3, name: 'わからない、少し困っている', value: '3' },
      ]
    },
    { label: 'どの事への返事がほしいですか？', name: 'reply_memo', type: 'textarea' },
    { label: 'いつまでに返事がほしいですか？', name: 'reply_limit', type: 'date' },
  ];

  return (
    <DefaultLayout auth={auth}>
      <Head title="報告を作る" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold mb-5 text-center">
            報告を作る
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row border-t border-gray-300">
              <div className="w-full md:w-[200px] font-bold py-2 md:py-4 px-3">
                グループ
              </div>
              <div className="w-full md:w-[calc(100%-200px)] bg-white py-2 md:py-4 px-3">
                <select
                  name="group_slug"
                  value={formData.group_slug}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">選択してください</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.group_slug}>{group.group_name}</option>
                  ))}
                </select>
              </div>
            </div>

            {formFields.map((field, index) => (
              <div key={index} className="flex flex-col md:flex-row border-t border-gray-300">
                <div className="w-full md:w-[200px] font-bold py-2 md:py-4 px-3">
                  {field.label}
                </div>
                <div className="w-full md:w-[calc(100%-200px)] bg-white py-2 md:py-4 px-3">
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name as keyof FormData] as string}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      {field.options?.map((option) => (
                        <option key={option.id} value={option.value}>{option.name}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name as keyof FormData] as string}
                      onChange={handleChange}
                      required={field.name !== 'memo' && field.name !== 'reply_memo'}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData] as string}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-center p-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="w-6 h-6 mr-2 cursor-pointer"
                />
                <span className="text-lg font-medium">公開する</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {formData.is_published ? '公開して保存' : '下書きとして保存'}
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateReport;
