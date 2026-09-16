import { useMemo, useState } from "react";

const formatSAR = (amount: number) => `${amount.toLocaleString("en-SA")} SAR`;
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Menu, Search, ShoppingBag, X } from "lucide-react";

// EDIT HERE: products, prices, copy, and images are intentionally centralized.
const PRODUCTS = [
  { id: 1, name: "K-01 / Core Tee", category: "Shirts", price: 189, oldPrice: 239, badge: "BESTSELLER", color: "#d9d5ca", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1100&q=85", description: "A precise heavyweight tee with a relaxed shoulder and the Kimo mark at the chest." },
  { id: 2, name: "K-02 / After Dark", category: "Streetwear", price: 219, badge: "NEW DROP", color: "#24231f", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1100&q=85", description: "An oversized black tee designed for late nights, long walks, and everything after." },
  { id: 3, name: "K-03 / Signal Tee", category: "Streetwear", price: 229, badge: "LIMITED", color: "#837d70", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1100&q=85", description: "Small batch cotton jersey with the season's signal graphic across the back." },
  { id: 4, name: "K-04 / Studio Black", category: "Shirts", price: 199, color: "#171717", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1100&q=85", description: "A clean everyday essential with a boxy fit and soft washed finish." },
  { id: 5, name: "K-05 / Transit Hoodie", category: "Streetwear", price: 349, badge: "LIMITED", color: "#2a2925", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1100&q=85", description: "Heavy loopback fleece, built for the in-between hours." },
  { id: 6, name: "K-06 / Home Set", category: "Loungewear", price: 279, color: "#585149", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1100&q=85", description: "Soft brushed cotton, easy proportions, and zero effort required." },
];
const CATEGORIES = ["All", "Streetwear", "Shirts", "Loungewear"];

type CartLine = { product: (typeof PRODUCTS)[number]; size: string; quantity: number };

export default function Home() {
  const [category, setCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [modalProduct, setModalProduct] = useState<(typeof PRODUCTS)[number] | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cart, setCart] = useState<CartLine[]>([]);
  const filteredProducts = useMemo(() => PRODUCTS.filter((product) => (category === "All" || product.category === category) && product.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  const addToCart = (product: (typeof PRODUCTS)[number], size = selectedSize) => {
    setCart((current) => { const found = current.find((line) => line.product.id === product.id && line.size === size); if (found) return current.map((line) => line === found ? { ...line, quantity: line.quantity + 1 } : line); return [...current, { product, size, quantity: 1 }]; });
    setCartOpen(true); setModalProduct(null);
  };
  const removeLine = (line: CartLine) => setCart((current) => current.filter((item) => item !== line));
  const submitContact = (event: React.FormEvent) => { event.preventDefault(); setContactSent(true); };
  const submitNewsletter = (event: React.FormEvent) => { event.preventDefault(); setNewsletterSent(true); };

  return <div className="kimo-app">
    <div className="topline" style={{textDecoration: 'underline'}}><span style={{textDecoration: 'underline'}}>FREE SHIPPING ON ORDERS OVER 100SAR</span><span style={{textDecoration: 'underline'}}>DROP 02 / 2026</span><span style={{textDecoration: 'underline'}}>GOOD CLOTHES. FAIR PRICES.</span></div>
    <header className="kimo-header">
      <div className="kimo-nav page-width">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button>
        <a className="kimo-logo" href="#home"><span className="logo-box"><img src="/manus-storage/kimo-black-gold-logo_922466c0.png" alt="K" /></span><span><b>KIMO</b><small>STUDIO / 01</small></span></a>
        <nav className={menuOpen ? "kimo-links mobile-open" : "kimo-links"}><a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav>
        <div className="nav-tools"><button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={18} /></button><button onClick={() => setCartOpen(true)} className="cart-button" aria-label="Open cart"><ShoppingBag size={18} /><span>Cart ({cartCount})</span></button></div>
      </div>
      {searchOpen && <div className="search-dock"><div className="page-width"><Search size={17} /><input autoFocus placeholder="Search Kimo pieces..." value={query} onChange={(e) => setQuery(e.target.value)} /><button onClick={() => { setSearchOpen(false); setQuery(""); }}><X size={17} /></button></div></div>}
    </header>

    <main id="home">
      <section className="kimo-hero page-width"><div className="hero-text"><p className="kicker">KIMO / INDEPENDENT CLOTHING</p><h1>Best quality.<br /><i>Best prices.</i></h1><p className="hero-lead">Everyday essentials and streetwear for people who move different. Considered pieces, sold fairly.</p><a href="#shop" className="gold-button">Shop the collection <ArrowRight size={16} /></a><div className="hero-micro"><span>01 — 06</span><span>BUILT FOR THE IN-BETWEEN</span></div></div><div className="hero-visual"><div className="hero-panel"><div className="hero-panel-label">KIMO<br />STUDIO</div><img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85" alt="Kimo clothing on a rail" /><span className="hero-caption">NO LOGO<br />WITHOUT A REASON.</span></div><div className="hero-side">EST.<br /><strong>2026</strong></div></div></section>

      <section className="marquee"><div>GOOD CLOTHES <span>✦</span> FAIR PRICES <span>✦</span> SMALL BATCHES <span>✦</span> NO FILLER <span>✦</span> GOOD CLOTHES <span>✦</span> FAIR PRICES <span>✦</span></div></section>

      <section className="shop-section page-width" id="shop"><div className="section-intro"><div><p className="kicker">01 / THE SHOP</p><h2>New arrivals</h2></div><p>Small batches, restocked monthly.<br />Once it's gone, it changes.</p></div><div className="shop-toolbar"><div className="category-tabs">{CATEGORIES.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div><span>{filteredProducts.length} pieces</span></div><div className="product-grid">{filteredProducts.map((product) => <article className="product-card" key={product.id} onClick={() => setModalProduct(product)}><div className="product-image" style={{ backgroundColor: product.color }}><img src={product.image} alt={product.name} /><span className="product-badge">{product.badge ?? product.category}</span><span className="quick-view">Quick view <ArrowRight size={14} /></span></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.category}</p></div><div className="product-price">{product.oldPrice && <s>{formatSAR(product.oldPrice)}</s>} {formatSAR(product.price)}</div></div></article>)}</div>{filteredProducts.length === 0 && <p className="empty-state">Nothing found. Try another search.</p>}</section>

      <section className="about-section page-width" id="about"><div className="about-image"><img src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1200&q=85" alt="Clothing detail" /><span>KIMO<br />STUDIO / 01</span></div><div className="about-copy"><p className="kicker">02 / THE KIMO IDEA</p><h2>Best quality,<br /><i>best prices.</i></h2><p>We pick every piece for fit, fabric, and finish first — then price it fairly. No inflated “was” prices, no filler drops. Just clothes worth wearing.</p><p>From everyday basics to limited streetwear runs, restocked as soon as we find the next thing worth carrying.</p><div className="about-stats"><div><b>10+</b><span>styles carried</span></div><div><b>01</b><span>simple promise</span></div><div><b>∞</b><span>ways to wear</span></div></div></div></section>

      <section className="journal-section page-width" id="journal"><div className="section-intro"><div><p className="kicker">03 / THE JOURNAL</p><h2>Notes from Kimo.</h2></div><a href="#contact" className="plain-link">More from the studio <ArrowRight size={15} /></a></div><div className="journal-grid"><article><div className="journal-art art-one"><span>FIELD NOTE / 01</span></div><p>THE LONG WAY HOME · 06.24.26</p><h3>On making room for the detour.</h3></article><article><div className="journal-art art-two"><span>OBJECTS / 02</span></div><p>OBJECTS WITH INTENT · 06.18.26</p><h3>Why the small things matter.</h3></article><article className="quote-card"><span>“</span><h3>Wear it often.<br />Keep it longer.</h3><p>KIMO STUDIO / 2026</p></article></div></section>

      <section className="contact-section page-width" id="contact"><div className="contact-copy"><p className="kicker">04 / SAY HELLO</p><h2>Have a question?<br /><i>Send it over.</i></h2><p>Questions about an order, sizing, wholesale, or just want to say hey? We read everything.</p><div className="contact-details"><span>kareem.amyounis@gmail.com</span><span>+966 (0) 500 763 630</span></div></div>{contactSent ? <div className="form-success"><Check size={28} /><h3>Message received.</h3><p>We'll get back to you soon.</p></div> : <form className="contact-form" onSubmit={submitContact}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@email.com" /></label><label>Message<textarea required placeholder="How can we help?" /></label><button className="gold-button" type="submit">Send message <ArrowRight size={16} /></button></form>}</section>

      <section className="newsletter-section"><div className="page-width newsletter-inner"><div><p className="kicker">THE KIMO LIST</p><h2>First look.<br /><i>No noise.</i></h2></div>{newsletterSent ? <div className="newsletter-success"><Check size={20} /> You’re on the list.</div> : <form onSubmit={submitNewsletter}><p>One email a month. New stock, restock notes, and early access.</p><div><input required type="email" placeholder="you@email.com" /><button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button></div></form>}</div></section>
    </main>

    <footer className="kimo-footer page-width"><div className="footer-brand"><span className="logo-box"><img src="/manus-storage/kimo-black-gold-logo_922466c0.png" alt="K" /></span><div><b>KIMO</b><small>BEST QUALITY WITH BEST PRICES.</small></div></div><div className="footer-links"><div><b>Shop</b><a href="#shop">Streetwear</a><a href="#shop">Shirts</a><a href="#shop">Loungewear</a></div><div><b>Studio</b><a href="#about">Our story</a><a href="#journal">Journal</a><a href="#contact">Contact</a></div><div><b>Follow</b><a href="#home">Instagram</a><a href="#home">TikTok</a><a href="#home">Pinterest</a></div></div><div className="footer-bottom"><span>© 2026 Kimo Studio.</span><span>Privacy · Returns · Shipping</span></div></footer>

    {modalProduct && <div className="modal-backdrop" onClick={() => setModalProduct(null)}><div className="product-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModalProduct(null)} aria-label="Close"><X /></button><div className="modal-image" style={{ backgroundColor: modalProduct.color }}><img src={modalProduct.image} alt={modalProduct.name} /></div><div className="modal-copy"><p className="kicker">{modalProduct.category}</p><h2>{modalProduct.name}</h2><strong>{formatSAR(modalProduct.price)}</strong><p>{modalProduct.description}</p><label>Size</label><div className="size-row">{["XS", "S", "M", "L", "XL"].map((size) => <button key={size} className={selectedSize === size ? "active" : ""} onClick={() => setSelectedSize(size)}>{size}</button>)}</div><button className="gold-button full" onClick={() => addToCart(modalProduct)}>Add to cart <ArrowRight size={16} /></button></div></div></div>}
    {cartOpen && <><div className="drawer-backdrop" onClick={() => setCartOpen(false)} /><aside className="cart-drawer"><div className="drawer-head"><h2>Your cart <span>{cartCount}</span></h2><button onClick={() => setCartOpen(false)}><X /></button></div><div className="drawer-body">{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={28} /><p>Your cart is waiting.</p><a href="#shop" onClick={() => setCartOpen(false)}>Explore the collection <ArrowRight size={14} /></a></div> : cart.map((line) => <div className="cart-line" key={`${line.product.id}-${line.size}`}><img src={line.product.image} alt={line.product.name} /><div><h3>{line.product.name}</h3><p>Size {line.size} · Qty {line.quantity}</p><strong>{formatSAR(line.product.price * line.quantity)}</strong></div><button onClick={() => removeLine(line)} aria-label="Remove item"><X size={15} /></button></div>)}</div><div className="drawer-foot"><div><span>Subtotal</span><strong>{formatSAR(subtotal)}</strong></div><button className="gold-button full" onClick={() => alert("Connect Shopify checkout here.")} disabled={!cart.length}>Checkout <ArrowRight size={16} /></button><small>Shipping calculated at checkout.</small></div></aside></>}
  </div>;
}
