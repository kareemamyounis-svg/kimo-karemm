from pathlib import Path

root = Path('/home/ubuntu/kimo-karemm/client/src')
(root / 'lib/catalog.ts').write_text('''export const formatSAR = (amount: number) => `${amount.toLocaleString("en-SA")} SAR`;

export const PRODUCTS = [
  { id: 1, name: "K-01 / Core Tee", category: "Shirts", price: 189, oldPrice: 239, badge: "BESTSELLER", color: "#d9d5ca", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1100&q=85", gallery: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1100&q=85"], description: "A precise heavyweight tee with a relaxed shoulder and the Kimo mark at the chest.", details: "Cut from 240gsm cotton jersey with a dry hand feel. Designed to sit slightly boxy through the body while keeping a clean shoulder line.", fit: "Relaxed / true to size", material: "100% heavyweight cotton" },
  { id: 2, name: "K-02 / After Dark", category: "Streetwear", price: 219, badge: "NEW DROP", color: "#24231f", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1100&q=85", gallery: ["https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1100&q=85"], description: "An oversized black tee designed for late nights, long walks, and everything after.", details: "A washed-black streetwear essential with dropped shoulders, a wide sleeve, and a soft broken-in finish.", fit: "Oversized / size down for a closer fit", material: "100% combed cotton" },
  { id: 3, name: "K-03 / Signal Tee", category: "Streetwear", price: 229, badge: "LIMITED", color: "#837d70", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1100&q=85", gallery: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1583743814966-8936f37f40b7?auto=format&fit=crop&w=1100&q=85"], description: "Small batch cotton jersey with the season's signal graphic across the back.", details: "Limited-run graphic tee printed in small batches with a soft-touch ink and a clean, minimal chest mark.", fit: "Relaxed / true to size", material: "100% organic cotton" },
  { id: 4, name: "K-04 / Studio Black", category: "Shirts", price: 199, color: "#171717", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1100&q=85", gallery: ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1100&q=85"], description: "A clean everyday essential with a boxy fit and soft washed finish.", details: "The everyday Kimo uniform. Minimal branding, smooth collar rib, and a shape that works alone or layered.", fit: "Boxy / true to size", material: "100% ring-spun cotton" },
  { id: 5, name: "K-05 / Transit Hoodie", category: "Streetwear", price: 349, badge: "LIMITED", color: "#2a2925", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1100&q=85", gallery: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1100&q=85"], description: "Heavy loopback fleece, built for the in-between hours.", details: "A substantial hoodie with a structured hood, brushed interior, and a clean K embroidery at the left chest.", fit: "Relaxed / true to size", material: "450gsm loopback cotton" },
  { id: 6, name: "K-06 / Home Set", category: "Loungewear", price: 279, color: "#585149", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1100&q=85", gallery: ["https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1100&q=85", "https://images.unsplash.com/photo-1583743814966-8936f37f40b7?auto=format&fit=crop&w=1100&q=85"], description: "Soft brushed cotton, easy proportions, and zero effort required.", details: "A two-piece set with an easy drawstring waist and soft-touch finish for slow mornings and late returns.", fit: "Relaxed / true to size", material: "Brushed cotton blend" },
] as const;

export const CATEGORIES = ["All", "Streetwear", "Shirts", "Loungewear"];
export const SIZES = ["XS", "S", "M", "L", "XL"];
''')

home = root / 'pages/Home.tsx'
text = home.read_text()
start = text.index('const formatSAR =')
end = text.index('type CartLine')
text = text[:start] + 'import { CATEGORIES, formatSAR, PRODUCTS, SIZES } from "@/lib/catalog";\n\n' + text[end:]
text = text.replace('import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Menu, Search, ShoppingBag, X } from "lucide-react";', 'import { ArrowRight, Check, Menu, Search, ShoppingBag, X } from "lucide-react";')
text = text.replace('["XS", "S", "M", "L", "XL"].map((size)', 'SIZES.map((size)')
text = text.replace('<span className="quick-view">Quick view <ArrowRight size={14} /></span>', '<span className="quick-view">Quick view <ArrowRight size={14} /></span><a className="product-detail-link" href={`/product/${product.id}`} onClick={(event) => event.stopPropagation()}>View details <ArrowRight size={13} /></a>')
text = text.replace('<a href="#contact" className="plain-link">More from the studio <ArrowRight size={15} /></a>', '<div className="section-actions"><a href="/size-guide" className="plain-link">Size guide <ArrowRight size={15} /></a><a href="#contact" className="plain-link">More from the studio <ArrowRight size={15} /></a></div>')
home.write_text(text)

app = root / 'App.tsx'
app.write_text('''import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SizeGuide from "./pages/SizeGuide";

function Router() { return <Switch><Route path="/" component={Home} /><Route path="/product/:id" component={ProductDetail} /><Route path="/size-guide" component={SizeGuide} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
''')

(root / 'pages/ProductDetail.tsx').write_text('''import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Ruler, ShoppingBag } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { formatSAR, PRODUCTS, SIZES } from "@/lib/catalog";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const [, setLocation] = useLocation();
  const product = PRODUCTS.find((item) => item.id === Number(params?.id));
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);
  if (!product) return <div className="simple-page"><Link href="/">Back to Kimo</Link><h1>Product not found.</h1></div>;
  const add = () => { setAdded(true); window.setTimeout(() => setAdded(false), 2200); };
  return <div className="detail-page"><header className="detail-header page-width"><Link href="/" className="detail-back"><ArrowLeft size={16} /> Kimo Studio</Link><Link href="/size-guide" className="detail-size-link"><Ruler size={15} /> Size guide</Link></header><main className="detail-main page-width"><div className="detail-gallery"><div className="detail-counter">0{imageIndex + 1} / 0{product.gallery.length}</div><img src={product.gallery[imageIndex]} alt={product.name} /><button className="gallery-arrow left" onClick={() => setImageIndex((imageIndex - 1 + product.gallery.length) % product.gallery.length)}><ChevronLeft /></button><button className="gallery-arrow right" onClick={() => setImageIndex((imageIndex + 1) % product.gallery.length)}><ChevronRight /></button><div className="gallery-thumbs">{product.gallery.map((image, index) => <button className={index === imageIndex ? "active" : ""} onClick={() => setImageIndex(index)} key={image}><img src={image} alt="" /></button>)}</div></div><div className="detail-copy"><p className="kicker">{product.category} / KIMO STUDIO</p><h1>{product.name}</h1><div className="detail-price">{product.oldPrice && <s>{formatSAR(product.oldPrice)}</s>} {formatSAR(product.price)}</div><p className="detail-description">{product.description}</p><div className="detail-rule" /><div className="detail-specs"><div><span>FIT</span><strong>{product.fit}</strong></div><div><span>FABRIC</span><strong>{product.material}</strong></div></div><p className="detail-long">{product.details}</p><div className="detail-size-heading"><span>Choose size</span><Link href="/size-guide"><Ruler size={14} /> View size guide</Link></div><div className="detail-sizes">{SIZES.map((item) => <button className={item === size ? "active" : ""} onClick={() => setSize(item)} key={item}>{item}</button>)}</div><button className="gold-button detail-add" onClick={add}>{added ? <><Check size={16} /> Added to bag</> : <><ShoppingBag size={16} /> Add to bag · {size}</>}<ArrowRight size={16} /></button><p className="detail-note">Free shipping over 100 SAR · Easy returns within 14 days</p></div></main><section className="detail-related page-width"><p className="kicker">YOU MAY ALSO LIKE</p><div className="related-grid">{PRODUCTS.filter((item) => item.id !== product.id).slice(0, 3).map((item) => <Link href={`/product/${item.id}`} key={item.id}><img src={item.image} alt={item.name} /><span>{item.name}</span><small>{formatSAR(item.price)}</small></Link>)}</div></section><footer className="detail-footer page-width"><span>© 2026 Kimo Studio.</span><Link href="/">Back to home <ArrowRight size={14} /></Link></footer></div>;
}
''')

(root / 'pages/SizeGuide.tsx').write_text('''import { ArrowLeft, Check, Ruler } from "lucide-react";
import { Link } from "wouter";

const rows = [["XS", "86–91", "71–76", "86–91"], ["S", "91–96", "76–81", "91–96"], ["M", "96–101", "81–86", "96–101"], ["L", "101–106", "86–91", "101–106"], ["XL", "106–112", "91–97", "106–112"]];
export default function SizeGuide() { return <div className="size-page"><header className="detail-header page-width"><Link href="/" className="detail-back"><ArrowLeft size={16} /> Kimo Studio</Link><span className="detail-size-link"><Ruler size={15} /> Fit guide</span></header><main className="size-main page-width"><div className="size-hero"><p className="kicker">KIMO / FIT & CARE</p><h1>Find your<br /><i>right fit.</i></h1><p>Our pieces are designed to feel easy, considered, and lived in. Use the chart below as a guide, then choose the fit you want to wear.</p></div><div className="size-content"><div className="size-table-wrap"><div className="size-table-title"><h2>Body measurements</h2><span>CM</span></div><table><thead><tr><th>SIZE</th><th>CHEST</th><th>WAIST</th><th>HIP</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td className={index === 0 ? "size-name" : ""} key={cell}>{cell}</td>)}</tr>)}</tbody></table><p className="table-note">Measure around the fullest part of your body. If you are between sizes, choose the larger size for a more relaxed Kimo fit.</p></div><div className="fit-notes"><div><Check size={16} /><div><h3>Relaxed by design</h3><p>Most Kimo tees are cut with a little room through the body and shoulder.</p></div></div><div><Check size={16} /><div><h3>Care for the long run</h3><p>Wash cold, inside out. Air dry when possible to keep the shape and color.</p></div></div><div><Check size={16} /><div><h3>Need a hand?</h3><p>Send us your measurements and we will help you choose the right size.</p></div></div></div></div></main><footer className="detail-footer page-width"><span>© 2026 Kimo Studio.</span><Link href="/">Back to home <ArrowLeft size={14} /></Link></footer></div>; }
''')
print('Added catalog, product detail pages, and size guide.')
