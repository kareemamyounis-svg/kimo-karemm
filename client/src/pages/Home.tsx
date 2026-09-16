import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Menu, Minus, Plus, ShoppingBag, X } from "lucide-react";

// EDIT HERE: brand content and product catalog are intentionally kept in one place.
const products = [
  {
    name: "Signal / 01",
    price: "$58",
    note: "Heavyweight cotton · Bone",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=85",
    accent: "lime",
  },
  {
    name: "After Hours / 02",
    price: "$64",
    note: "Oversized fit · Carbon",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=85",
    accent: "orange",
  },
  {
    name: "Low Frequency / 03",
    price: "$58",
    note: "Organic jersey · Signal green",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=85",
    accent: "violet",
  },
];

const sizes = ["XS", "S", "M", "L", "XL"];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const addToCart = () => setCartCount((count) => count + 1);

  const subscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <main className="site-shell">
      <div className="announcement"><span>DROP 01 — AVAILABLE NOW</span><span>FREE SHIPPING OVER $100</span><span>DESIGNED FOR THE IN-BETWEEN</span></div>
      <header className="nav container">
        <a className="brand-lockup" href="#top" aria-label="Kimo Karemm home">
          <span className="brand-symbol"><img src="/manus-storage/kimo-karemm-logo_60bacdb5.png" alt="K mark" /></span>
          <span><strong>KIMO</strong><em>KAREMM</em></span>
        </a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a href="#drop" onClick={() => setMenuOpen(false)}>Shop drop</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>The idea</a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a>
        </nav>
        <div className="nav-actions">
          <a className="bag" href="#drop" aria-label={`${cartCount} items in bag`}><ShoppingBag size={17} /><span>Bag ({cartCount})</span></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <section className="hero container" id="top">
        <div className="hero-copy">
          <p className="eyebrow">KIMO KAREMM <span>—</span> EST. 2024</p>
          <h1>Wear your<br /><span>own signal.</span></h1>
          <p className="hero-intro">Independent essentials for the people who notice the details. Clean lines, loud energy, zero compromise.</p>
          <div className="hero-cta-row"><a className="button button-dark" href="#drop">Explore Drop 01 <ArrowDownRight size={17} /></a><span className="hero-note">Limited run<br />of 120 pieces</span></div>
        </div>
        <div className="hero-art" aria-label="Editorial T-shirt photograph">
          <div className="hero-stamp">KK<br /><span>01</span></div>
          <div className="hero-photo"></div>
          <div className="hero-side-label">NOT FOR EVERYONE<br /><span>THAT'S THE POINT.</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Brand statement"><div className="ticker-track">BUILT DIFFERENT <span>✳</span> NO SMALL TALK <span>✳</span> WEAR YOUR OWN SIGNAL <span>✳</span> BUILT DIFFERENT <span>✳</span> NO SMALL TALK <span>✳</span></div></section>

      <section className="drop-section container" id="drop">
        <div className="section-heading"><div><p className="eyebrow">01 / THE FIRST SIGNAL</p><h2>Drop one, on repeat.</h2></div><a className="text-link" href="#newsletter">Get drop alerts <ArrowUpRight size={16} /></a></div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className={`product-card ${product.accent}`} key={product.name}>
              <div className="product-image-wrap"><img src={product.image} alt={`${product.name} T-shirt`} /><span className="product-index">0{index + 1}</span><button className="quick-add" onClick={addToCart}>Add +</button></div>
              <div className="product-info"><div><h3>{product.name}</h3><p>{product.note}</p></div><strong>{product.price}</strong></div>
            </article>
          ))}
        </div>
        <div className="size-bar"><span>Choose your signal</span><div className="size-pills">{sizes.map((size) => <button className={selectedSize === size ? "active" : ""} onClick={() => setSelectedSize(size)} key={size}>{size}</button>)}</div><button className="button button-lime" onClick={addToCart}>{cartCount ? <Check size={16} /> : <Plus size={16} />} {cartCount ? `Added in ${selectedSize}` : "Add Signal / 01"}</button></div>
      </section>

      <section className="manifesto" id="story">
        <div className="manifesto-mark">K<span>✳</span></div>
        <div className="manifesto-copy"><p className="eyebrow">02 / WHY KIMO KAREMM</p><h2>Not a logo.<br /><i>A point of view.</i></h2><p>We make the uniform for the in-between: the late train, the first coffee, the good idea you can't stop thinking about. Every piece is made to be lived in, not looked after.</p><a className="button button-light" href="#journal">Read the journal <ArrowUpRight size={17} /></a></div>
      </section>

      <section className="journal container" id="journal"><div className="section-heading"><div><p className="eyebrow">03 / FIELD NOTES</p><h2>From the journal.</h2></div><span className="journal-count">03 stories / no filler</span></div><div className="journal-grid"><article className="journal-card large"><div className="journal-image city-image"></div><p>THE LONG WAY HOME · 06.24</p><h3>On making room for the detour.</h3><a href="#newsletter">Read story <ArrowUpRight size={15} /></a></article><article className="journal-card"><div className="journal-image detail-image"></div><p>OBJECTS WITH INTENT · 06.18</p><h3>Why the small things matter.</h3><a href="#newsletter">Read story <ArrowUpRight size={15} /></a></article><article className="journal-card dark-card"><span className="dark-card-mark">K</span><p>THE PLAYLIST · 06.11</p><h3>Soundtrack for your next shift.</h3><a href="#newsletter">Listen now <ArrowUpRight size={15} /></a></article></div></section>

      <section className="newsletter" id="newsletter"><div className="container newsletter-inner"><div><p className="eyebrow">KEEP IN THE LOOP</p><h2>Good things,<br /><i>occasionally.</i></h2></div>{subscribed ? <div className="success-message"><Check size={20} /> You're on the list. See you at the next drop.</div> : <form onSubmit={subscribe}><label htmlFor="email">Drop alerts, field notes, and first dibs.</label><div className="email-row"><input id="email" type="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} /><button aria-label="Subscribe" type="submit"><ArrowUpRight size={20} /></button></div></form>}</div></section>

      <footer className="footer container"><div className="footer-brand"><span className="brand-symbol small"><img src="/manus-storage/kimo-karemm-logo_60bacdb5.png" alt="K mark" /></span><span><strong>KIMO</strong><em>KAREMM</em></span></div><p>For the ones in motion.</p><div className="footer-links"><a href="#top">Instagram</a><a href="#top">Contact</a><a href="#top">Shipping</a></div><span className="copyright">© 2024 KK</span></footer>
    </main>
  );
}

void Minus;


