const usd = new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0});
export const formatPrice = (price:number | null) => price === null ? "Price coming soon" : usd.format(price);
