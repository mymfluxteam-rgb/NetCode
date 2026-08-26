import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Command,
  Download,
  Globe2,
  Layers3,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Zap,
} from "lucide-react";
import { sourceCodeItems, type SourceCodeItem } from "./BuySourceCode";

const categories = ["All", "Android", "Qualcomm", "MediaTek", "iOS", "License"];

const steps = [
  {
    number: "01",
    title: "Choose your source code",
    description: "Browse a curated library of production-ready tools and select the project that fits your roadmap.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Connect with our team",
    description: "Ask questions, review licensing options, and get the right package for your business before you buy.",
    icon: Globe2,
  },
  {
    number: "03",
    title: "Build and ship faster",
    description: "Receive your source files and documentation, then customize with confidence and launch your next idea.",
    icon: Zap,
  },
];

const stats = [
  { value: "20+", label: "Premium projects" },
  { value: "10k+", label: "Happy customers" },
  { value: "75+", label: "Countries served" },
  { value: "98%", label: "Satisfaction rate" },
];

function matchesCategory(product: SourceCodeItem, category: string) {
  if (category === "All") return true;
  const text = `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
  return text.includes(category.toLowerCase());
}

function ProductCard({ product }: { product: SourceCodeItem }) {
  const features = (product.features ?? []).slice(0, 3).map((feature) => feature.split(" - ")[0]);
  const price = product.nonExclusivePrice ?? product.price;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/70">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-100 bg-slate-100">
        {product.image ? (
          <img
            src={product.image}
            alt={`${product.name} preview`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Code2 className="h-10 w-10 text-indigo-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
        {product.badge === "featured" && (
          <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm">
            Featured
          </span>
        )}
        <span className="absolute bottom-3 right-4 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-xs text-slate-700 shadow-sm backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-semibold">{product.rating}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {product.downloads.toLocaleString()} downloads
          </span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{product.description}</p>

        <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">From</p>
            <p className="mt-1 text-xl font-bold text-slate-900">${price}</p>
          </div>
          <Link
            to={`/product/${product.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            View details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function CodePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute -inset-5 rounded-[2rem] bg-indigo-200/50 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-300/50">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Terminal className="h-3.5 w-3.5" />
            netcode/engine.ts
          </div>
          <div className="h-4 w-4" />
        </div>
        <div className="grid grid-cols-[40px_1fr] px-4 py-5 font-mono text-[11px] leading-7 sm:text-xs sm:leading-8">
          <div className="select-none pr-4 text-right text-slate-600">
            {Array.from({ length: 11 }, (_, index) => <div key={index}>{index + 1}</div>)}
          </div>
          <div className="overflow-hidden whitespace-nowrap text-slate-300">
            <div><span className="text-violet-300">import</span> {"{ "} <span className="text-sky-300">SourceEngine</span> {" }"} <span className="text-violet-300">from</span> <span className="text-emerald-300">'@netcode/core'</span></div>
            <div>&nbsp;</div>
            <div><span className="text-violet-300">const</span> engine = <span className="text-violet-300">new</span> <span className="text-sky-300">SourceEngine</span>({"{"}</div>
            <div className="pl-6">license: <span className="text-emerald-300">'pro'</span>,</div>
            <div className="pl-6">version: <span className="text-amber-300">'2.4.0'</span>,</div>
            <div className="pl-6">secure: <span className="text-violet-300">true</span>,</div>
            <div>{"});"}</div>
            <div>&nbsp;</div>
            <div><span className="text-violet-300">await</span> engine.<span className="text-sky-300">ship</span>({"{"}</div>
            <div className="pl-6">quality: <span className="text-emerald-300">'production-ready'</span></div>
            <div>{"});"}</div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Ready to ship</span>
          <span>TypeScript · 0 errors</span>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const products = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return sourceCodeItems
      .filter((product) => {
        const searchable = `${product.name} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
        return (!normalizedQuery || searchable.includes(normalizedQuery)) && matchesCategory(product, category);
      })
      .slice(0, 6);
  }, [category, query]);

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              The developer&apos;s source code marketplace
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
              Ship your next big idea
              <span className="block text-indigo-600">without starting over.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Production-ready source code for ambitious developers. Start with a solid foundation, customize what matters, and get to launch day faster.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#marketplace" onClick={(event) => scrollToSection(event, "marketplace")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
                Browse the marketplace
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#how-it-works" onClick={(event) => scrollToSection(event, "how-it-works")} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
                How it works
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Secure licensing</span>
              <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-amber-500" /> Instant delivery</span>
              <span className="flex items-center gap-2"><Code2 className="h-4 w-4 text-indigo-600" /> Clean, documented code</span>
            </div>
          </div>
          <CodePreview />
        </div>
      </section>

      <section id="marketplace" className="scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Curated collection</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Find your next advantage.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Battle-tested foundations for mobile tools, desktop apps, and the systems that power them.</p>
            </div>
            <Link to="/buy-source-code" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-700">
              View full catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-sm">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                />
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                      category === item
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "border border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-4 font-medium text-slate-900">No source code found</p>
              <p className="mt-2 text-sm text-slate-500">Try another search term or category.</p>
            </div>
          )}
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Simple by design</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">From idea to implementation in three steps.</h2>
          </div>
          <div className="relative mt-14 grid gap-10 lg:grid-cols-3 lg:gap-14">
            <div className="absolute left-[7%] right-[7%] top-7 hidden h-px bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-200 lg:block" />
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex items-center gap-4">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-200">
                    {step.number}
                  </div>
                  <step.icon className="h-5 w-5 text-indigo-500 lg:hidden" />
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Built for momentum</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">A better starting point for better software.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                NetCodeShop gives developers and teams a trusted place to find the building blocks they need. Every project is selected for practical value, clear documentation, and room to make it your own.
              </p>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-indigo-700">
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <p className="text-3xl font-semibold tracking-tight text-indigo-600">{stat.value}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{stat.label}</p>
                </div>
              ))}
              <div className="col-span-2 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 sm:col-span-4 sm:flex sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Command className="h-4 w-4 text-indigo-600" /> Less boilerplate. More building.</p>
                  <p className="mt-2 text-xs text-slate-600">Premium code, practical support, and a faster path to launch.</p>
                </div>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:text-indigo-900 sm:mt-0">Talk to our team <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}