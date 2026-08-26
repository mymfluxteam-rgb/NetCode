import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Facebook, Github, Send, Clock3, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function Root() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-slate-200 bg-gray-100">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
            <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
              <div>
                <Link to="/" className="inline-flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">N</span>
                  <span className="text-base font-semibold tracking-tight text-slate-900">NetCode<span className="text-indigo-600">Shop</span></span>
                </Link>
                <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">Premium source code for developers who want to move from idea to impact faster.</p>
                <div className="mt-6 flex items-center gap-2">
                  <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg border border-slate-300 p-2.5 text-slate-500 transition hover:border-indigo-300 hover:bg-white hover:text-indigo-600"><Github className="h-4 w-4" /></a>
                  <a href="https://t.me/NetCodeShop" target="_blank" rel="noreferrer" aria-label="Telegram" className="rounded-lg border border-slate-300 p-2.5 text-slate-500 transition hover:border-indigo-300 hover:bg-white hover:text-indigo-600"><Send className="h-4 w-4" /></a>
                  <a href="https://www.facebook.com/share/1B8BRnNqhr/" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-lg border border-slate-300 p-2.5 text-slate-500 transition hover:border-indigo-300 hover:bg-white hover:text-indigo-600"><Facebook className="h-4 w-4" /></a>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Explore</h3>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <Link to="/buy-source-code" className="block transition hover:text-indigo-700">Marketplace</Link>
                  <Link to="/about" className="block transition hover:text-indigo-700">About us</Link>
                  <Link to="/privacy" className="block transition hover:text-indigo-700">Documentation</Link>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Company</h3>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <Link to="/contact" className="block transition hover:text-indigo-700">Contact support</Link>
                  <Link to="/about" className="block transition hover:text-indigo-700">Our numbers</Link>
                </div>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"><Clock3 className="h-3.5 w-3.5" /> Support hours</h3>
                <p className="mt-5 text-sm text-slate-700">Monday – Friday</p>
                <p className="mt-1 text-sm text-slate-600">9:00 AM – 6:00 PM EST</p>
                <p className="mt-4 text-sm text-slate-700">Saturday</p>
                <p className="mt-1 text-sm text-slate-600">10:00 AM – 4:00 PM EST</p>
              </div>
            </div>
            <div className="mt-14 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row">
              <p>© 2026 NetCodeShop. All rights reserved.</p>
              <Link to="/privacy" className="inline-flex items-center gap-1 transition hover:text-indigo-700">Privacy & terms <ArrowUpRight className="h-3 w-3" /></Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
