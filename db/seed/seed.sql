-- Seed initial catalog data (idempotent: safe to run multiple times)

INSERT INTO categories (id, name, count, kind, material) VALUES
  ('pooja',     'Pooja & Ritual',  34, 'diya',   'brass'),
  ('wellness',  'Copper Wellness', 22, 'bottle', 'copper'),
  ('serveware', 'Serveware',       47, 'thali',  'brass'),
  ('cookware',  'Cookware',        18, 'kadhai', 'brass'),
  ('storage',   'Steel Storage',   26, 'dabba',  'steel'),
  ('gifts',     'Gift Hampers',    12, 'gift',   'brass')
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, count=EXCLUDED.count;

INSERT INTO products (id, name, sub, material, kind, category_id, price, mrp, rating, reviews, finish, size, badge) VALUES
  ('p1','Sanchi Brass Lota','Handcrafted Water Vessel','brass','lota','pooja',1240,1580,4.7,128,ARRAY['Mirror','Antique'],ARRAY['250ml','500ml','750ml'],'Bestseller'),
  ('p2','Tamra Copper Bottle','Ayurveda Hydration · 1 L','copper','bottle','wellness',1899,2400,4.8,412,ARRAY['Hammered','Smooth'],ARRAY['750ml','1L','1.2L'],'Editor''s Pick'),
  ('p3','Maharaja Brass Thali','Six-bowl Festive Plate','brass','thali','serveware',3450,3950,4.6,87,ARRAY['Etched','Plain'],ARRAY['11"','13"'],'Limited'),
  ('p4','Vidya Steel Dabba Set','Triple-tier Storage · 3 pc','steel','dabba','storage',1490,1750,4.4,56,ARRAY['Brushed'],ARRAY['Small','Medium','Large'],NULL),
  ('p5','Agni Brass Kadhai','Heavy-bottom Cookware','brass','kadhai','cookware',2890,3400,4.7,142,ARRAY['Tinned','Plain'],ARRAY['1.5L','2.5L','3.5L'],NULL),
  ('p6','Deepak Brass Diya','Hand-cast Oil Lamp · Pair','brass','diya','pooja',690,890,4.9,312,ARRAY['Polished','Antique'],ARRAY['Small','Large'],'New'),
  ('p7','Shanti Copper Tumbler','Ridged · 300ml','copper','tumbler','wellness',540,720,4.5,198,ARRAY['Hammered','Smooth'],ARRAY['200ml','300ml'],NULL),
  ('p8','Kala Brass Spoon Set','Five-piece Serveware','brass','spoon','serveware',1180,1450,4.6,64,ARRAY['Mirror','Etched'],ARRAY['Set of 5'],NULL),
  ('p9','Mangalam Wedding Hamper','Curated 8-piece Set','brass','gift','gifts',7990,9800,5.0,41,ARRAY['Premium Box'],ARRAY['Standard','Royal'],'Gift Pack')
ON CONFLICT (id) DO UPDATE SET
  name=EXCLUDED.name, sub=EXCLUDED.sub, price=EXCLUDED.price, mrp=EXCLUDED.mrp,
  rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, finish=EXCLUDED.finish,
  size=EXCLUDED.size, badge=EXCLUDED.badge;

INSERT INTO reviews (product_id, name, loc, rating, title, body) VALUES
  ('p1','Anjali Mehta','Mumbai',5,'Heirloom-quality, truly','The brass lota arrived in a velvet pouch with a hand-written note. Weight, finish, and patina are exactly what I hoped for.'),
  ('p2','Ravi Krishnan','Bengaluru',5,'Bottle keeps water fresh & cool','Been using the copper bottle for 4 months — water tastes mineral-soft and I genuinely feel better digestion. Hammered finish is gorgeous.'),
  ('p9','Priya Shah','Ahmedabad',4,'Wedding gift hit','Bought the Mangalam hamper for my sister''s wedding. Packaging alone was worth it.')
ON CONFLICT DO NOTHING;
