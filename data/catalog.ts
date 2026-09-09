import type { Category, Product } from "@/types/product";
export const collections: { slug: Category; name: string; image: string }[] = [
{slug:"bracelets",name:"Bracelets",image:"/images/bracelets.svg"},
{slug:"beaded-necklaces",name:"Beaded Necklaces",image:"/images/beaded-necklaces.svg"},
{slug:"pendants",name:"Pendants",image:"/images/pendants.svg"},
{slug:"earrings",name:"Earrings",image:"/images/earrings.svg"},
{slug:"rings",name:"Rings",image:"/images/rings.svg"}];
// Demo products only. Prices are USD; material descriptions require verification.
const samples: [string, Category, number, string][] = [
["Moss Beaded Bracelet","bracelets",89,"BR001"],
["River Beaded Necklace","beaded-necklaces",259,"BN001"],
["Fern Drop Pendant","pendants",119,"PD001"],
["Forest Drop Earrings","earrings",99,"ER001"],
["Stillwater Ring","rings",79,"RG001"],
["Meadow Beaded Bracelet","bracelets",109,"BR002"],
["Grove Beaded Necklace","beaded-necklaces",229,"BN002"],
["Leaf Pendant","pendants",129,"PD002"],
["Dew Earrings","earrings",89,"ER002"],
["Olive Ring","rings",95,"RG002"]];
export const products: Product[] = samples.map(([name,category,price,sku],index) => ({
id:String(index+1),slug:name.toLowerCase().replaceAll(" ","-"),name,price,category,
image:`/images/${category}.svg`,sku:`DEMO-${sku}`,
material:"African jade — sample label, verification pending",
description:`${name}: a naturally inspired design for everyday wear. Sample product; final details coming soon.`
}));
export const categoryName = (slug: Category) => collections.find((c)=>c.slug===slug)!.name;
