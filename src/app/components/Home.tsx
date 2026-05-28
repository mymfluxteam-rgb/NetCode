import { Link } from "react-router";
import { Code2, ShoppingCart, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Premium Source Code Marketplace
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Discover and purchase high-quality source code for your next project. 
                Save time and accelerate your development with our curated collection.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/buy-source-code">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Browse Source Code
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
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
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Why Choose NetCodeShop?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the best source code solutions for developers and businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our collection of premium source code and find the perfect solution for your project.
          </p>
          <Link to="/buy-source-code">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Browse Source Code
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
