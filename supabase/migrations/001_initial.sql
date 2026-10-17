-- ============================================
-- Joyería Oasis — Schema inicial
-- ============================================

-- Categorías
create table if not exists categories (
  id   serial primary key,
  name text not null,
  slug text unique not null
);

-- Productos
create table if not exists products (
  id             serial primary key,
  name           text not null,
  slug           text unique not null,
  description    text default '',
  price          numeric(10,2) not null default 0,
  regular_price  numeric(10,2),
  sale_price     numeric(10,2),
  sku            text default '',
  stock          int  default 0,
  status         text default 'publish' check (status in ('publish','draft')),
  category_id    int  references categories(id),
  thumbnail_url  text default '',
  images         text[] default '{}',
  wp_id          int,  -- ID original de WordPress para referencia
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- Órdenes
create table if not exists orders (
  id               serial primary key,
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text default '',
  customer_address text default '',
  items            jsonb not null default '[]',
  subtotal         numeric(10,2) not null,
  shipping         numeric(10,2) default 0,
  total            numeric(10,2) not null,
  status           text default 'pending' check (status in ('pending','paid','processing','shipped','delivered','cancelled')),
  recurrente_id    text default '',
  notes            text default '',
  paid_at          timestamptz,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Actualizar updated_at automáticamente
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger products_updated_at before update on products
  for each row execute function update_updated_at();

create trigger orders_updated_at before update on orders
  for each row execute function update_updated_at();

-- Storage bucket para imágenes de productos
insert into storage.buckets (id, name, public) values ('products', 'products', true)
  on conflict (id) do nothing;

create policy "Public read products images" on storage.objects
  for select using (bucket_id = 'products');

create policy "Auth upload products images" on storage.objects
  for insert with check (bucket_id = 'products');

create policy "Auth update products images" on storage.objects
  for update using (bucket_id = 'products');

create policy "Auth delete products images" on storage.objects
  for delete using (bucket_id = 'products');
