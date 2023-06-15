# デプロイ手順

## ビルド
```
nx run-many --target=build --all --prod
```
or
```
nx build client --prod
nx build server --prod
```
↓
```
npm run build
```

## 起動
```
npm run start
```

**補足**
この起動でserverを起動する。
api以外のアクセスが届いた場合は、angular の index.htmlにアクセスを流す事で、
serverのみ起動すればフロントエンドとバックエンドが両方稼働した事となる。

### バンドルサイズ分析方法
nx run client:build:development --statsJson
npm run analyze  
=> ブラウザでバンドルサイズが高い部分を確認可能

## デプロイ
- デプロイ先：render.com

### Settings
- Repository: 
https://github.com/atman-33/computing-atman-angular

- Branch: 
```
main
```

- Build Command: 
```
node --version && npm install --force && npm run build
```

- Start Command: 
```
npm run start
```

- Auto-Deploy: 
```
Yes
```
