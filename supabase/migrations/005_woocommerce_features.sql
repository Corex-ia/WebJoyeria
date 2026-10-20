-- ─────────────────────────────────────────────
-- Coupons table
-- ─────────────────────────────────────────────
create table if not exists coupons (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  description text,
  type        text not null default 'percent',   -- 'percent' | 'fixed'
  amount      numeric(10,2) not null,             -- % or Q amount
  min_order   numeric(10,2) default 0,
  max_uses    int default null,
  uses        int default 0,
  active      boolean default true,
  expires_at  timestamptz default null,
  created_at  timestamptz default now()
);

-- ─────────────────────────────────────────────
-- Product reviews table
-- ─────────────────────────────────────────────
create table if not exists product_reviews (
  id          uuid primary key default gen_random_uuid(),
  product_id  integer not null references products(id) on delete cascade,
  author_name text not null,
  author_email text,
  rating      smallint not null check (rating between 1 and 5),
  body        text not null,
  approved    boolean default false,
  created_at  timestamptz default now()
);

create index if not exists idx_reviews_product on product_reviews(product_id, approved);

-- ─────────────────────────────────────────────
-- Add shipping fields to orders
-- ─────────────────────────────────────────────
alter table orders
  add column if not exists shipping_method text,
  add column if not exists shipping_cost   numeric(10,2) default 0,
  add column if not exists coupon_code     text,
  add column if not exists discount_amount numeric(10,2) default 0;

-- Seed a sample coupon
insert into coupons (code, description, type, amount, min_order, active)
values ('OASIS10', '10% de descuento en tu primera compra', 'percent', 10, 100, true)
on conflict (code) do nothing;
