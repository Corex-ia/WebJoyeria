-- ============================================
-- Catálogo completo — 68 productos desde WooCommerce
-- Generado: 2026-10-20
-- ============================================

-- Limpiar productos existentes y reinsertar completo
TRUNCATE TABLE products RESTART IDENTITY CASCADE;
TRUNCATE TABLE categories RESTART IDENTITY CASCADE;

-- Categorías
INSERT INTO categories (id, name, slug) VALUES
  (1, 'Aretes Stud y Perla', 'aretes-stud-perla'),
  (2, 'Aretes Largos', 'aretes-largos'),
  (3, 'Colección Primavera', 'coleccion-primavera'),
  (4, 'Colección Auténtica', 'coleccion-autentica'),
  (5, 'Colección Kids', 'coleccion-kids'),
  (6, 'Combo Dúo', 'combo-duo'),
  (7, 'Colección Aurea', 'coleccion-aurea');

-- Productos (68 productos reales)
INSERT INTO products (wp_id, name, slug, description, price, regular_price, category_id, thumbnail_url, status) VALUES
  (7399, 'Dije Tres Gracias Oro 10k', 'dije-tres-gracias-oro-10k', 'Estilo: Dije triple Material: Oro Italiano 10k Largo: 1.4 cm', 630.00, 630.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/29.png', 'publish'),
  (7395, 'Argolla Gruesa con Textura Oro 10k', 'argolla-gruesa-con-textura-oro-10k', 'Estilo: Argolla gruesa con textura Material: Oro Italiano 10k Edad: Adulta', 1755.00, 1755.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/32.png', 'publish'),
  (7394, 'Argolla Diamantada Oro 10k', 'argolla-diamantada-oro-10k', 'Estilo: Argolla diamantadas Material: Oro Italiano 10k Edad: Adulta', 3120.00, 3120.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/30.png', 'publish'),
  (7393, 'Argolla Diamantada con curvas Oro 10k', 'argolla-diamantada-con-curvas-oro-10k', 'Estilo: Argolla con curvas diamantadas Material: Oro Italiano 10k Edad: Adulta', 3825.00, 3825.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/33.png', 'publish'),
  (7390, 'Cadena con Eslabón banana barra Oro 10k', 'cadena-con-eslabna-barra-oro-10k', 'Estilo: Cadena con Eslabón Banana Barra Material: Oro Italiano 10k Edad:Adulto', 9480.00, 9480.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/42-1.png', 'publish'),
  (7388, 'Cadena con Eslabón Rolo Oro 10k', 'cadena-con-eslabon-rolo-oro-10k', 'Estilo: Cadena con Eslabón Rolo Material: Oro Italiano 10k Edad:Adulto', 7620.00, 7620.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/46.png', 'publish'),
  (7385, 'Cadena Eslabón Figaro Oro 10k', 'cadena-eslabon-figaro-oro-10k', 'Estilo: Cadena con Eslabón Figaro Material: Oro Italiano 10k Edad:Adulto', 10200.00, 10200.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/47.png', 'publish'),
  (7381, 'Cadena con Eslabón Valentino Oro 10k', 'cadena-con-eslabalentino-oro-10k', 'Estilo: Cadena con Eslabón Valentino Material: Oro Italiano 10k Edad:Adulto', 2610.00, 2610.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/41.png', 'publish'),
  (7378, 'Cadena Marina Martillada Oro 10k', 'cadena-marina-martillada-oro-10k', 'Estilo: Cadena con Eslabón martillada Material: Oro Italiano 10k Edad:Adulto Unisex', 18945.00, 18945.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/48.png', 'publish'),
  (7375, 'Cadena de Eslabón entorchado Oro 10 k', 'cadena-de-eslaboorchado-oro-10-k', 'Estilo: Cadena con Eslabón Entorchado Material: Oro Italiano 10k Edad:Adulto', 4500.00, 4500.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/44.png', 'publish'),
  (7373, 'Pulsera BISMARK Oro 10k', 'pulsera-bismark-oro-10k', 'Estilo: Pulsera doble eslabón entrelazado Material: Oro Italiano 10k Edad: Adulta Largo: 18.5 cm Peso: 1.34 gramos', 2010.00, 2010.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/38.png', 'publish'),
  (7371, 'Esclava para Bebe Oro 10k', 'esclava-para-bebe-oro-10k', 'Estilo: Pulsera para bebe con placa lisa Material: Oro Italiano 10k Edad: 0 años Largo: 13.3 cm Peso: 0.80 gramos', 1200.00, 1200.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/36.png', 'publish'),
  (7369, 'Pulsera Eslabón diseño VOLGA Oro 10k', 'pulsera-eslabon-no-volga-oro-10k', 'Estilo: Pulsera con eslabón entre lazados Material: Oro Italiano 10k Edad: Adulta Largo: 19 cm Peso: 1.22 gramos', 1830.00, 1830.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/40.png', 'publish'),
  (7334, 'Pulsera Puntos de luz oro 10 kts', 'pulsera-puntos-de-luz-oro-10-kts', 'Estilo: Pulsera con esferas de luz diamantadas Material: Oro Italiano 10k Edad: Adulta Largo: 20 cm Peso: 3.77 gramos', 5655.00, 5655.00, 7, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/35.png', 'publish'),
  (7271, 'Flor Diamantada en Oro 10 kts', 'flor-diamantada-en-oro-10-kts', 'Estilo: Bisel diamantado en forma de flor Material: Oro amarillo de 10k Edad: Adulta', 339.00, 339.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/22.jpg', 'publish'),
  (7227, 'Figura Trebol en Oro 10 kts', 'figura-trebol-en-oro-10-kts', 'Estilo: Flor trebol Material: Oro amarillo de 10k Edad: 6 años en adelante', 315.00, 315.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/17.jpg', 'publish'),
  (7224, 'Figura Girasol en Oro 10 kts', 'figura-girasol-en-oro-10-kts', 'Estilo: Girasol liso Material: Oro amarillo de 10k Edad: 5-10 años', 359.00, 359.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/Contenido-Oasis-mes-de-Marzo-1-2.jpg', 'publish'),
  (7218, 'Figura Mini en Oro 10 kts', 'figura-mini-en-oro-10-kts', 'Estilo: Mini Lisa Material: Oro amarillo de 10k Edad: 4 años en adelante', 305.00, 305.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/12.jpg', 'publish'),
  (7211, 'Figura Mariposa Yuyera Oro 10 kts', 'figura-mariposa-yuyera-oro-10-kts', 'Estilo: Mariposa con gemas Material: Oro amarillo de 10k Edad: 10 años en adelante', 375.00, 375.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/10.jpg', 'publish'),
  (7199, 'Figura Monarch Butterfly Oro 10 kts', 'figura-monarch-berfly-oro-10-kts', 'Estilo: Mariposa con 10 gemas Material: Oro amarillo de 10k Edad: Adulta', 470.00, 470.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/7-1.jpg', 'publish'),
  (7189, 'Figura Elefante Oro 10 kts', 'figura-elefante-oro-10-kts', 'Estilo: Elefante con textura Material: Oro amarillo de 10k Edad: 6 años en adelante', 340.00, 340.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/Contenido-Oasis-mes-de-Marzo-1.jpg', 'publish'),
  (7188, 'Figura Abeja Oro 10kts', 'figura-abeja-oro-10kts', 'Estilo: abeja lisa Material: Oro amarillo de 10k Edad: 5 años en adelante', 315.00, 315.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/Contenido-Oasis-mes-de-Marzo-6.jpg', 'publish'),
  (7187, 'Figura Búho en Oro 10 kts', 'figura-buho-en-oro-10-kts', 'Estilo: Búho con textura Material: Oro amarillo de 10k Edad: 8 años en adelante', 319.00, 319.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/Contenido-Oasis-mes-de-Marzo-2.jpg', 'publish'),
  (7171, 'Figura Fresa Oro 10 kts', 'figura-fresa-oro-10-kts', 'Estilo: Fresa Lisa Material: Oro amarillo de 10k Edad: 8 años en adelante', 329.00, 329.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/Contenido-Oasis-mes-de-Marzo-5.jpg', 'publish'),
  (7168, 'Figura Herradura Oro 10 kts', 'herradura-oro-10-kts', 'Estilo: Herradura Material: Oro amarillo de 10k Edad: 10 años en adelante', 305.00, 305.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2026/05/Contenido-Oasis-mes-de-Marzo-.jpg', 'publish'),
  (7112, 'Esfera Real en Oro 10 kt', 'esfera-real-en-oro-10-kt', 'Estilo: Doble esfera Material: Oro amarillo de 10k Edad: Adulta Largo: 3 cm', 1609.00, 1609.00, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/Agregar-algo-de-texto-2.jpg', 'publish'),
  (7088, 'Ositos dorados oro 10 kt', 'ositos-dorados-oro-10-kt', 'Estilo: Osito Material: Oro de 10k Edad: Niñas y Mujeres a partir de los 10 años', 395.00, 395.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2026/02/241.png', 'publish'),
  (7076, 'Corazón Primavera oro 10 kt', 'corazon-con-flor-en-oro-de-10k', 'Estilo: Corazón con flor Material: Oro de 10k Edad: Niñas y Mujeres a partir de los 10 años', 349.00, 349.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2026/02/238.png', 'publish'),
  (7024, 'Stud infinito dorado de tornillo', 'stud-infinito-dorado-de-tornillo', 'Estilo: Signo infinito Material: Oro amarillo de 10k Edad: 4 años en adelante Diámetro: 1 cm', 315.00, 315.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2026/02/14.jpg', 'publish'),
  (6976, 'Angelitos diamantados Oro 10K', 'angelitos-diamantados-oro-10k', 'Estilo: Angel Material: Oro amarillo de 10k Edad: 5-10 años Alto: 0.9 mm Ancho: 0.7 mm', 375.00, 375.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/Gemini_Generated_Image_yyhw0fyyhw0fyyhw.png', 'publish'),
  (6952, 'Flor amaré con avalo diamantado', 'flor-amare-con-avalo-diamantado', 'Estilo: Flor Amaré Material: Oro amarillo de 10k Edad: Adulta Largo: 3 cm', 1095.00, 1095.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/222.jpg', 'publish'),
  (6951, 'Tinaja Dorada 8mm con triple dorado', 'tinaja-dorada-8mon-triple-dorado', 'Estilo: Tinaja Dorada Material: Oro amarillo de 10k Edad: Adulta Largo 4.2 cm', 2135.00, 2135.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/223.jpg', 'publish'),
  (6946, 'Dulce Cereza real Oro 10k', 'dulce-cereza-real-oro-10k', 'Estilo: Cereza Material: Oro amarillo de 10k Edad: 5 años en adelante', 505.00, 505.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/225.jpg', 'publish'),
  (6940, 'Trébol con lágrima del Alba', 'trebol-con-lagrima-del-alba', 'Estilo: Lagrima del Alba Material: Oro amarillo de 10k Edad: Adulta', 849.00, 849.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/216.jpg', 'publish'),
  (6931, 'Vuelo Encantado una lagrima', 'vuelo-encantado-una-lagrima', 'Estilo: Vuelo Encantado Material: Oro amarillo de 10k Edad: Adulta', 1005.00, 1005.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/197.jpg', 'publish'),
  (6923, 'Eterna Flor con marqués y dorado', 'eterna-flor-con-marques-y-dorado', 'Estilo: Eterna Flor Material: Oro amarillo de 10k Edad: Adulta', 1085.00, 1085.00, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/188-1.jpg', 'publish'),
  (6914, 'Flor con gota de Encanto', 'flor-con-gota-de-encanto', 'Estilo: Gota de Encanto Material: Oro amarillo de 10k Edad: Adulta', 627.00, 627.00, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/180.jpg', 'publish'),
  (6905, 'Tu y Yo #16 recto en oro 10k', 'tu-y-yo-16-recto-en-oro-10k', 'Estilo: Tu y yo Material: Oro amarillo de 10k Edad: 5-10 años', 432.00, 432.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/177.jpg', 'publish'),
  (6798, 'Corazón de oro 10kt Amor puro', 'corazon-de-oro-10kt-amor-puro', 'Estilo: Corazón Material: Oro amarillo de 10k Edad: 5-10 años Diámetro: 6 mm', 320.00, 320.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/140.jpg', 'publish'),
  (6787, 'Stud destello curvo con gema', 'stud-destello-curvo-con-gema', 'Estilo: Stud destello curvo con gema Material: Oro amarillo de 10k Edad: Adulta', 319.00, 319.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/133.jpg', 'publish'),
  (6776, 'Stud destello curvo kid', 'stud-destello-curvo-oro-10k', 'Estilo: Stud destello curvo Material: Oro amarillo de 10k Edad: Niña', 255.00, 255.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/133.jpg', 'publish'),
  (6733, 'Stud Cuadrado de oro 10kt', 'stud-cuadrado-golden', 'Estilo: Cuadrado Material: Oro amarillo de 10k Edad: Adulta', 297.00, 297.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/164.jpg', 'publish'),
  (6692, 'Stud Cuadrado en oro 10kt Kid', 'stud-cuadrado-en-oro-10kt-kid', 'Estilo: Cuadrado Material: Oro amarillo de 10k Edad: Niña', 235.00, 235.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/164.jpg', 'publish'),
  (6689, 'Teléfono de oro 10kt kid', 'telefono-de-oro-10kt-kid', 'Estilo: Teléfono golden Kid Material: Oro amarillo de 10k Edad: 1-10 años', 275.00, 275.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/155.jpg', 'publish'),
  (6686, 'Teléfono de oro 10kt adulta', 'telefono-de-oro-10kt-adulta', 'Estilo: Teléfono golden Material: Oro amarillo de 10k Edad: Adulta', 345.00, 345.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/153.jpg', 'publish'),
  (6679, 'Stud corazón diamantado', 'corazon-diamantado-oro-10k', 'Estilo: Corazón Material: Oro amarillo de 10k Edad: Adulta Diámetro: 5 mm', 365.00, 365.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/149.jpg', 'publish'),
  (6672, 'Rosa de oro 10kt con lágrima', 'rosa-de-oro-10kt-con-lagrima', 'Estilo: Stud corazón Material: Oro amarillo de 10k Edad: Adulta Medida: 2.5 mm', 859.00, 859.00, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/168.jpg', 'publish'),
  (6625, 'Tinaja con cascada de zirconia', 'tinaja-con-cascada-de-zirconia', 'Estilo: Tinaja Material: Oro amarillo de 10k Edad: Adulta Largo: 4 cm', 1679.00, 1679.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/129.jpg', 'publish'),
  (6610, 'Pensamiento con cascada de Oro', 'pensamiento-con-cascada-de-oro', 'Estilo: Cascada de Oro Material: Oro amarillo de 10k Edad: Adulta Largo: 5 cm', 3159.00, 3159.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/121.jpg', 'publish'),
  (6598, 'Rosa con moña Oro 10kt', 'rosa-con-mona-oro-10kt', 'Estilo: Rosa con moña Material: Oro amarillo de 10k Edad: Adulta Largo: 3.5 cm', 1145.00, 1145.00, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/117.jpg', 'publish'),
  (6581, 'Dalia Marina en oro 10 kt', 'dalia-marina-en-oro-10-kt', 'Estilo: Concha marina Material: Oro amarillo de 10k Edad: Adulta Largo: 3 cm', 1159.00, 1159.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/105.jpg', 'publish'),
  (6551, 'Rosa Serena con dorado 10 kt', 'rosa-serena-con-dorado-10-kt', 'Estilo: Rosa Material: Oro amarillo de 10k Edad: Adulta Largo: 4.5 cm', 1805.00, 1805.00, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/98.jpg', 'publish'),
  (6546, 'Corona con zirconias oro 10 kt', 'corona-con-zirconias-oro-10-kt', 'Estilo: Corona Material: Oro amarillo de 10k Edad: Niña Altura: 6 mm', 406.00, 406.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/89.jpg', 'publish'),
  (6530, 'Florecita alegría Oro 10 kt', 'florecita-alegria-oro-10-kt', 'Estilo: Rosa Material: Oro amarillo de 10k Edad: 4-12 años', 305.00, 305.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/84.jpg', 'publish'),
  (6460, 'Mariposa Vanessa Oro 10 kt', 'mariposa-vanessa-oro-10-kt', 'Estilo: Mariposa Material: Oro amarillo de 10k Edad: Adulta', 669.00, 669.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/38.jpg', 'publish'),
  (6397, 'Golden Butterfly Oro 10 kt', 'golden-butterfly-oro-10-kt', 'Estilo: Mariposa Material: Oro amarillo de 10k Edad: Adulta Largo: 3.5 cm', 1379.00, 1379.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/66.jpg', 'publish'),
  (6247, 'Flor de fuego Oro 10 kt', 'flor-de-fuego-oro-10-kt', 'Estilo: Flor de fuego Material: Oro amarillo de 10k Edad: Adulta Largo: 3 cm', 857.00, 857.00, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/49.jpg', 'publish'),
  (6243, 'Perla blanca Kids Oro 10k', 'perla-blanca-kids-oro-10k', 'Estilo: Perla Blanca Material: Oro amarillo de 10k Edad: 0-12 años', 207.00, 207.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/51.jpg', 'publish'),
  (6177, 'Delfín diamantado Oro 10k', 'delfin-diamantado', 'Estilo: Rosa Material: Oro amarillo de 10k Edad: Adulta Largo 1.5 cm', 659.00, 659.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/joyas-16-1.jpg', 'publish'),
  (6176, 'Rosa primavera Aura Oro 10K', 'rosa-primavera-aura-oro-10k', 'Estilo: Rosa Material: Oro amarillo de 10k Edad: Adulta', 1450.00, 1450.00, 3, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/joyas-08-1.jpg', 'publish'),
  (6097, 'Libelula para niña Oro 10k', 'libelula-para-nina', 'Estilo: Libélula Material: Oro amarillo de 10k Edad: 1-2 años', 369.00, 369.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6841-copia-1.jpg', 'publish'),
  (6096, 'Triple Destello de Oro', 'triple-destello-dorado', 'Estilo: Largo dorado Material: Oro amarillo de 10k Largo: 3.2 cm', 1177.00, 1177.00, 4, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/joyas-05-1.jpg', 'publish'),
  (5951, 'Stud Coral rojo para niña', 'stud-coral-rojo-para-nina', 'Estilo: Coral rojo Material: Oro amarillo de 10k Edad: 0-3 años', 200.00, 200.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6814-copia-1.jpg', 'publish'),
  (3682, 'Stud corona para bebé Oro 10 kt', 'stud-corona-para-bebe-oro-10-kt', 'Estilo: Corona Material: Oro amarillo de 10k Edad: 0-3', 195.00, 195.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6702-1.jpg', 'publish'),
  (3679, 'Stud Dorado Oro 10 kt', 'stud-dorado-oro-10-kt', 'Estilo: Dorado Material: Oro amarillo de 10k Edad: Adulta', 225.00, 225.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6756-copia-1.jpg', 'publish'),
  (3676, 'Perla blanca de Oro 10k', 'perla-blanca-de-oro-10k', 'Estilo: Perla Blanca Material: Oro amarillo de 10k Edad: Adulta', 325.00, 325.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2025/11/55.jpg', 'publish'),
  (3675, 'Stud Bisel recto Oro 10 kt', 'stud-bisel-recto-oro-10-kt', 'Estilo: Bisel Material: Oro amarillo de 10k Edad: Adulta', 210.00, 210.00, 5, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/Q6A6618-1.jpg', 'publish'),
  (3672, 'Stud Corona redonda Oro 10k', 'stud-corona-redonda-oro-10k', 'Estilo: Corona Material: Oro amarillo de 10k Edad: Adulta', 277.00, 277.00, 1, 'https://joyeriaoasis.com/wp-content/uploads/2025/10/8.jpg', 'publish');

-- Resetear secuencias
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
-- Total productos: 68

