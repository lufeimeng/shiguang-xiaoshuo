# 拾光小说

轻量静态小说站，无构建步骤或第三方依赖。首页和分类页共用 `styles.css`、`app.js`；小说与栏目数据集中在 `book-data.js`。分类页是 `categories/` 下的独立 HTML，可直接编辑页面标题、描述和栏目介绍。

将整个目录部署到任意静态网站托管服务即可。成人百科入口统一使用 `https://chengrenbaike.com/`。正式部署后，请按站点域名补充 canonical 地址和绝对 URL 站点地图。
