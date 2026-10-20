-- Atomic stock decrement — prevents negative stock
create or replace function decrement_stock(product_id uuid, qty int default 1)
returns void language plpgsql as $$
begin
  update products
  set stock = greatest(0, stock - qty)
  where id = product_id;
end;
$$;
