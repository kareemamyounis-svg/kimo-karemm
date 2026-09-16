from pathlib import Path

home = Path('/home/ubuntu/kimo-karemm/client/src/pages/Home.tsx')
text = home.read_text()
replacements = {
    'price: 50, oldPrice: 64': 'price: 189, oldPrice: 239',
    'price: 58, badge': 'price: 219, badge',
    'price: 60, badge': 'price: 229, badge',
    'price: 52, color': 'price: 199, color',
    'price: 92, badge': 'price: 349, badge',
    'price: 76, color': 'price: 279, color',
    'import { useMemo, useState } from "react";': 'import { useMemo, useState } from "react";\n\nconst formatSAR = (amount: number) => `${amount.toLocaleString("en-SA")} SAR`;',
    '<div className="product-price">{product.oldPrice && <s>${product.oldPrice}</s>} ${product.price}</div>': '<div className="product-price">{product.oldPrice && <s>{formatSAR(product.oldPrice)}</s>} {formatSAR(product.price)}</div>',
    '<strong>${modalProduct.price}</strong>': '<strong>{formatSAR(modalProduct.price)}</strong>',
    '<strong>${line.product.price * line.quantity}</strong>': '<strong>{formatSAR(line.product.price * line.quantity)}</strong>',
    '<strong>${subtotal}</strong>': '<strong>{formatSAR(subtotal)}</strong>',
}
for old, new in replacements.items():
    if old not in text:
        raise SystemExit(f'Missing expected text: {old}')
    text = text.replace(old, new)
home.write_text(text)

css = Path('/home/ubuntu/kimo-karemm/client/src/index.css')
style = css.read_text()
style = style.replace('--gold:#c6a45c;', '--gold:#d1ae63;')
style = style.replace('.kimo-app{overflow:hidden;background:var(--black)}', '.kimo-app{overflow:hidden;background:radial-gradient(circle at 78% 18%,#181714 0,transparent 26%),var(--black)}')
style = style.replace('.kimo-header{position:sticky;', '.kimo-header{position:sticky;box-shadow:0 14px 40px rgba(0,0,0,.14);')
style = style.replace('.product-image{height:420px;position:relative;overflow:hidden}', '.product-image{height:420px;position:relative;overflow:hidden;border:1px solid #32312d;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025),0 18px 32px rgba(0,0,0,.12)}')
style = style.replace('.product-meta{display:flex;justify-content:space-between;gap:15px;padding-top:15px}', '.product-meta{display:flex;justify-content:space-between;gap:15px;padding:17px 2px 0;border-top:1px solid #24241f}')
style = style.replace('.gold-button{display:inline-flex;', '.gold-button{display:inline-flex;box-shadow:0 10px 24px rgba(209,174,99,.12);')
css.write_text(style)
print('Updated SAR pricing and premium visual polish.')
