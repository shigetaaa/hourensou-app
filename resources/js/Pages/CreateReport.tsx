import '../../css/app.css';

import React, { FC, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

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

interface Props {
  user: User;
  groups: Group[];
}

const CreateReport: FC<Props> = ({ user, groups }) => {
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    what: '',
    who: '',
    when: '',
    where: '',
    memo: '',
    reply_type: 1,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // URLの組み立て
    const url = `/reports/${user.username}/${formData.group_slug}`;
    console.log(url);

    Inertia.post(url, {
      ...formData,
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        console.log('Form submitted successfully');
      },
      onError: (errors) => {
        console.error('Form submission failed:', errors);
      }
    });
  };

  return (
    <div>
      <h1>新しい報告</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="group">グループ:</label>
          <select
            id="group"
            name="group_slug"
            value={formData.group_slug}
            onChange={handleChange}
            required
          >
            <option value="">選択してください</option>
            {groups.map((group) => (
              <option key={group.id} value={group.group_slug}>
                {group.group_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date">日付:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="title">タイトル:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="what">何をしていますか？またはしましたか？:</label>
          <textarea
            id="what"
            name="what"
            value={formData.what}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="who">だれが？:</label>
          <input
            type="text"
            id="who"
            name="who"
            value={formData.who}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="when">いつ？:</label>
          <input
            type="text"
            id="when"
            name="when"
            value={formData.when}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="where">どこで？:</label>
          <input
            type="text"
            id="where"
            name="where"
            value={formData.where}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="memo">何でも書いてください:</label>
          <textarea
            id="memo"
            name="memo"
            value={formData.memo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="reply_type">リーダーにどうしてほしいか選んでください:</label>
          <select
            id="reply_type"
            name="reply_type"
            value={formData.reply_type}
            onChange={handleChange}
            required
          >
            <option value={1}>確認だけでOK</option>
            <option value={2}>返事がほしい</option>
            <option value={3}>わからない、少し困っている</option>
          </select>
        </div>

        <div>
          <label htmlFor="reply_memo">どの事への返事がほしいですか？:</label>
          <textarea
            id="reply_memo"
            name="reply_memo"
            value={formData.reply_memo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="reply_limit">いつまでに返事がほしいですか？:</label>
          <input
            type="date"
            id="reply_limit"
            name="reply_limit"
            value={formData.reply_limit}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
            />
            公開する
          </label>
        </div>

        <button type="submit">
          {formData.is_published ? '公開して保存' : '下書きとして保存'}
        </button>
      </form>
    </div>
  );
};

export default CreateReport;
