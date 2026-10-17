# Joyería Oasis — Guía de Deploy

## 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) → New Project
2. Nombre: `joyeriaoasis`, región: US East (cercano a Guatemala)
3. Copia las variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 2. Ejecutar las migraciones SQL

En el SQL Editor de Supabase, ejecuta en orden:

1. `supabase/migrations/001_initial.sql` — crea las tablas
2. `supabase/migrations/002_seed.sql` — carga los 20 productos reales

## 3. Obtener API key de Recurrente

1. Ve a [app.recurrente.com](https://app.recurrente.com)
2. Configuración → API Keys
3. Copia tu `RECURRENTE_API_KEY`
4. URL webhook: `https://TU_DOMINIO.vercel.app/api/recurrente/webhook`

## 4. Variables de entorno (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
RECURRENTE_API_KEY=tu_api_key
RECURRENTE_WEBHOOK_SECRET=tu_webhook_secret
NEXT_PUBLIC_SITE_URL=https://joyeriaoasis.vercel.app
NEXT_PUBLIC_ADMIN_PASSWORD=tu_password_seguro
```

## 5. Deploy en Vercel

```bash
npm install -g vercel
vercel --prod
```

O conecta el repositorio en vercel.com y agrega las variables de entorno.

## 6. Panel de administración

Accede en: `https://TU_DOMINIO/admin`

- **Contraseña**: la que definiste en `NEXT_PUBLIC_ADMIN_PASSWORD`
- Agrega productos con fotos desde `/admin/productos/nuevo`
- Las fotos se suben automáticamente a Supabase Storage
- Monitorea pedidos en `/admin/pedidos`

## Estructura del sitio

| Ruta | Descripción |
|------|-------------|
| `/` | Home con hero, productos destacados |
| `/productos` | Catálogo completo con filtros por categoría |
| `/productos/[slug]` | Detalle del producto |
| `/carrito` | Vista completa del carrito |
| `/checkout` | Formulario de datos + pago Recurrente |
| `/pedido/confirmado` | Confirmación post-pago |
| `/admin` | Panel de administración |
| `/admin/productos` | Gestión de productos |
| `/admin/pedidos` | Gestión de pedidos |
