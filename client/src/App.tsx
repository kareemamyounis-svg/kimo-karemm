import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SizeGuide from "./pages/SizeGuide";

const readHash = () => window.location.hash.replace(/^#/, "") || "/";
const useHashLocation = () => {
  const [location, setLocation] = useState(readHash);
  useEffect(() => {
    const onHashChange = () => setLocation(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const navigate = (path: string) => {
    window.location.hash = path.startsWith("#") ? path.slice(1) : path;
  };
  return [location, navigate] as [string, (path: string) => void];
};

function Router() { return <WouterRouter hook={useHashLocation}><Switch><Route path="/" component={Home} /><Route path="/product/:id" component={ProductDetail} /><Route path="/size-guide" component={SizeGuide} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></WouterRouter>; }
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
