# GlobalRate - 实时汇率货币转换器

一个极速、高保真、美观且响应式的实时汇率货币转换单页应用（SPA）。完美适配移动端（手机）和桌面端（电脑）浏览器访问。

## 🌟 核心特性

- **双重 API 实时容灾**：首选 [Frankfurter API](https://www.frankfurter.app/)（由欧洲中央银行提供支持的每日参考汇率），并在网络请求失败或受限时，自动无缝降级到备份的 [exchangerate.fun API](https://api.exchangerate.fun/)（每小时更新，支持 170+ 种货币）。
- **智能本地缓存**：使用 `localStorage` 对汇率数据进行智能缓存（有效期 1 小时），大幅度缩减网络开销，实现秒开，且提供手动强制刷新功能。
- **历史走势图表**：内置集成 [Chart.js](https://www.chartjs.org/) 图表库，实时查询并绘制 7天、30天、90天 和 1年 的双币种历史汇率波动走势折线图，支持高亮悬浮展示。
- **自定义货币看板**：支持添加自选置顶的“常用汇率面板”，可在一页内快速预览多种主要货币的兑换金额。
- **历史汇率回溯**：支持选择过去任意一天的指定日期，查询该日期当日的真实官方收盘汇率。
- **高颜值 UI 设计**：
  - 基于现代 CSS 构建，纯手写 Vanilla CSS，无臃肿框架。
  - **毛玻璃质感（Glassmorphism）**与暗系背景发光光斑。
  - **自适应深浅主题**：支持手动切换深色模式、浅色模式，或自动跟随系统设置。
  - **极致的微动交互**：旋转互换动画、微弹交互按键、加载骨架屏（Skeleton Screen）与渐入动效。
- **无障碍搜索**：定制开发了可检索的货币下拉选择弹窗，支持通过货币代码（如 USD）或中文名称（如 美元）实时过滤检索 150+ 种全球货币。

## 🛠️ 项目结构

```text
currency-converter-spa/
├── index.html     # 页面骨架与结构
├── style.css      # 现代拟态玻璃化 CSS 设计系统与适配规则
├── app.js         # 应用核心业务逻辑、缓存及图表控制层
└── README.md      # 项目自述文件
```

## 🚀 快速上手

由于项目采用纯原生 Web 开发（Vanilla HTML/CSS/JavaScript），**无需任何构建步骤**（没有 npm install 或 webpack 等繁琐配置），只需以下简单几步即可运行：

1. **本地预览**：
   - 直接双击 `index.html` 文件在任意浏览器中打开。
   - 或者，建议使用 Live Server（VS Code 插件）或任何本地 Web 服务器启动项目以获得更好的静态资源解析体验（如：`npx serve`）。

2. **如何推送到您的 GitHub**：
   如果您希望将本项目上传到您的个人 GitHub 仓库中，可以按如下步骤进行：
   ```bash
   # 1. 在本地项目根目录下初始化 Git (如果在神秘的 mysteious-volta 根目录已初始化，则无需重复)
   git init
   
   # 2. 添加所有新文件
   git add currency-converter-spa/
   
   # 3. 提交更改
   git commit -m "feat: init premium currency converter spa"
   
   # 4. 关联 GitHub 远程仓库 (请替换成您自己的仓库地址)
   git remote add origin https://github.com/您的用户名/您的仓库名.git
   
   # 5. 重命名主分支并推送到远程
   git branch -M main
   git push -u origin main
   ```

## 📊 数据源声明

- 默认及图表数据源来自：[Frankfurter API](https://www.frankfurter.app/) / 欧洲中央银行 (ECB) 官方参考数据。
- 备选多币种数据源来自：[exchangerate.fun](https://api.exchangerate.fun/)。
- 所有汇率数据不构成任何实际投资建议，仅供学术研究和旅行估算使用。
