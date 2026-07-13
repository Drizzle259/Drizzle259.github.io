/* ============================================================
   网站内容配置：大多数文字只需修改本文件，不必改 HTML。
   完整说明请阅读《网页使用与自定义指南.md》
   ============================================================ */
window.PORTFOLIO_CONFIG = {
  profile: {
    fullName: "Wenjie Zou",
    firstName: "Wenjie",
    lastName: "Zou.",
    initial: "drizzle",
    location: "China",
    roles: ["电子科技大学本科生", "人工智能学习者", "科研探索者", "问题解决者"],
    intro: "就读于电子科技大学计算机科学专业，关注人工智能、机器学习与扩散模型。",
    aboutLead: "我是一名电子科技大学（UESTC）的学生。",
    aboutDetail: "我正在努力投入科研与学习，通过代码实验、课程训练和持续记录探索人工智能。",
    motto: "My aim is to discover a learning procedure that is efficient at finding complex structure in large, high-dimensional datasets — Geoffrey Hinton"
  },
  keywords: [
    "zouwj.drizzle@gmail.com",
    "zouwj.drizzle@gmail.com",
    "zouwj.drizzle@gmail.com",
    "zouwj.drizzle@gmail.com",
    "zouwj.drizzle@gmail.com",
    "zouwj.drizzle@gmail.com"
  ],
  facts: [
    { label: "IDENTITY", value: "SOPHOMORE" },
    { label: "DIRECTION", value: "ARTIFICIAL INTELLIGENCE" },
    { label: "LANGUAGE", value: "CHINESE · ENGLISH" }
  ],
  skills: [
    { name: "C / C++", level: 75 },
    { name: "Python", level: 78 },
    { name: "PyTorch", level: 70 },
    { name: "Data Structure", level: 72 },
    { name: "Machine Learning", level: 68 },
    { name: "Diffusion Model", level: 62 }
  ],
  timeline: [
    { period: "现在", type: "教育经历", title: "电子科技大学 · 计算机科学专业", place: "University of Electronic Science and Technology of China", description: "就读于电子科技大学计算机科学专业，围绕人工智能、机器学习与扩散模型开展课程学习和科研探索。" },
    { period: "2026", type: "学习实践", title: "个人知识主页", place: "GitHub Pages", description: "搭建并维护个人主页，用 Markdown 公开学习笔记，整理简历、技能与阶段性成果。" },
    { period: "未来", type: "目标", title: "请填写下一段经历", place: "课程 / 实习 / 比赛 / 项目", description: "在 config.js 中替换这一项，记录值得展示的学习、实践或工作经历。" }
  ],
  social: [
    { label: "GitHub", url: "https://github.com/Drizzle259", icon: "github" },
    { label: "zouwj.drizzle@gmail.com", url: "mailto:zouwj.drizzle@gmail.com", icon: "mail" }
  ],
  notes: [
    { title: "欢迎来到我的个人主页", summary: "了解这个网站的结构，以及如何添加属于自己的内容。", category: "随笔", date: "2026-07-12", readTime: "3 分钟", color: "#ec6b4f", file: "notes/welcome.md" },
    { title: "如何整理一篇学习笔记", summary: "用问题、理解、例子和复盘四个部分，建立清晰的知识结构。", category: "学习笔记", date: "2026-07-10", readTime: "5 分钟", color: "#436f65", file: "notes/how-to-take-notes.md" },
    { title: "Markdown 快速参考", summary: "常用标题、列表、代码块、引用和链接的写法。", category: "工具", date: "2026-07-08", readTime: "4 分钟", color: "#5e70a2", file: "notes/markdown-guide.md" }
  ],
  activity: [
    { date: "2026-07-13", type: "website", title: "同步个人资料与视觉细节", detail: "更新 UESTC 学习信息、个人方向，并把装饰条带改为 Chrome 原版风格的小恐龙场景。" },
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
