USE raw_urban_ecommerce;

INSERT INTO categories (name, image_url) VALUES
('Hoodies', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'),
('Pants', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'),
('T-Shirts', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'),
('Outerwear', 'https://images.unsplash.com/photo-1591557304192-23c21c72626e?auto=format&fit=crop&q=80&w=800'),
('Sweatshirts', 'https://images.unsplash.com/photo-1614251052600-4b2a8f8d6896?auto=format&fit=crop&q=80&w=800'),
('Accessories', 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800');

-- Products: same catalog already mocked in src/app/services/product.service.ts,
-- so the frontend content stays identical once wired to the real API.
INSERT INTO products (category_id, name, short_description, price, old_price, rating, review_count, image_url, is_new, is_bestseller) VALUES
((SELECT id FROM categories WHERE name = 'Hoodies'), 'STRIKE OVERSIZED HOODIE', 'Heavyweight cotton hoodie with drop shoulders and bold back graphic. Built for the streets. 100% premium cotton, 400gsm.', 89.99, NULL, 4.8, 124, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800', 1, 0),
((SELECT id FROM categories WHERE name = 'Pants'), 'NEON UTILITY CARGO PANTS', 'Tactical cargo pants with multi-pocket design, adjustable cuffs, and reinforced stitching. Water-resistant finish.', 110.00, 140.00, 4.5, 89, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800', 0, 0),
((SELECT id FROM categories WHERE name = 'T-Shirts'), 'BLOCK LOGO TEE', 'Boxy fit heavy tee featuring our signature block logo front and center. Essential everyday piece.', 45.00, NULL, 4.9, 312, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800', 0, 1),
((SELECT id FROM categories WHERE name = 'Outerwear'), 'TACTICAL VEST', 'Layer up with this tech-wear inspired vest. Features magnetic buckles, mesh lining, and secure zip pockets.', 135.00, NULL, 4.7, 45, 'https://images.unsplash.com/photo-1591557304192-23c21c72626e?auto=format&fit=crop&q=80&w=800', 0, 0),
((SELECT id FROM categories WHERE name = 'Sweatshirts'), 'ACID WASH CREWNECK', 'Vintage-inspired acid wash crewneck with distressed details and relaxed fit.', 75.00, 95.00, 4.4, 67, 'https://images.unsplash.com/photo-1614251052600-4b2a8f8d6896?auto=format&fit=crop&q=80&w=800', 0, 0),
((SELECT id FROM categories WHERE name = 'Accessories'), 'STRIKE BEANIE', 'Chunky knit beanie with rubberized logo patch. Keeps you warm and on point.', 28.00, NULL, 4.8, 150, 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800', 0, 1),
((SELECT id FROM categories WHERE name = 'Outerwear'), 'GRAFFITI PUFFER JACKET', 'High-volume puffer jacket featuring custom all-over graffiti print. Extreme cold protection.', 195.00, NULL, 4.9, 32, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800', 1, 0),
((SELECT id FROM categories WHERE name = 'Pants'), 'ESSENTIAL JOGGERS', 'Premium fleece joggers with tapered fit, long drawstrings, and embroidered logo.', 65.00, NULL, 4.6, 210, 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800', 0, 0);

-- Variants: every size x color combination per product (not a partial subset),
-- so the size/color pickers in product-detail.ts never hit a combination that
-- doesn't exist in stock.
INSERT INTO product_variants (product_id, size, color, stock)
SELECT id, v.size, v.color, 3 FROM products,
  (SELECT 'S' AS size, 'Black' AS color UNION ALL SELECT 'S', 'Red' UNION ALL SELECT 'S', 'Grey'
   UNION ALL SELECT 'M', 'Black' UNION ALL SELECT 'M', 'Red' UNION ALL SELECT 'M', 'Grey'
   UNION ALL SELECT 'L', 'Black' UNION ALL SELECT 'L', 'Red' UNION ALL SELECT 'L', 'Grey'
   UNION ALL SELECT 'XL', 'Black' UNION ALL SELECT 'XL', 'Red' UNION ALL SELECT 'XL', 'Grey'
   UNION ALL SELECT 'XXL', 'Black' UNION ALL SELECT 'XXL', 'Red' UNION ALL SELECT 'XXL', 'Grey') v
WHERE name = 'STRIKE OVERSIZED HOODIE';

INSERT INTO product_variants (product_id, size, color, stock)
SELECT id, v.size, v.color, 3 FROM products,
  (SELECT '28' AS size, 'Black' AS color UNION ALL SELECT '28', 'Olive'
   UNION ALL SELECT '30', 'Black' UNION ALL SELECT '30', 'Olive'
   UNION ALL SELECT '32', 'Black' UNION ALL SELECT '32', 'Olive'
   UNION ALL SELECT '34', 'Black' UNION ALL SELECT '34', 'Olive'
   UNION ALL SELECT '36', 'Black' UNION ALL SELECT '36', 'Olive') v
WHERE name = 'NEON UTILITY CARGO PANTS';

INSERT INTO product_variants (product_id, size, color, stock)
SELECT id, v.size, v.color, 15 FROM products,
  (SELECT 'S' AS size, 'White' AS color UNION ALL SELECT 'S', 'Black'
   UNION ALL SELECT 'M', 'White' UNION ALL SELECT 'M', 'Black'
   UNION ALL SELECT 'L', 'White' UNION ALL SELECT 'L', 'Black'
   UNION ALL SELECT 'XL', 'White' UNION ALL SELECT 'XL', 'Black') v
WHERE name = 'BLOCK LOGO TEE';

INSERT INTO product_variants (product_id, size, color, stock)
SELECT id, v.size, v.color, 5 FROM products,
  (SELECT 'M' AS size, 'Black' AS color UNION ALL SELECT 'L', 'Black' UNION ALL SELECT 'XL', 'Black') v
WHERE name = 'TACTICAL VEST';

INSERT INTO product_variants (product_id, size, color, stock)
SELECT id, v.size, v.color, 10 FROM products,
  (SELECT 'S' AS size, 'Grey' AS color UNION ALL SELECT 'S', 'Charcoal'
   UNION ALL SELECT 'M', 'Grey' UNION ALL SELECT 'M', 'Charcoal'
   UNION ALL SELECT 'L', 'Grey' UNION ALL SELECT 'L', 'Charcoal'
   UNION ALL SELECT 'XL', 'Grey' UNION ALL SELECT 'XL', 'Charcoal') v
WHERE name = 'ACID WASH CREWNECK';

INSERT INTO product_variants (product_id, size, color, stock)
SELECT id, v.size, v.color, 67 FROM products,
  (SELECT 'OS' AS size, 'Black' AS color UNION ALL SELECT 'OS', 'Red' UNION ALL SELECT 'OS', 'Neon Green') v
WHERE name = 'STRIKE BEANIE';

INSERT INTO product_variants (product_id, size, color, stock)
SELECT id, v.size, v.color, 3 FROM products,
  (SELECT 'M' AS size, 'Black/White' AS color UNION ALL SELECT 'L', 'Black/White' UNION ALL SELECT 'XL', 'Black/White') v
WHERE name = 'GRAFFITI PUFFER JACKET';

INSERT INTO product_variants (product_id, size, color, stock)
SELECT id, v.size, v.color, 19 FROM products,
  (SELECT 'S' AS size, 'Black' AS color UNION ALL SELECT 'S', 'Grey'
   UNION ALL SELECT 'M', 'Black' UNION ALL SELECT 'M', 'Grey'
   UNION ALL SELECT 'L', 'Black' UNION ALL SELECT 'L', 'Grey'
   UNION ALL SELECT 'XL', 'Black' UNION ALL SELECT 'XL', 'Grey') v
WHERE name = 'ESSENTIAL JOGGERS';
