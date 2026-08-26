import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Sparkles, ArrowUpRight, UserRound } from "lucide-react";
import { useState } from "react";
import logo from "/logo.png";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const doScroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (location.pathname === "/") {
      doScroll();
    } else {
      navigate("/");
      setTimeout(doScroll, 180);
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { href: "#marketplace", label: "Marketplace", section: "marketplace" },
    { href: "#how-it-works", label: "How it works", section: "how-it-works" },
    { href: "#about", label: "About", section: "about" },
    { href: "/privacy", label: "Docs" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img src={logo} alt="" className="h-9 w-9 object-contain" />
            <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">NetCode<span className="text-indigo-600">Shop</span></span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) =>
              item.section ? (
                <a key={item.href} href={item.href} onClick={(event) => scrollTo(event, item.section!)} className="text-sm text-slate-600 transition hover:text-indigo-700">{item.label}</a>
              ) : (
                <Link key={item.href} to={item.href} className={`text-sm transition ${location.pathname.startsWith(item.href) ? "text-indigo-700" : "text-slate-600 hover:text-indigo-700"}`}>{item.label}</Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/ai-assistant" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              AI assistant
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
              <UserRound className="h-3.5 w-3.5" />
              Connect / Login
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/[0.08] py-4 md:hidden">
            {navItems.map((item) => (
              item.section ? (
                  <a key={item.href} href={item.href} onClick={(event) => scrollTo(event, item.section!)} className="block rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">{item.label}</a>
              ) : (
                <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-3 text-sm text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700">{item.label}</Link>
              )
            ))}
            <Link to="/ai-assistant" onClick={() => setMobileMenuOpen(false)} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-sm text-indigo-700 transition hover:bg-indigo-50"><Sparkles className="h-4 w-4" /> AI assistant</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"><UserRound className="h-4 w-4" /> Connect / Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
