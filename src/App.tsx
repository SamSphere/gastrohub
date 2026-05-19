import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import Demo from "@/pages/Demo";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import AGB from "@/pages/AGB";
import CookieRichtlinie from "@/pages/CookieRichtlinie";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/demo" component={Demo} />
      <Route path="/preise" component={Pricing} />
      <Route path="/faq" component={FAQ} />
      <Route path="/kontakt" component={Contact} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/agb" component={AGB} />
      <Route path="/cookie-richtlinie" component={CookieRichtlinie} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function routerBase(): string {
  if (typeof window === "undefined") return "";
  const p = window.location.pathname;
  return p === "/en" || p.startsWith("/en/") ? "/en" : "";
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={routerBase()}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
