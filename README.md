# matv.io

My personal website. Next.js 15, Tailwind, MapLibre.

Live at [matv.io](https://matv.io).

## Development

```sh
nix develop   # or: install node 22 + pnpm yourself
pnpm install
pnpm dev      # http://localhost:6288
```

Copy `.env.example` to `.env` for the admin panel and Pexels integration —
the site runs fine without it (photography falls back to a committed snapshot).

## Checks

```sh
pnpm check    # lint + typecheck
pnpm build
```
