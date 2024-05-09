
## users : ユーザー定義
| PK  | FK  | 項目名     | 説明             | データ型     | 初期値            | NULL許容 | インデックス           |
| --- | --- | ---------- | ---------------- | ------------ | ----------------- | -------- | ---------------------- |
| 〇  |     | id         |                  | INT          |                   | NO       |                        |
|     |     | name       | 管理用の登録名   | VARCHAR(50)  |                   | NO       | TRUE（アプリ高速表示） |
|     |     | username   | 表示用ユーザー名 | VARCHAR(100) |                   | NO       |                        |
|     |     | login_id   | ログインID       | VARCHAR(50)  |                   | NO       |                        |
|     |     | password   | パスワード       | VARCHAR(100) |                   | NO       |                        |
|     |     | created_at | 管理者登録日時   | TIMESTANP    | CURRENT_TIMESTAMP | NO       |                        |
|     |     | undated_at | 管理者更新日     | TIMESTANP    | CURRENT_TIMESTAMP | NO       |                        |

## groups : グループ
## user_groups : ユーザーグループ中間テーブル
## reports : 報告
## read_statuses : 既読管理
