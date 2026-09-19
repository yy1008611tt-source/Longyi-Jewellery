# SKU 001 最后一轮轻量完善 · 2026-09-20

## 范围和文件
- app/globals.css
- components/product/product-size-guide.tsx
- components/product/product-information.tsx
- components/product/product-options.tsx
- components/product/product-editorial-sections.tsx
- types/product.ts
- data/catalog.ts
- docs/sku001-final-polish-2026-09-20.md

没有修改图片文件、六图路径与顺序、首页结构或其他 SKU 数据。保留 Carousel、缩略图/移动圆点、箭头、Zoom、滑动及现有原生 dialog 交互。产品信息仍为 static，没有恢复 sticky。

## Gallery 与间距
展示区从固定 3:4 改为固定 1:1，继续 object-fit: contain，无拉伸、裁切、调色或重绘。4:3 横图上下留白合计由容器高度的约 43.75% 减少至 25%；竖图完整显示并在两侧留白。切换横竖图不改变展示区高度。
桌面区块间距及 Naturally Unique 顶部内边距从 64px 减为 48px；手机保留区块间距 36px，Naturally Unique 顶部内边距 32px、额外上边距 0。保留图文响应式排列。
PDP 使用 scrollbar-gutter: stable，防止打开锁滚动弹窗时页面宽度跳变。

## Size Guide
PART 1 — WRIST SIZE
- 14–16 cm — For wrist circumferences between 14 and 16 cm.
- 16–18 cm — For wrist circumferences between 16 and 18 cm.
- 18–20 cm — For wrist circumferences between 18 and 20 cm.

HOW TO MEASURE
Wrap a soft measuring tape snugly around your wrist where you normally wear your bracelet.
Measure your actual wrist circumference without adding extra length.
Then choose the closest size range.

FLEXIBLE FIT
Each bracelet is adjusted by adding or removing beads according to the selected wrist-size range and is finished with a flexible elastic cord for a comfortable fit.

NEED A DIFFERENT SIZE?
Contact Tong on WhatsApp for custom sizing assistance.
Chat with Tong →

PART 2 — BEAD SIZE
Approx. 8 mm / ≈ 0.31 in
The image is for bead-size comparison only.
Other bracelet designs shown are for scale reference and are not included with this product.
继续使用 /images/products/001/03-bead-size-guide.png，仅在 Size Guide 内显示。

## 购买与咨询
Wrist Size 无默认值，未选点击 ADD TO BAG 显示 Please select your wrist size.
保留 $150 USD 和 Forest Green 主按钮。
重要现有限制：项目没有真实购物车/结账实现。选好尺寸后仍显示原有预览提示，不会真正加购；本轮不扩展电商后端，也未伪造加购成功。

购买区域仅保留一处尺寸咨询：
Not sure about your size or need a different fit?
Chat with Tong on WhatsApp →
按要求保留弹窗和 SIZE & FIT 内的定制尺寸帮助。

Product Help 为购买区内轻量文本链接，继续保留全站既有 CustomerHelp，不创建第二套悬浮客服。号码/编码复用现有产品 WhatsApp 数据和 lib/whatsapp.ts。

所有链接号码均为 8618825229842；预填消息：
- 尺寸：Hi Tong, I'm interested in the Verdant Beaded Bracelet. Could you help me choose the right wrist size?
- 定制尺寸：Hi Tong, I'm interested in the Verdant Beaded Bracelet. I need help with a different wrist size.
- Product Help：Hi Tong, I'm interested in the Verdant Beaded Bracelet. I have a question about this product.
- Wholesale：Hi Tong, I'm interested in wholesale purchasing for the Verdant Beaded Bracelet. I'd like to ask about trade pricing and availability for an order of 10 pieces or more.

WHOLESALE INQUIRY 为轻量描边链接按钮，低于主 CTA。
Minimum wholesale order: 10 pieces.
Trade pricing is available by inquiry only.
Contact Tong on WhatsApp for pricing, availability and order details.
无公开批发价格。

## Shipping / Exchanges
购买区：$20 shipping · Free shipping on orders $300+
Accordion：
A flat $20 USD shipping fee applies to orders under $300 USD.
Orders of $300 USD or more qualify for free shipping.

Final Sale — Fit Exchanges Only
All sales are final and returns are not accepted.
If the bracelet fit is unsuitable, you may request a size exchange for the same product within 3 days of delivery.
The item must remain unworn, undamaged, and in its complete original packaging.
A continuous unboxing video recorded when the package is first opened is required for exchange verification.
Customers are responsible for all shipping costs associated with the exchange.
Exchanges for a different product or style are not available.
If you have sizing concerns before ordering, contact Tong on WhatsApp for assistance.

## 命名
沿用 data/terminology.ts 人工映射：
Feizhoucui → 非洲翠
Natural Feizhoucui → 天然非洲翠
LONGYI / Longyi Jewellery → 龙艺珠宝
全局源码/文档未发现用户指出的错误中文写法。英文品牌和 Material 未修改。
当前无中文语言切换/自动翻译引擎；人工映射不能覆盖浏览器第三方翻译输出。

## QA
- 375 / 430 / 768 / 1024 / 1440px：无横向溢出、图片不拉伸/裁切，Naturally Unique 不与购买区重叠。
- 各宽度切换主图和横图，Gallery 高度及商品信息文档坐标保持不变；1440px 六图完整循环高度均为 752.390625px。
- Desktop Modal / Mobile Bottom Sheet；Close、ESC、遮罩关闭、焦点返回、背景滚动锁定通过。弹窗横向内容无溢出。
- 缩略图、箭头循环、Zoom、手机宽度指针拖动切图通过；未在真实触屏设备上测试。
- Wrist Size 无默认值、未选提示、选中态通过。Accordion SIZE & FIT / SHIPPING & RETURNS 展开正常。
- 四个 WhatsApp 链接号码和消息编码往返验证通过；没有发送消息或验证外部 WhatsApp 客户端。
- Console 无 Error / Warning / Hydration Error。
- Lint / Build（34 页）/ Tests（12/12）通过。
- GitHub main 以现有提交为父提交非强制更新，无历史重写。

预览：http://127.0.0.1:3000/products/verdant-beaded-bracelet
完成后停止，不进入 SKU 002。

