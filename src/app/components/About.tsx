import { Target, Users, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  const stats = [
    { label: "Premium Source Code Projects", value: "20+" },
    { label: "Happy Customers", value: "10,000+" },
    { label: "Countries Served", value: "75+" },
    { label: "Customer Satisfaction", value: "98%" },
  ];

  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "We ensure every source code project meets the highest standards of quality, documentation, and best practices.",
    },
    {
      icon: Users,
      title: "Customer Focused",
      description: "Our customers are at the heart of everything we do. We provide excellent support and continuous updates.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our business, from code quality to customer service.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We stay ahead of technology trends to provide cutting-edge solutions for modern development needs.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl mb-6">About NetCodeShop</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are a premium marketplace for high-quality source code, helping developers 
              and businesses accelerate their projects with ready-to-use solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2 text-blue-400">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl mb-6 text-white">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                NetCodeShop was founded in 2020 with a simple mission: to provide developers 
                with access to high-quality, well-documented source code that saves time and 
                accelerates project development.
              </p>
              <p>
                We understand the challenges developers face when starting new projects or 
                adding features to existing ones. That's why we've built a curated marketplace 
                of premium source code that follows industry best practices and modern development 
                standards.
              </p>
              <p>
                Today, we serve thousands of developers and businesses worldwide, helping them 
                build better software faster. Our commitment to quality, security, and customer 
                satisfaction remains at the core of everything we do.
              </p>
            </div>
          </div>
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3Nzk3OTQ2MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Team collaboration"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-slate-800/40 backdrop-blur-sm border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-white">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide our work and define who we are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <value.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-white">Our Mission</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            To empower developers and businesses worldwide by providing access to premium, 
            well-crafted source code solutions that accelerate development, reduce costs, 
            and enable the creation of outstanding software products.
          </p>
        </div>
      </section>
    </div>
  );
}
