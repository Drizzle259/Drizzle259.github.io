# 笔记

一个可部署到 GitHub Pages 的个人学习笔记网站。

## 添加一篇公开笔记

1. 在 `notes/` 中创建 Markdown 文件，例如 `notes/python-basics.md`。
2. 打开 `config.js`，在 `notes` 数组中添加：

```js
{
  title: "Python 基础",
  summary: "我的 Python 入门笔记",
  category: "Python",
  date: "2026-07-12",
  readTime: "5 分钟",
  color: "#58766a",
  file: "notes/python-basics.md"
}
```

3. 提交并推送到 GitHub。

## 自定义网页

- 修改网站名称和介绍：`config.js` 中的 `title`、`subtitle`。
- 增加预设背景：编辑 `config.js` 中的 `backgrounds`。
- 修改颜色和布局：编辑 `style.css` 顶部的颜色变量。
- 网页中的“导入笔记”和“上传背景”只保存在当前浏览器，适合个人临时使用。

## 本地预览

由于笔记通过网页请求读取，不能直接双击 HTML 预览。可以在该目录运行：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。
