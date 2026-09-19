# 首页 Retail + Trade 微调交接 · 2026-09-20

## 范围
保留 Hero、Category Mosaic、Best Sellers、Why Choose Us 和 Footer 的原有结构。仅在 Why Choose Us 后增加轻量 Trade 入口，在共享 Footer 增加客服和 Trade 链接。
Hero 组件、图片、高度和定位 CSS 未改。所有图片文件、Collection、Shop、产品数据及 PDP 组件未修改。Best Sellers 保留原结构及 Demo 说明，没有替换为可能掩盖测试数据的宣传文案。
当前真实代码只有五个分类，没有 Pendants；依照本轮不改分类结构的限制，不新增分类或假图片。
现有 Workshop 图片仍保留明确 concept placeholder 标注；没有生成工厂或门店照片。

## 修改文件
- app/page.tsx
- app/globals.css
- data/brand.ts
- data/contact.ts
- data/terminology.ts
- components/home/category-mosaic.tsx
- components/home/why-choose-us.tsx
- components/home/trade-inquiry.tsx
- components/layout/footer.tsx
- components/layout/customer-help.tsx
- docs/home-retail-trade-2026-09-20.md

## Hero
Made by Nature. Worn Your Way.

Natural stone jewelry designed for everyday life — each piece shaped by its own color, texture and character.

SHOP NEW ARRIVALS → /new-in

## Why Choose Us
From Source to Store.

We stay close to every step — from material selection to the finished piece — with a hands-on approach focused on quality, consistency and transparency.

Closer to the Source

A closer connection to sourcing and production helps us understand the materials we work with and stay involved throughout the process.

A Real Place, A Real Presence

Our physical presence gives customers another way to experience our jewelry beyond the screen.

## Trade
位置：Why Choose Us 后、Footer 前，锚点 /#trade。Footer CONTACT 组新增 Trade & Wholesale。
FOR RETAILERS & TRADE
Looking to Buy for Your Business?
Minimum wholesale order: 10 pieces.
Trade pricing is available by inquiry only.
Contact Tong for pricing, availability and order details.
WHOLESALE INQUIRY →
不展示任何同行价格、折扣或阶梯报价。

最终链接：
https://wa.me/8618825229842?text=Hi%20Tong%2C%20I'm%20interested%20in%20wholesale%20purchasing.%20I'd%20like%20to%20ask%20about%20trade%20pricing%20and%20availability%20for%20an%20order%20of%2010%20pieces%20or%20more.

## 全站客服
CustomerHelp 使用原生 details + React ref，默认收起，不自动弹出，无第三方依赖。
Desktop >=960px 右下角小型 Forest Green Need Help? 入口。
Mobile / Tablet <960px 放在 Footer 正常文档流内，展开内容向下延伸，不遮挡导航或购买按钮。
支持按钮关闭、Escape 关闭及焦点返回；页面原生 dialog 打开时隐藏客服，避免干扰商品尺寸弹窗。
展开内容：Hi, I’m Tong. / Need help with a product or your order? / Chat on WhatsApp。
客服链接：
https://wa.me/8618825229842?text=Hi%20Tong%2C%20I%20have%20a%20question%20about%20your%20jewelry.
两个链接均复用 lib/whatsapp.ts，号码和预填消息编码验证。未发送消息，未验证 WhatsApp 客户端会话。

## 中文映射
data/terminology.ts 明确人工映射：
- LONGYI / Longyi Jewellery → 龙艺珠宝
- Feizhoucui → 非洲翠
- Natural Feizhoucui → 天然非洲翠
brand.chineseName 引用同一映射。全局源码、文档、配置搜索未发现用户指出的错误品牌名或错误音译。
项目没有中文语言切换、localization 引擎或自动翻译 fallback，本轮不新增大型翻译系统。映射用于站内后续中文内容；无法强制控制浏览器自带翻译或第三方翻译扩展的输出。英文商品名称、材质与 Logo 视觉保持原样。

## QA
- 375、430、768、1024、1440px：页面无横向溢出；Hero 文案及 CTA 均在原区域内，图片无加载失败。
- 五张分类卡、四张 Best Sellers、Why 两点、Trade、Footer 顺序正常；未改原响应式布局。
- 客服展开、Close、Escape、焦点返回检查通过；手机为正常文档流，未遮挡主 CTA。
- Footer Trade 链接可定位 #trade；WhatsApp 号码及消息编码正确。
- Console 无 Error / Warning / Hydration Error。
- Lint 通过；Build 通过（34 个生成页面）；Tests 12/12 通过。
- HTTP 回归 29 个有效页面、13 条重定向、3 个 404，失败 0。
- 本地目录无 .git 元数据，沿用 GitHub 插件在现有 main 父提交上提交并非强制同步；不初始化、不改写历史。

预览：http://127.0.0.1:3000/
本轮完成后停止，不进入 PDP 修改。

