import { Link } from "react-router";
import { Code2, ShoppingCart, Shield, Star, Zap, BadgeCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FlashingProcessSection } from "./FlashingProcessSection";

const testimonials = [
  {
    name: "James Whitfield",
    role: "Senior Android Developer",
    stars: 5,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I purchased the MiFix Pro source code and was blown away by the quality. The code is clean, well-documented, and saved me months of work. When I had a question about the license integration, support replied within hours. Absolutely worth every penny.",
  },
  {
    name: "Sophia Reeves",
    role: "Founder, TechRepair Solutions Ltd.",
    stars: 5,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "As a business owner running a device repair shop, I needed reliable flashing software for my team. NetCodeShop delivered exactly that — a professional-grade Qualcomm flashing tool with full source code. The support team helped us customize it perfectly.",
  },
  {
    name: "Marcus Tan",
    role: "Freelance Mobile Developer",
    stars: 5,
    photo: "https://randomuser.me/api/portraits/men/18.jpg",
    text: "The Android Service Tool source code is exceptional. It's modular, readable, and comes with everything you need to get started right away. I deployed it for a client within a week. The after-sales support is some of the best I've ever experienced.",
  },
  {
    name: "Elena Voronova",
    role: "CEO, DigiTech Repair Group",
    stars: 5,
    photo: "https://randomuser.me/api/portraits/women/29.jpg",
    text: "We've purchased three products from NetCodeShop, including the License Key System and ISP Programmer Tool. Each one exceeded our expectations in terms of code quality and reliability. Our entire operation now runs on NetCodeShop software — highly recommended.",
  },
  {
    name: "Daniel Osei",
    role: "Independent Software Engineer",
    stars: 5,
    photo: "https://randomuser.me/api/portraits/men/61.jpg",
    text: "I was skeptical at first, but the MTK Auth Bypass Tool source code is genuinely top-tier. Delivery was instant after payment, and the included documentation made setup a breeze. I reached out to support with a customization request and got a detailed answer the same day.",
  },
];

export function Home() {
  const features = [
    {
      icon: Code2,
      title: "Premium Source Code",
      description: "High-quality, well-documented source code for various projects and applications.",
    },
    {
      icon: Zap,
      title: "Instant Download",
      description: "Get immediate access to your purchased source code files after payment.",
    },
    {
      icon: Shield,
      title: "Secure & Licensed",
      description: "All source code comes with proper licensing and security guarantees.",
    },
    {
      icon: ShoppingCart,
      title: "Easy Purchase",
      description: "Simple and straightforward purchasing process with multiple payment options.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Premium Source Code Marketplace
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Discover and purchase high-quality source code for your next project. 
                Save time and accelerate your development with our curated collection.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/buy-source-code">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                    Browse Source Code
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-white !text-white hover:bg-white/10 !bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3Nzk4Nzc3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Programming code development"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-white">Why Choose NetCodeShop?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We provide the best source code solutions for developers and businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mobile Flashing Process Section */}
      <FlashingProcessSection />

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-white">What Our Buyers Say</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Trusted by developers and businesses around the world.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="flex flex-col shimmer-card">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/40 flex-shrink-0"
                  />
                  <div>
                    <CardTitle className="text-base">{t.name}</CardTitle>
                    <CardDescription className="text-purple-400 text-sm">{t.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-300 text-sm leading-relaxed">"{t.text}"</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>Verified Buyer</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800/40 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our collection of premium source code and find the perfect solution for your project.
          </p>
          <Link to="/buy-source-code">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Browse Source Code
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
