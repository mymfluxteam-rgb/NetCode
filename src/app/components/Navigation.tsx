import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import logo from "/logo.png";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToProof = (e: React.MouseEvent) => {
    e.preventDefault();
    const doScroll = () => {
      const el = document.getElementById("proof-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    if (location.pathname === "/") {
      doScroll();
    } else {
      navigate("/");
      setTimeout(doScroll, 150);
    }
  };

  const navItems = [
    { path: "/menu", label: "Menu" },
    { path: "/buy-source-code", label: "Buy Source Code" },
    { path: "/privacy", label: "Docs" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/ai-assistant", label: "AI Assistant" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="NetCodeShop" className="h-14 w-auto logo-float" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.path === "/ai-assistant" ? (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                    isActive(item.path)
                      ? "border-purple-500 bg-purple-600/20 text-purple-300"
                      : "border-purple-500/40 text-purple-300 hover:bg-purple-600/20 hover:border-purple-500"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors ${
                    isActive(item.path)
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <button
              onClick={scrollToProof}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/20 hover:border-emerald-500 transition-all text-sm font-medium"
            >
              🇮🇩 Proof of Transaction
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={(e) => { setMobileMenuOpen(false); scrollToProof(e); }}
              className="block w-full text-left px-4 py-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors font-medium"
            >
              🇮🇩 Proof of Transaction
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
