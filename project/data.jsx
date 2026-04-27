// Sample product data for Sai Store

const PRODUCTS = [
  { id: 'p1', name: 'Sanchi Brass Lota', sub: 'Handcrafted Water Vessel', material: 'brass', kind: 'lota', cat: 'Pooja', price: 1240, mrp: 1580, rating: 4.7, reviews: 128, finish: ['Mirror', 'Antique'], size: ['250ml','500ml','750ml'], badge: 'Bestseller' },
  { id: 'p2', name: 'Tamra Copper Bottle', sub: 'Ayurveda Hydration · 1 L', material: 'copper', kind: 'bottle', cat: 'Wellness', price: 1899, mrp: 2400, rating: 4.8, reviews: 412, finish: ['Hammered','Smooth'], size: ['750ml','1L','1.2L'], badge: 'Editor\'s Pick' },
  { id: 'p3', name: 'Maharaja Brass Thali', sub: 'Six-bowl Festive Plate', material: 'brass', kind: 'thali', cat: 'Serveware', price: 3450, mrp: 3950, rating: 4.6, reviews: 87, finish: ['Etched','Plain'], size: ['11"','13"'], badge: 'Limited' },
  { id: 'p4', name: 'Vidya Steel Dabba Set', sub: 'Triple-tier Storage · 3 pc', material: 'steel', kind: 'dabba', cat: 'Storage', price: 1490, mrp: 1750, rating: 4.4, reviews: 56, finish: ['Brushed'], size: ['Small','Medium','Large'] },
  { id: 'p5', name: 'Agni Brass Kadhai', sub: 'Heavy-bottom Cookware', material: 'brass', kind: 'kadhai', cat: 'Cookware', price: 2890, mrp: 3400, rating: 4.7, reviews: 142, finish: ['Tinned','Plain'], size: ['1.5L','2.5L','3.5L'] },
  { id: 'p6', name: 'Deepak Brass Diya', sub: 'Hand-cast Oil Lamp · Pair', material: 'brass', kind: 'diya', cat: 'Pooja', price: 690, mrp: 890, rating: 4.9, reviews: 312, finish: ['Polished','Antique'], size: ['Small','Large'], badge: 'New' },
  { id: 'p7', name: 'Shanti Copper Tumbler', sub: 'Ridged · 300ml', material: 'copper', kind: 'tumbler', cat: 'Wellness', price: 540, mrp: 720, rating: 4.5, reviews: 198, finish: ['Hammered','Smooth'], size: ['200ml','300ml'] },
  { id: 'p8', name: 'Kala Brass Spoon Set', sub: 'Five-piece Serveware', material: 'brass', kind: 'spoon', cat: 'Serveware', price: 1180, mrp: 1450, rating: 4.6, reviews: 64, finish: ['Mirror','Etched'], size: ['Set of 5'] },
  { id: 'p9', name: 'Mangalam Wedding Hamper', sub: 'Curated 8-piece Set', material: 'brass', kind: 'gift', cat: 'Gifts', price: 7990, mrp: 9800, rating: 5.0, reviews: 41, finish: ['Premium Box'], size: ['Standard','Royal'], badge: 'Gift Pack' },
];

const CATEGORIES = [
  { id: 'pooja', name: 'Pooja & Ritual', count: 34, kind: 'diya', material: 'brass' },
  { id: 'wellness', name: 'Copper Wellness', count: 22, kind: 'bottle', material: 'copper' },
  { id: 'serveware', name: 'Serveware', count: 47, kind: 'thali', material: 'brass' },
  { id: 'cookware', name: 'Cookware', count: 18, kind: 'kadhai', material: 'brass' },
  { id: 'storage', name: 'Steel Storage', count: 26, kind: 'dabba', material: 'steel' },
  { id: 'gifts', name: 'Gift Hampers', count: 12, kind: 'gift', material: 'brass' },
];

const REVIEWS_SAMPLE = [
  { name: 'Anjali Mehta', loc: 'Mumbai', rating: 5, title: 'Heirloom-quality, truly', body: 'The brass lota arrived in a velvet pouch with a hand-written note. Weight, finish, and patina are exactly what I hoped for. My mother thought it was from her grandmother\'s collection.', date: '12 Mar 2026' },
  { name: 'Ravi Krishnan', loc: 'Bengaluru', rating: 5, title: 'Bottle keeps water fresh & cool', body: 'Been using the copper bottle for 4 months — water tastes mineral-soft and I genuinely feel better digestion. Hammered finish is gorgeous.', date: '02 Mar 2026' },
  { name: 'Priya Shah', loc: 'Ahmedabad', rating: 4, title: 'Wedding gift hit', body: 'Bought the Mangalam hamper for my sister\'s wedding. Packaging alone was worth it — beautifully gift-wrapped, with a card. Came one day late but Sai Store made it right.', date: '24 Feb 2026' },
];

const ORDERS = [
  { id: 'SAI-2087-4412', date: '21 Apr 2026', items: 2, total: 4129, status: 'Delivered', step: 4 },
  { id: 'SAI-2087-4310', date: '08 Apr 2026', items: 1, total: 1899, status: 'Delivered', step: 4 },
  { id: 'SAI-2087-4198', date: '14 Mar 2026', items: 4, total: 8740, status: 'Delivered', step: 4 },
];

const ADDRESSES = [
  { id: 'a1', label: 'Home', name: 'Aarav Sharma', line: '14, Banyan Lane, Indiranagar', city: 'Bengaluru', state: 'Karnataka', pin: '560038', phone: '+91 98765 43210', def: true },
  { id: 'a2', label: 'Office', name: 'Aarav Sharma', line: '7th Floor, Skylark Tower, Koramangala', city: 'Bengaluru', state: 'Karnataka', pin: '560034', phone: '+91 98765 43210' },
];

window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;
window.REVIEWS_SAMPLE = REVIEWS_SAMPLE;
window.ORDERS = ORDERS;
window.ADDRESSES = ADDRESSES;
