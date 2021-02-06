
## 01. 環境準備

### 安裝 Node.js 8.x

檢查環境, 如果是 v8 就跳過安裝, 到步驟二

```
$ node -v
v8.16.2
```

利用下面網址安裝 node version 8
安裝 [https://nodejs.org/dist/latest-v8.x/](https://nodejs.org/dist/latest-v8.x/)

並且安裝 Web3

```
npm install web3
```

## 02. 模板

解壓縮後, 進到

```
$ cd house
$ npm install
$ npm run devstart
```

## 03. 啟動 ganache

把 ganache 打開

## 04. 進到網頁

- [http://localhost:3000/](http://localhost:3000)


## Express 相關知識

Express 是一套 node.js 的框架，具有前端與後端的功能，此外，它具備了 [express-generator](https://expressjs.com/zh-tw/starter/generator.html) 的功能，可以快速用來產生程式架構

網站中[入門](https://expressjs.com/zh-tw/starter/installing.html)的文件，適合快速學習與實戰，進階可閱讀 [MDN 上的教學](https://developer.mozilla.org/zh-TW/docs/Learn/Server-side/Express_Nodejs/skeleton_website)


```
/sample
    app.js
    /bin
        www
    package.json
    /node_modules
        [about 4,500 subdirectories and files]
    /public
        /images
        /javascripts
        /stylesheets
            style.css
    /routes
        index.js
        users.js
    /views
        error.pug
        index.pug
        layout.pug
```

- `app.js`: 應用程式
- `/bin/www`: 是程式檔入口
- `package.json`: 定義套件的相依關係
- `/node_modules`: 套件安裝後的檔案
- `/public`: 網頁靜態檔案
- `/routes`: 路由
- `/views`: 視圖 (模板)
