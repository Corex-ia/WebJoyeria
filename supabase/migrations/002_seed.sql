-- ============================================
-- Seed — Datos reales de joyeriaoasis.com
-- ============================================

-- Categorías (extraídas del WooCommerce original)
insert into categories (id, name, slug) values
  (1,  'Aretes Stud y Perla',   'aretes-stud-perla'),
  (2,  'Aretes Largos',         'aretes-largos'),
  (3,  'Colección Primavera',   'coleccion-primavera'),
  (4,  'Colección Auténtica',   'coleccion-autentica'),
  (5,  'Colección Kids',        'coleccion-kids'),
  (6,  'Combo Dúo',             'combo-duo'),
  (7,  'Colección Aurea',       'coleccion-aurea')
on conflict (id) do nothing;

-- Productos (20 productos reales con sus precios en GTQ)
insert into products (wp_id, name, slug, price, category_id, thumbnail_url, status) values
  (3672, 'Stud Corona redonda Oro 10k',       'stud-corona-redonda-oro-10k',       277,  1, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/8.jpg', 'publish'),
  (3675, 'Stud Bisel recto Oro 10 kt',        'stud-bisel-recto-oro-10-kt',        210,  1, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6618-1.jpg', 'publish'),
  (3676, 'Perla blanca de Oro 10k',           'perla-blanca-de-oro-10k',           325,  1, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/55.jpg', 'publish'),
  (3679, 'Stud Dorado Oro 10 kt',             'stud-dorado-oro-10-kt',             225,  1, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6756-copia-1.jpg', 'publish'),
  (3682, 'Stud corona para bebé Oro 10 kt',   'stud-corona-para-bebe-oro-10-kt',   195,  5, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6702-1.jpg', 'publish'),
  (5951, 'Stud Coral rojo para niña',         'stud-coral-rojo-para-nina',         200,  5, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6814-copia-1.jpg', 'publish'),
  (6096, 'Triple Destello de Oro',            'triple-destello-de-oro',            1177, 7, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/joyas-05-1.jpg', 'publish'),
  (6097, 'Libélula para niña',                'libelula-para-nina',                369,  5, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6841-copia-1.jpg', 'publish'),
  (6176, 'Rosa primavera Aura Oro 10K',       'rosa-primavera-aura-oro-10k',       1450, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/joyas-08-1.jpg', 'publish'),
  (6177, 'Delfín diamantado Oro 10k',         'delfin-diamantado-oro-10k',         659,  4, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/joyas-16-1.jpg', 'publish'),
  (6243, 'Perla blanca Kids Oro 10k',         'perla-blanca-kids-oro-10k',         207,  5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/51.jpg', 'publish'),
  (6247, 'Flor de fuego Oro 10 kt',           'flor-de-fuego-oro-10-kt',           857,  4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/49.jpg', 'publish'),
  (6397, 'Golden Butterfly Oro 10 kt',        'golden-butterfly-oro-10-kt',        1379, 7, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/66.jpg', 'publish'),
  (6460, 'Mariposa Vanessa Oro 10 kt',        'mariposa-vanessa-oro-10-kt',        669,  3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/38.jpg', 'publish'),
  (6530, 'Florecita alegría Oro 10 kt',       'florecita-alegria-oro-10-kt',       305,  3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/84.jpg', 'publish'),
  (6546, 'Corona con zirconias oro 10 kt',    'corona-con-zirconias-oro-10-kt',    406,  7, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/89.jpg', 'publish'),
  (6551, 'Rosa Serena con dorado 10 kt',      'rosa-serena-con-dorado-10-kt',      1805, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/98.jpg', 'publish'),
  (6581, 'Dalia Marina en oro 10 kt',         'dalia-marina-en-oro-10-kt',         1159, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/105.jpg', 'publish'),
  (6598, 'Rosa con moña Oro 10kt',            'rosa-con-mona-oro-10kt',            1145, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/117.jpg', 'publish'),
  (6610, 'Pensamiento con cascada de Oro',    'pensamiento-con-cascada-de-oro',    3159, 7, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/121.jpg', 'publish')
on conflict (slug) do nothing;
