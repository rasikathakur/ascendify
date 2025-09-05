import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Roadmaps from "./pages/Roadmaps";
import Assessment from "./pages/Assessment";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Community from "./pages/Community";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import BackgroundDots from "@/components/effects/BackgroundDots";
import ParticlesBackground from "@/components/effects/ParticlesBackground";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen flex flex-col bg-background text-foreground">
          <div className="absolute inset-0 -z-10">
            <BackgroundDots />
            <ParticlesBackground />
          </div>
          <SiteHeader />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/roadmaps" element={<Roadmaps />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/community" element={<Community />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

declare global { interface Window { __fusionRoot?: Root } }

const container = document.getElementById("root")!;
let root = window.__fusionRoot;
if (!root) {
  root = createRoot(container);
  window.__fusionRoot = root;
}
root.render(<App />);
