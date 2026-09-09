# Longyi Jewellery — 第二阶段交接

在原项目续建，未重新初始化 Next.js、未更换技术栈、未部署或进入第三阶段。

## 开始前
GitHub main 为第一阶段 d8cd468；本地已完成 Shop、分类页、筛选排序、商品详情、相关推荐与目录测试。Header、Footer 和路由基础可用。旧首页和商品布局仅部分符合最终要求。旧数据有 Bracelets、Pendants 和泛化材质称谓，未发现危料商品展示。

## 保留与重构
保留 App Router、TypeScript、Tailwind、依赖锁文件、货币格式化、面包屑、404、动态路由、筛选排序、相关推荐算法，以及导航状态/键盘关闭逻辑。
重构设计系统、Header/Footer、四区首页、卡片、Gallery、购买信息和 Accordion，扩展产品字段。
删除旧首页品牌故事、大面积材质区、订阅区、newsletter 组件、Pendants 数据/图片及旧 bracelets.svg；旧 hero-bangle.png 从本地移除。

## 组件与文件
| 区域 | 文件 |
|---|---|
| 首页组合 | app/page.tsx |
| Hero | components/home/hero.tsx |
| Category Mosaic | components/home/category-mosaic.tsx |
| Best Sellers | components/home/best-sellers.tsx |
| Why Choose Us | components/home/why-choose-us.tsx |
| Header / Footer | components/layout/header.tsx、footer.tsx、icons.tsx |
| 设计系统 | app/globals.css |
| 商品详情入口 | app/products/[slug]/page.tsx |
| Gallery | components/product/product-gallery.tsx |
| 产品信息和 Accordion | components/product/product-information.tsx |
| 尺寸及购买提示 | components/product/product-options.tsx |
| 商品卡片/排序 | components/product/product-card.tsx、shop-sort.tsx |
| 产品/分类数据 | data/catalog.ts、types/product.ts |
| 品牌配置 | data/brand.ts |
| Shop/分类 | app/shop/page.tsx、app/collections/page.tsx、app/collections/[slug]/page.tsx |
| 新品 | app/new-in/page.tsx |
| About Feizhoucui | app/about-feizhoucui/page.tsx |
| 服务页占位 | app/[...slug]/page.tsx |
| 元数据/重定向 | app/layout.tsx、next.config.ts |
| 目录逻辑及测试 | lib/catalog.ts、tests/catalog.test.mjs |
| 脚本 | package.json |
| 新图片 | public/images/hero-lifestyle.png、workshop-placeholder.png、bangles.svg、beaded-bracelets.svg |
| 交接 | README.md、docs/image-prompts.md |

表格包括本地阶段二新增及本轮调整文件。lib/format.ts、breadcrumb.tsx 等继续复用。AGENTS.md/CLAUDE.md 为 Next 工具生成说明。

## 分类与清理
五类为 Bangles（硬质手镯）、Beaded Bracelets（珠串手链）、Beaded Necklaces、Earrings、Rings；每类两件开发示例，共十件。
当前页面、导航、数据类型没有旧独立 Bracelets 分类、危料或多材质商品展示。
兼容例外：next.config.ts 保留 /collections/bracelets、/our-jade 与旧商品 slug 作为重定向源，不作为现行分类或材质承诺。Pendants 旧分类返回 404。

## 产品数据
沿用 name 作为 productName、category 对应 collection，保留原浏览逻辑。
支持 stone（鉴定身份）、tradeName、colour、origin、treatment、finish、craftsmanship、workshop、naturalVariation、certificate、size（手镯内径 mm）、beadSize（mm）、braceletLength/necklaceLength（cm）、clasp、price、shortDescription、images、reviews。
未知的材质、产地、处理、证书、评价和尺寸不填，不默认 Feizhoucui 等于某矿物。Stone Origin 与 Workshop 分别显示；无资料不显示具体地点。
Naturally Unique 可逐件覆盖，无证书不显示标签，无真实评价不生成五星。Best Sellers 注明为预览选品而非真实销量排名。
品牌优势在 data/brand.ts 配置，Own Workshop 等声明带草稿提示，确认后再转为正式文案。

## 完成范围与限制
首页只有四区；桌面拼图与四商品横排，手机分类两列且末张通栏，商品两列。
PDP 桌面约 60/40，首图大图、后续双列、末张 Lifestyle 通栏；手机上下排列，按钮与五个 Accordion 全宽。Bangle 尺寸指南只对应硬质手镯。
About Feizhoucui 完成独立入口、大图占位和八个简短主题结构；真实内容待资料确认。
ADD TO BAG 可点击并显示未开放购买提示，**不是真实购物车**，未连接库存/结账/支付。沿用此前阶段范围，搜索、账户和购物袋图标为禁用占位；服务/门店/法律页仅占位，没有编造政策或地址。
Hover 已支持有真实第二图时淡入；当前缺真实第二图，不用重复图冒充另一角度。
字体采用系统 Palatino/Georgia + Arial/Helvetica，未下载 Cormorant/Inter。维持 serif + sans 组合，避免外部字体依赖。
保持 noindex。仍是开发预览，真实资料与购买功能未完成，不能正式销售。

## 待提供的真实图片
- Hero：横向 Lifestyle 模特佩戴 Feizhoucui、左侧留白，另备手机裁切。当前 AI 概念图明确标记。
- 分类：硬质手镯、珠串手链、珠串项链、耳饰佩戴、戒指近景。当前是 SVG 示意。
- Why Choose Us：真实选料、质检、工坊或门店。AI 工坊概念图不代表 Longyi 实际场地。
- 每件商品：正面、佩戴该件、微距纹理、侧背面、尺寸参照、生活方式六类。当前首图为分类示意，其余五图位标明用途。
- About Feizhoucui：真实石材纹理、透光与细节图，目前为占位。
照片保持真实颜色、纹理和通透度。

## 待提供的真实资料
每件名称、SKU、售价、证书鉴定材质、交易名称、颜色、处理情况、可验证原料产地、加工地点、工艺、表面处理、内径/珠径/长度/扣头、天然差异、证书信息、真实评价（如有）。
品牌还需确认自有制作环节、门店地址、联系方式、Instagram、配送范围/费用/时效、退换条件、测量方式、护理指南。未提供前不自动补全。

## 验证
pnpm build、pnpm lint、pnpm test 通过，6 项目录测试。
浏览器覆盖 375、768、1024、1440px，检查首页、商品详情、五分类、桌面下拉、手机菜单、新品 CTA、筛选排序、Size Guide、Accordion 和购买提示。未见明显横向溢出或图片加载故障。
HTTP：28 页返回 200 且 noindex；13 条重定向正确；3 个无效或已删除路由返回 404。
Next 开发日志未发现 Browser Error/Warning 或服务器异常，React DevTools 安装建议为开发提示。
未进行真实设备全浏览器矩阵测试；真实购买不在本阶段实现范围。

## 本地运行
已有依赖时直接 pnpm dev --hostname 127.0.0.1；新环境先 pnpm install --frozen-lockfile。
当前电脑 PowerShell 可使用：
```powershell
& "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" dev --hostname 127.0.0.1
```
预览：http://127.0.0.1:3000/
验证命令：pnpm lint、pnpm test、pnpm build。

第二阶段到此停止，等待确认。
