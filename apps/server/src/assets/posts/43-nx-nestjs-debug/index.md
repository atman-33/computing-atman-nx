---
title: Nx NestJSをVSCodeからデバッグする設定
date: 2023-05-28 13:00:00
thumbnail: 1.png
tags:
- Nx
- NestJS
- VSCode
categories: NestJS
---

Nx NestJSをVSCodeからデバッグする設定する方法です。  
起動中のNestJSに対して、アタッチモードでデバッグします。



### 1. launch.json を作成

VSCodeの実行とデバッグ　＞　歯車ボタン から `launch.json`ファイルを作成

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach NestJS WS",
      "restart": true,
      "sourceMaps": true,
      "cwd": "${workspaceFolder}/server"
    }
  ]
}
```

> `"cwd": "${workspaceFolder}/server"`の`server`は、  
> Nxで作成したNestJSのプロジェクト名（フォルダ名）のため適宜変更して下さい。

### 2. NestJSプロジェクトを起動

VSCodeのターミナルで、下記コマンドを実行

```shell
nx serve server
```

### 3. デバッグを起動

VSCodeの実行とデバッグ　＞　デバッグの開始

![img](1.png)