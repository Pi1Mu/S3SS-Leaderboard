# Sub3 Seeds Speedrun Leaderboard - 仕様書

## 概要
Sub3 Seeds SpeedrunのSRC的なサイト。

## データ管理

### シード
Vercel Strageで管理。

| カラム  | 型           | 説明                                        |
| ------- | ------------ | ------------------------------------------- |
| ID      | INTEGER      | シードID                                    |
| SEED    | VARCHAR2(32) | シード値                                    |
| NAME    | VARCHAR2(32) | シード名                                    |
| VERSION | VARCHAR2(32) | バージョン                                  |
| STATUS  | INTEGER      | シード管理用<br />0: 申請, 1: 承認, 2: 却下 |

> バージョンの値はアプリケーション側で一覧で持つが、IDでリレーションさせるなどはしない。

### バージョン
アプリケーション側でJSONで管理。（追加修正は手動）

``` ts
version: string[]
```

### 記録
Vercel Strageで管理。

| カラム       | 型            | 説明                                          |
| ------------ | ------------- | --------------------------------------------- |
| ID           | INTEGER       | 記録ID (シーケンス)                           |
| AUTHOR       | VARCHAR2(128) | 申請者（DiscordのID）                         |
| TIME         | TIME?         | タイム                                        |
| COMMENTS     | VARCHAR2(512) | コメント（自由記述欄）                        |
| SEED_ID      | INTEGER       | シード（ID）                                  |
| VOD          | VARCHAR2(256) | 動画リンク                                    |
| IS_FASTEST   | BOOLEAN?      | その人・そのSEEDのRUNの中で最速か？           |
| STATUS       | INTEGER       | 承認ステータス<br />0: 申請, 1: 承認, 2: 却下 |
| VERIFIER     | VARCHAR2(128) | 承認者（DiscordのID）                         |
| SUBMITTED_AT | TIMESTAMP     | 申請日時                                      |
| VERIFIED_AT  | TIMESTAMP     | 承認日時                                      |