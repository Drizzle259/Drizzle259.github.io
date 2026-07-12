/* ============================================================
   网站内容配置：大多数文字只需修改本文件，不必改 HTML。
   完整说明请阅读《网页使用与自定义指南.md》
   ============================================================ */
window.PORTFOLIO_CONFIG = {
  profile: {
    fullName: "Drizzle259",
    firstName: "Drizzle",
    lastName: "259.",
    initial: "D",
    location: "China",
    roles: ["持续学习的探索者", "Python 学习者", "知识记录者", "问题解决者"],
    intro: "我关注编程、数学与数据，用项目理解知识，也用笔记记录成长。",
    aboutLead: "我是一名正在构建自己知识体系的学习者。",
    aboutDetail: "我喜欢从问题出发，通过代码实验、课程学习和持续记录，让抽象知识变得清晰而具体。",
    motto: "“先完成，再完善；保持输入，也保持输出。”"
  },
  keywords: ["PYTHON", "DISCRETE MATH", "DATA", "LEARNING", "WRITING", "CURIOSITY"],
  facts: [
    { label: "身份", value: "学生 / 学习者" },
    { label: "方向", value: "编程 · 数学 · 数据" },
    { label: "语言", value: "中文 · English" }
  ],
  skills: [
    { name: "Python", level: 78 },
    { name: "Data Analysis", level: 65 },
    { name: "Git & GitHub", level: 62 },
    { name: "HTML / CSS / JS", level: 58 },
    { name: "Discrete Mathematics", level: 70 },
    { name: "Technical Writing", level: 72 }
  ],
  timeline: [
    { period: "现在", type: "学习方向", title: "计算机与数据方向学习", place: "请填写你的学校 / 专业", description: "持续学习 Python、离散数学、数据分析和软件开发基础，通过课程与个人实践建立知识体系。" },
    { period: "2026", type: "学习实践", title: "个人知识主页", place: "GitHub Pages", description: "搭建并维护个人主页，用 Markdown 公开学习笔记，整理简历、技能与阶段性成果。" },
    { period: "未来", type: "目标", title: "请填写下一段经历", place: "课程 / 实习 / 比赛 / 项目", description: "在 config.js 中替换这一项，记录值得展示的学习、实践或工作经历。" }
  ],
  social: [
    { label: "GitHub", url: "https://github.com/Drizzle259", icon: "github" },
    { label: "Email", url: "mailto:your-email@example.com", icon: "mail" }
  ],
  notes: [
    { title: "欢迎来到我的个人主页", summary: "了解这个网站的结构，以及如何添加属于自己的内容。", category: "随笔", date: "2026-07-12", readTime: "3 分钟", color: "#ec6b4f", file: "notes/welcome.md" },
    { title: "如何整理一篇学习笔记", summary: "用问题、理解、例子和复盘四个部分，建立清晰的知识结构。", category: "学习方法", date: "2026-07-10", readTime: "5 分钟", color: "#436f65", file: "notes/how-to-take-notes.md" },
    { title: "Markdown 快速参考", summary: "常用标题、列表、代码块、引用和链接的写法。", category: "工具", date: "2026-07-08", readTime: "4 分钟", color: "#5e70a2", file: "notes/markdown-guide.md" }
  ],
  activity: [
    { date: "2026-07-12", type: "website", title: "修正日历与首页信息区", detail: "修复缓存导致的日历异常，调整方形形象框和基础信息布局。" },
    { date: "2026-07-12", type: "website", title: "优化个人主页视觉", detail: "更新海盐配色、素材装饰与响应式布局。" },
    { date: "2026-07-12", type: "website", title: "增加更新日历", detail: "开始记录网页改动和笔记发布时间。" },
    { date: "2026-07-12", type: "note", title: "发布：欢迎来到我的个人主页", detail: "新增主页结构与使用说明。" },
    { date: "2026-07-10", type: "note", title: "发布：如何整理一篇学习笔记", detail: "记录四步学习笔记法。" },
    { date: "2026-07-08", type: "note", title: "发布：Markdown 快速参考", detail: "整理常用 Markdown 语法。" }
  ],
  themes: [
    { name: "海盐", accent: "#1a73e8", accent2: "#5f91b8", bg: "#f4f9fc", ink: "#15212b" },
    { name: "晴空", accent: "#3974c5", accent2: "#73a6c8", bg: "#eef7fd", ink: "#18232d" },
    { name: "薄荷", accent: "#287d76", accent2: "#63a6a1", bg: "#f0f8f7", ink: "#172724" },
    { name: "夜航", accent: "#8ab4f8", accent2: "#6f9dcc", bg: "#18222d", ink: "#edf4fa" }
  ]
};
