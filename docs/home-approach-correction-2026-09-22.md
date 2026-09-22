# 首页品牌介绍区纠正 — 2026-09-22

## 位置与范围
实际修改首页 / 的 WhyChooseUs（components/home/why-choose-us.tsx）。app/page.tsx 的组件排列没有变动：Hero → CategoryMosaic → BestSellers → WhyChooseUs → TradeInquiry。新的品牌区直接衔接原有 Trade，无新增 Closing。

只改该组件及其独立 CSS Module，并撤销上一轮 /about 错误长页。Header、Hero、Category、Best Sellers、Trade、Footer、Customer Service、Contact、邮件、WhatsApp、SKU 001、产品数据、价格和 Checkout 均未修改。三张图片文件未修改。

## /about 处理
保留 /about 路由和 About Longyi 标题，恢复此前 TAKING SHAPE 基础内容及 Explore the collection 链接；移除上一轮重复三段叙事与 Closing，删除其不再使用的 page.module.css。Header / Footer 链接仍有效。

## 图片
- Source：/images/about/source-workshop.png
- Selection：/images/about/selection-by-hand.png
- Store：/images/about/longyi-store.jpg

全部沿用已有原始资源，保持比例；没有生成、调色、改人物或改门店文字。Store 招牌、柜台、主要陈列保留完整。Next/Image quality=95，包含 width / height / sizes。

## 文案
OUR APPROACH
From Source to Selection to Store.
We stay close to the details that shape every piece — from understanding the materials we work with to careful selection and the way our jewelry is experienced in person.

### 01 / SOURCE — Closer to the Source
We stay close to the sourcing and production process, allowing us to better understand the materials we work with and remain involved throughout the journey from material to finished jewelry.

### 02 / SELECTION — Selected with Care
Color, texture, shape and overall harmony all matter. We pay attention to the natural character of each bead so the finished piece feels balanced while preserving the variations that make natural stone unique.

### 03 / STORE — A Real Place, A Real Presence
Our physical store is where Longyi Jewellery comes to life — a space where customers can see our pieces up close, appreciate their natural character, and connect with the people behind the brand.

Store 英文逐字保留。项目当前无站内中文语言切换，本轮保持英文页面，未扩展全站多语言功能。若后续接入中文，标题应使用用户指定“从源头、甄选，到线下门店。”，不采用浏览器自动翻译作为站内文案。

## 布局与检查
Desktop 内容组最大宽度 920px，Source 图文约 58:42、Selection 约 53:47、Store 文图约 42:58；图片均非整屏。1440px 下整个 Section 约 1605px，较上一轮独立长页明显缩短。
375 / 430：单列图 → Label → 标题 → 正文；768：单列；1024 / 1440：交替图文。五个宽度均无横向溢出，Trade 始终为下一 Section；Footer 未改。
桌面完整首页截图和手机完整首页截图保存于 outputs/qa，包含品牌区、Trade 及 Footer。
所有三张图片正常加载；未发现 Console Error / Warning、Hydration Error 或图片 404。

Lint 通过；Build 通过；现有 23 项 Tests 全通过。
预览：http://127.0.0.1:3000/
Git：现有 main 的正常后继提交，不 force push；最终链接见交付消息。
