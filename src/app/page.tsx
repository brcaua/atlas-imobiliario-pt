import React from "react";
import { HeroSection } from "../components/sections/HeroSection";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
