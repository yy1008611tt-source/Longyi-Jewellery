# Longyi Jewellery — 第一阶段
这是天然珠宝品牌网站的基础项目。第一阶段已经建立首页和设计基础，尚未开放销售。

## 本次仓库检查
GitHub 仓库 yy1008611tt-source/Longyi-Jewellery 原本为空。GitHub 内容 API 明确返回 “This repository is empty.”，所以没有旧文件或旧代码需要覆盖。
初始化后检查了 package.json、app/layout.tsx、app/page.tsx、app/globals.css 和配置结构。
项目使用 Next.js 16.3.4、React 19.2.8、TypeScript 5.9.3、Tailwind CSS 4.3.3，基于官方 create-next-app App Router 模板。
官方初始化说明：https://nextjs.org/docs/app/getting-started/installation

## 如何启动（推荐：本次验证使用的 pnpm）
安装 Node.js 24 LTS（会附带 npm），再打开项目文件夹中的终端，依次输入：
```sh
npm install -g pnpm@11.19.0
pnpm install --frozen-lockfile
pnpm dev
```
浏览器打开 http://localhost:3000 。如果 3000 被占用，以终端显示的 Local 地址为准。
停止网站：在运行它的终端按 Ctrl+C。

## 当前 Codex 电脑直接启动
当前环境有 Node.js 和内置 pnpm，但 npm 不在命令路径中。无需重装，PowerShell 在本项目文件夹内执行：
```powershell
& "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" dev
```
本次预览使用 http://127.0.0.1:3000 。

## 检查与正式运行
```sh
pnpm lint
pnpm build
pnpm start
```
lint 检查代码规范；build 编译可正式部署的版本，并检查 TypeScript 类型；start 启动构建后的版本。
pnpm-lock.yaml 锁定本次依赖版本；请保留它，不要混用多种锁文件。
未来可将仓库导入 Vercel，框架选 Next.js；第一阶段未部署到互联网。

## 文件地图
| 文件 | 作用 |
| --- | --- |
| app/page.tsx | 首页：Hero、分类、精选商品、品牌故事、Our Jade |
| app/layout.tsx | 所有页面共用的 Header、Footer、英文语言和基础 SEO |
| app/globals.css | 全局颜色、字体、间距、按钮、卡片和响应式样式 |
| app/[...slug]/page.tsx | 已规划链接的统一占位页面，未知地址仍返回 404 |
| app/not-found.tsx | 友好的 404 页面 |
| app/icon.svg | 临时品牌图标 |
| components/layout/header.tsx | 桌面导航和手机菜单，支持 Escape 关闭及焦点返回 |
| components/layout/footer.tsx | 页脚分组链接与社交占位 |
| components/layout/newsletter.tsx | 共用订阅区；只验证输入并提示未保存，不发请求 |
| components/layout/icons.tsx | 搜索、购物袋、菜单等轻量图标 |
| components/product/product-card.tsx | 可复用的商品卡片 |
| data/catalog.ts | 五个分类、十件模拟商品 |
| types/product.ts | 商品字段的 TypeScript 类型（防止漏填或填错数据） |
| lib/format.ts | 统一美元价格显示 |
| public/images/*.svg | 五张本地原创几何示意占位图，不是真实产品照片 |
| package.json | 项目依赖及启动、构建、检查命令 |
| pnpm-lock.yaml | 本次安装的确切依赖版本 |
| pnpm-workspace.yaml | 官方模板的依赖构建许可配置 |
| next.config.ts | Next.js 配置 |
| tsconfig.json、next-env.d.ts | TypeScript 配置与 Next.js 类型入口 |
| postcss.config.mjs | Tailwind CSS 处理配置 |
| eslint.config.mjs | 代码规范检查配置 |
| .gitignore | 排除依赖、构建产物和本地环境文件 |
| README.md | 本中文说明 |

相对初始化模板，替换了首页、全局布局、全局样式与 README；增加了组件、类型、数据、格式工具、占位路由和图片。移除模板自带的 Next/Vercel 图片与图标。原 GitHub 仓库没有文件，因此提交中的源代码都是新增。

## 设计规范
集中修改 app/globals.css 顶部：
- Background #faf9f5；Text #252d29；Muted #626961；Border #d9dcd2。
- Jade #254f40；Warm #eee9df；Accent #8b7046。
- 标题 Palatino / Georgia 系统衬线字体；正文 Arial / Helvetica。无需下载字体。
- 最大内容宽 1320px；区块间距 56–104px；正文 16px；卡片圆角 3px；按钮最小高度 50px。
- 手机 <600px，平板 600–959px，电脑 >=960px。
- 主图片通过 next/image 渲染；当前 SVG 不需位图压缩，替换照片后仍沿用 Image 的响应式能力。

## 修改商品和图片
在 data/catalog.ts 修改 samples 的名称、分类、美元价格和 SKU。完整对象会自动带上 id、slug、image、material、description。
要接入真实商品，可将 products 直接改成 Product[] 对象数组，每件填写实际资料。
图片放入 public/images，然后使用 /images/文件名.jpg 这样的路径。
当前首页展示 products 的前四件；改 app/page.tsx 的 slice(0,4) 可显示更多。

## 当前占位内容与上线前替换
品牌名、图标、所有图片、价格、商品资料、故事文案、社交账号、联系信息和政策都是占位。
Search 和 Cart 只有图标与 Hover；订阅不保存邮箱；所有非首页页面为 Coming soon。
材质使用“非洲翠”的暂定商品标签，没有将它断言为已鉴定的翡翠或其他具体矿物；正式销售文案应依据你提供的鉴定和实际商品资料。
metadata 已有英文标题与描述。目前因为全站仍有测试商品，设置 noindex / nofollow；正式资料和页面准备好后，再在 app/layout.tsx 与占位路由中调整 robots。
没有支付、登录、数据库、购物车、订单、后台或追踪脚本。

## 验证记录
- pnpm build 通过，TypeScript 检查通过。
- pnpm lint 通过。
- 开发服务器成功启动，首页 HTTP 200。
- 浏览器已查看桌面 1440px、平板 768px、手机 390px 布局，无横向溢出；另检查 320px 占位页。
- 手机菜单可展开，Escape 可关闭；订阅正确提示“未保存邮箱”。
- 珠串项链分类可进入对应占位页面。
- 已观察浏览器控制台未出现 error / warn。
- 更完整的浏览器兼容测试和真实设备测试留待正式上线前。

## 下一阶段建议
先完善 Shop、五个分类页和商品详情页，继续使用模拟数据；收到真实照片、正式英文品牌名与商品资料后逐步替换。本次到第一阶段为止。
