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
    photo: "", // 例如 "assets/avatar.jpg"；留空时显示字母头像
    roles: ["持续学习的探索者", "Python 学习者", "知识记录者", "问题解决者"],
    intro: "我关注编程、数学与数据，用项目理解知识，也用笔记记录成长。",
    aboutLead: "我是一名正在构建自己知识体系的学习者。",
    aboutDetail: "我喜欢从问题出发，通过代码实验、课程学习和持续记录，让抽象知识变得清晰而具体。",
    motto: "“先完成，再完善；保持输入，也保持输出。”",
    contactText: "欢迎通过 GitHub 或邮箱与我交流学习、技术和有趣的项目。"
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
  themes: [
    { name: "暖纸", accent: "#ec6b4f", accent2: "#436f65", bg: "#f5f2eb", ink: "#171a19" },
    { name: "海盐", accent: "#3d78a8", accent2: "#668f86", bg: "#edf3f4", ink: "#172027" },
    { name: "暮色", accent: "#c87758", accent2: "#8a7cab", bg: "#24232a", ink: "#f3efe8" },
    { name: "森野", accent: "#d17a52", accent2: "#446b50", bg: "#edf0e7", ink: "#172019" }
  ]
};
