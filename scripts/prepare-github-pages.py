from pathlib import Path

root = Path('/home/ubuntu/kimo-karemm')
app = root / 'client/src/App.tsx'
text = app.read_text()
text = text.replace('import { Route, Switch } from "wouter";', 'import { Route, Switch, Router as WouterRouter, useHashLocation } from "wouter";')
text = text.replace('function Router() { return <Switch>', 'function Router() { return <WouterRouter hook={useHashLocation}><Switch>')
text = text.replace('</Switch>; }', '</Switch></WouterRouter>; }')
app.write_text(text)

home = root / 'client/src/pages/Home.tsx'
text = home.read_text()
text = text.replace('<span className="logo-box"><img src="/manus-storage/kimo-black-gold-logo_922466c0.png" alt="K" /></span>', '<span className="logo-box"><span className="logo-k">K</span></span>')
text = text.replace('href={`/product/${product.id}`}', 'href={`#/product/${product.id}`}')
text = text.replace('href="/size-guide"', 'href="#/size-guide"')
home.write_text(text)

vite = root / 'vite.config.ts'
text = vite.read_text()
text = text.replace('export default defineConfig({\n  plugins,', 'export default defineConfig({\n  base: process.env.VITE_BASE || "/",\n  plugins,')
vite.write_text(text)

css = root / 'client/src/index.css'
text = css.read_text()
text += '\n.logo-k{font:700 24px/1 "DM Serif Display",serif;color:var(--black);transform:translateY(-1px)}\n'
css.write_text(text)

workflow = root / '.github/workflows/deploy.yml'
workflow.parent.mkdir(parents=True, exist_ok=True)
workflow.write_text('''name: Deploy Kimo to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10.4.1
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build Vite site
        env:
          VITE_BASE: /kimo-Clothing/
        run: pnpm run build
      - name: Add SPA fallback
        run: cp dist/public/index.html dist/public/404.html
      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
''')
print('Prepared GitHub Pages workflow, base path, hash routing, and local logo.')
