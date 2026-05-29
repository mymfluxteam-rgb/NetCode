import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { ParticleBackground } from "./ParticleBackground";

export function Root() {
  return (
    <div className="min-h-screen bg-slate-950 relative">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="bg-gray-900/80 backdrop-blur-sm text-white mt-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400">© 2026 NetCodeShop. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
