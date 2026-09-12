# 首页视觉更新交接 — 2026-09-12

本次仅优化 Hero、Shop by Category 和相关图片/响应式样式。原项目继续使用，未重新初始化。完成后停止，未进入第三阶段。

## 修改文件
- components/home/hero.tsx
- components/home/category-mosaic.tsx
- data/brand.ts（Hero 文案及首页专用图片映射）
- app/globals.css（只移除/替换 Hero 和 Mosaic 样式规则）
- public/images/home/ 下六张原始 PNG
- docs/home-visual-2026-09-12.md（本文件）

没有修改 data/catalog.ts、types/product.ts、Collection URL、商品真实性逻辑、Header/Footer、Shop、Product Detail、Best Sellers、Why Choose Us。

## 图片映射
| 上传图片 | 用途 | 项目路径 |
|---|---|---|
| IMAGE 1，9月12日 15_42_59 | Hero | public/images/home/hero-main.png |
| IMAGE 2，9月11日 09_35_42 | Beaded Bracelets，珠串手链 | public/images/home/category-beaded-bracelets.png |
| IMAGE 3，9月12日 14_56_15 | Beaded Necklaces | public/images/home/category-beaded-necklaces.png |
| IMAGE 4，9月12日 15_07_22 | Earrings | public/images/home/category-earrings.png |
| IMAGE 5，9月12日 15_19_36 | Rings | public/images/home/category-rings.png |
| IMAGE 6，9月12日 15_40_08 | Bangles，完整硬质手镯 | public/images/home/category-bangles.png |

原图完整复制，无重新生成、调色、烘焙文字或压缩覆盖。由 next/image 提供响应式优化，仅 Hero preload，分类默认懒加载。Alt 按佩戴场景/珠宝类别描述，不从照片推断鉴定信息。

## Hero
最终文案：Naturally Distinctive.
副文案：Jewelry crafted to celebrate the unique beauty of natural stone.
唯一 CTA：SHOP NEW ARRIVALS →，链接 /new-in；暖象牙色文字、细底线、无实心背景，箭头悬停移动 4px/250ms。

| 屏幕 | 布局与高度 | object-position | 字号 |
|---|---|---|---|
| Desktop ≥1200 | 全宽 cover；85svh，最小680px，最大900px；文案左侧、top54%；左边距clamp(48px,6vw,110px) | 100% 50% | 标题clamp(58px,5vw,72px)，副文案18–21px，CTA14px |
| Tablet 768–1199 | 保留横图比例与左侧留白；56.25vw，最小440px，最大670px；文案左40px、top56% | 94% 50% | 标题46–60px，副文案17px且宽度26vw，CTA14px |
| Mobile <768 | 同一 Hero 内上方照片、底部深绿文案安全区；80svh，最小620px，最大760px；左右22px | 100% 50% | 标题clamp(38px,6vw,46px)，副文案16px，CTA13px |

375×812 检查时 Hero 约650px；1024×900为576px；1440×1000为850px。固定高度和 Grid 行尺寸提前占位。
窄屏采取照片+底部文字安全区，是为保留项链、耳饰、戒指和尽可能多的手链，避免文字覆盖珠宝；没有对横图进行生成式扩展。
无全图滤镜、暗色覆盖或背景大渐变。Header 仍使用原暖白独立结构。

## Category
Desktop 为12列：Bangles占左6列跨两行；右上 Beaded Bracelets、Beaded Necklaces 各3列；右下 Earrings、Rings 各3列。行高为容器宽度32%和26%，Gap16px，最大外容器1440px。
Tablet 保持12列构图，行高34%和29%，Gap12px，标题20px（Bangles32px）。
Mobile 为两列，Bangles首行通栏4:5；第二行手串/项链；第三行耳饰/戒指，普通图3:4，Gap10px。标题18–22px（Bangles28px），CTA11px。
分类区上下留白桌面90–130px，手机68px。名称 Serif，大写；SHOP NOW为Sans。暗图用暖白，明图深灰，渐变仅在底部文字附近；整图可点击，键盘焦点清晰。
图片轻微放大1.025，600ms；箭头移动4px，250ms；尊重 reduced-motion。

| 分类 | 桌面 object-position | 手机 object-position |
|---|---|---|
| Bangles | 56% 61% | 56% 60% |
| Beaded Bracelets | 53% 54% | 54% 54% |
| Beaded Necklaces | 50% 56% | 50% 50% |
| Earrings | 53% 47% | 54% 48% |
| Rings | 55% 58% | 55% 57% |

原 Collection 路由全部保持。Bangles与Beaded Bracelets完全分开，前台无旧独立Bracelets/Pendants类别。

## QA 与范围
- lint、build、现有6项测试通过，无TypeScript错误。
- 首页375、768、1024、1440px视觉检查，未见明显溢出、变形或严重珠宝裁切。
- Hero唯一CTA进入/new-in；五张分类图分别点击到对应Collection。
- HTTP回归：28页200，13条原重定向正确，3个预期404正常。
- 浏览器Console未捕获Error/Warning或Hydration错误。
- Header菜单、Best Sellers、Why Choose Us、Shop、Product Detail保留原组件及数据；商品浏览回归正常。
- 本次Hero和五分类已无图片占位；其他区域原有商品/工坊/教育图片占位继续保留，符合本次仅改前两区的范围。
- 仍是开发预览，未接Cart/Checkout/登录，未改变原功能边界。
- 本地预览：http://127.0.0.1:3000/

没有更换技术栈、路由或产品Schema。平板和手机按原图构图调整而非机械使用桌面高度。停止，等待确认。

