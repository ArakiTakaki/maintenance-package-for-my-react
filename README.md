# 内定者課題

以下の手順に従ってWebsocketを使ったチャットアプリケーションを作成してください。  
余力がある場合はデザインやアニメーションを意識するようにしてください。  

目的：
- 開発環境構築の経験をする
- React、Reduxを経験する
- express、socket.ioを経験する

## STEP1. クライアントサイドの開発環境を構築する
### 1.1. Reactをwebpackでビルドする環境を構築する
webpackを使ってReactをビルドし、HMRで開発できる環境を構築してください。  
webpackは開発用と本番用で設定ファイルを分けて、以下のように設定してください。  

- 開発用ではソースマップをつける
- 本番用ではファイルを難読化する

#### キーワード
- React
- webpack
- webpack-dev-server
- HMR

### 1.2. スタイル設定する機能を盛り込む
Reactにスタイルを設定当てるため、いずれかのものを導入してください。  

- Material-ui
- CSS Module
- styled-components
- その他

### 1.3. linterやコードフォーマッターを設定する
eslintやeditorconfig、Prettierなどのlinterやコードフォーマッターを入れてください。ルールの指定はありませんので、適切に設定してください。

#### キーワード
- eslint
- editorconfig
- Prettier

### 1.4. storybookを入れる
Reactのコンポーネント開発を効率よくするためにstorybookを入れてください。  
addonとして、knobsとactionsを入れてください。他にも入れたいものがあれば導入してください。  

#### キーワード
- storybook
- @storybook/addon-knobs
- @storybook/addon-actions

### 1.5. react-routerを入れる
画面遷移をするためreact-routerを入れてください。  
pathでルーティングする場合はdevServerの設定でindexルートにフォールバック設定をする必要があるので注意してください。 

#### キーワード
- react-router 

### 1.6. Reduxを入れる
データの管理にReduxを使用してください。また、開発環境ではredux-loggerを入れるようにしてください。  

#### キーワード
- Redux
- redux-logger

## STEP2. サーバーサイドの環境を構築する
### 2.1. サーバーを立ち上げてAPI通信をする
expressを使用してローカルで3000ポートでサーバーを立ち上げてください。  
この時オートリロードするようにnode-devを使用して起動してください。  

このサーバーに対してAPI通信をできるようにしてください。  
通信中に表示されるスタイルなどの確認を行いやすいように、通信のレスポンスは以下のようなミドルウェアを入れて意図的に遅延させるようにしてください。  

```js
// レスポンス遅延
app.use((req, res, next) => {
  const delay = 1000 * Math.random();
  setTimeout(() => {
    next();
  }, delay);
});
```

フロントからの通信ではaxiosを使用してください。ReactからAPI通信する際に、必要であればReduxにAPI通信のmiddlewareを入れて構いません。  

#### キーワード
- express
- node-dev
- axios
- redux-middleware

### 2.2. Websocket通信をする
socket.ioを使用してwebsocket通信をするようにしてください。  
サーバーにはHTTPアクセスに加えて、socket.ioを使用してwebsocketでも接続できるようにしてください。  
この際、API通信と同様に必要であればReduxにwebsocket通信するためのmiddlewareを入れて構いません。  

#### キーワード
- websocket
- socket.io

## STEP3. サーバーにアップロードして動作することを確認する
### 3.1. サーバーにアクセスする
以下の情報を元にAWSのEC2サーバーにアクセスしてください。   

プライベートキー: rookie-frontend-araki.pem(別経由でお渡し)  
パブリックIP: 13.112.26.129  

#### sshでサーバーにアクセスする例
`$ ssh -i "rookie-frontend-araki.pem" ec2-user@13.112.26.129`

#### 補足
rookie-frontend-araki.pemは読み込み権限だけにする必要があるため、必要に応じて`$ chmod 400 rookie-frontend-araki.pem`とタイプして権限を書き換えてください。  

### 3.2. nodeが動く環境にセットアップする
初期状態のEC2はnodeが動いていませんので、必要なパッケージをインストールしてください。この時行ったコマンドは記録しておいてください。  

### 3.3. ファイルをアップロードする
作成したファイルをサーバーにアップロードしてください。配置場所は指定しませんので、適切な場所に配置してください。  

#### scpでファイルをアップロードする例
`$ scp -r -i "rookie-frontend-araki.pem" server ec2-user@13.112.26.129:server`

### 3.4. expressサーバーを起動して動作確認をする
アップロードしたファイルを使用してexpressサーバーを起動してください。起動の際は、pm2を使用してデーモン化してください。  
[http://13.112.26.129:3000/](http://13.112.26.129:3000/)にアクセスして動作することを確認してください。  

#### キーワード
- AWS EC2
- デーモン
- pm2

## STEP4. チャットアプリケーションを作成する
構築した環境で以下の仕様を満たすチャットアプリケーションを手順に従って作成してください。  

### 仕様
- トップ画面で部屋名を入力して部屋を作成することができて、作成された部屋は誰でも入室できる
- 部屋作成後は、作成した部屋に自動的に入るようにする
- 部屋の中では名前とメッセージを入力し投稿できる
- 入室した人全員が投稿した内容がリアルタイムで見れる（過去の投稿は見れなくてもいい）

#### バリデーションルール
部屋名
- 空文字は受け付けない
- 30文字まで
- 半角英数字のみ

チャット投稿者名
- 空文字は受け付けない
- 20文字まで

チャットメッセージ
- 空文字は受け付けない
- 100文字まで

### 4.1. トップ画面で使用するコンポーネントを作成する
以下のようなコンポーネントをあらかじめ作成してください。  
入力フォームについてはこの後バリデーションチェックを実装するため、エラー表示やボタンの非活性などのスタイルも用意してください。  
また通信中のスタイルも用意してください。  

- 部屋名入力フォーム
- 部屋リスト
- 部屋リンク

### 4.2. 部屋の作成をする
APIを用意して、部屋を作れるようにしてください。  
部屋名は上で指定したバリデーションルールに沿ってバリデーションするようにしてください。このチェックはサーバー側も行うようにしてください。  
バリデーションの際はユーザーにもわかるようにエラーメッセージや送信ボタンの非活性するようにしてください。  
また、API通信中は2回以上リクエストしないようなロジックを入れて、表示上は通信していることが分かるようなスタイルにしてください。  

### 4.3. 部屋の画面に遷移できるようにする
部屋の作成後、作成した部屋に自動で遷移できるようにしてください。  
また、トップ画面に表示させる部屋一覧のリンクをクリックした時も選択した部屋に遷移するようにしてください。  

### 4.4. 部屋の画面で使用するコンポーネントを作成する
以下のようなコンポーネントをあらかじめ作成してください。

- チャット入力フォーム
- チャットリスト
- チャット

### 4.5. チャットを実装する
websocketでメッセージを送信できるようにしてください。  
名前とメッセージはバリデーションルールに従ってバリデーションするようにしてください。  

## STEP5. 追加機能を盛り込む
余力がある場合は、追加機能を盛り込んでください。  

### 追加機能の例
- 部屋の入退出にメッセージが出るようにする
- 画面遷移やチャットの表示などにアニメーションをつける
- google OAuth2.0を使ってログイン認証する
- webRTCを使用して音声チャットができる

## 課題を取り組むにあたっての流れ・提出物

ソースコードについては随時GitHubにpushして、masterにPullRequestを送る形で進めていきます。  
完成してからPullRequestを送るのではなく、タイトルに`WIP:`をつけて先にPullRequestを作成します。完成してレビューを貰いたい時は`WIP:`を外してレビューする人をAssignするようにしてください。  
また調べて分かったことやつまづいたところをどう解決したかをSTEPごとにstep1.md、step2.md、...にまとめてください。これらのファイルはreviewsディレクトリ以下に保存してリポジトリに含めてください。  

課題終了後には以下をメールで提出してください。reviewsディレクトリにあるSTEPごとに書いたものを参考に書いて構いません。

- 今回の課題の要約
- 特に頑張ったところ
- 苦労した点とどうやって解決したか
- 結局どう解決するのがベストなのか良く分からなかったところ（あれば）
- 今回の課題で何を学んだか
- 今後に活かしていきたいこと
- その他
# maintenance-package-for-my-react
