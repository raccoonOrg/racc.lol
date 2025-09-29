"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  FaGithub,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaExternalLinkAlt,
  FaStar,
  FaHeart,
} from "react-icons/fa";

import type { Review, NavigationItem } from "@/lib/types";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/documentation", label: "Documentation" },
  { href: "https://discord.gg/Ghxw5eEn2D", label: "Discord", external: true },
];

const reviews: Review[] = [
  {
    name: "Jonathan Mauler",
    role: "Owner/CEO",
    company: "biography.gg",
    rating: 5,
    review:
      "I've used raccApi for a long time now, even bringing me to build my own raccoon themed project, eventually given to dedicate the project. A quite useful and trash-panda themed API",
    avatar: "jbablestime.jpg",
  },
  {
    name: "vmohammad",
    role: "Admin",
    company: "nest.rip",
    rating: 5,
    review: "very cool",
    avatar: "vmohammad.jpg",
  },
  {
    name: "pringles",
    role: "Owner",
    company: "nest.rip",
    rating: 5,
    review: "peak api with cute raccoons",
    avatar: "pringles.jpg",
  },
  {
    name: "bastih18",
    role: "Owner/CEO",
    company: "Pixelvault",
    rating: 5,
    review:
      "It's a funny little API all about raccoons 🦝. Purely for joy, and it delivers.",
    avatar: "bastih18.gif",
  },
  {
    name: "keircn",
    role: "Owner/CEO",
    company: "Priory IO",
    rating: 5,
    review:
      "racc.lol is super great and so easy to use I love it it's perfect for all my projects for maximum trash panda cuteness",
    avatar: "keircn.png",
  },
  {
    name: "Hello!",
    role: "",
    company: "",
    rating: 5,
    review:
      "These are empty spaces that I need reviews for! If you use the api and want to leave a review, please add me on discord @venqoi or create a pull request on github.",
    avatar: "https://api.racc.lol/v1/raccoon",
  },
];

interface NavLinkProps extends NavigationItem {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

function NavLink({
  href,
  label,
  external,
  className,
  onClick,
  children,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/80 hover:text-primary px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-primary/10 hover:shadow-sm hover:scale-105 relative group",
        className
      )}
      onClick={onClick}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children || label}
    </Link>
  );
}

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 h-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg overflow-hidden ring-2 ring-primary/20 flex-shrink-0">
            <Image
              src={`/avatars/${review.avatar}`}
              alt={`${review.name} avatar`}
              width={48}
              height={48}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0">
            {[...Array(review.rating)].map((_, i) => (
              <FaStar
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-sm"
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold text-foreground">
          {review.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground font-medium">
          {review.role} {review.company && `at ${review.company}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 flex-grow">
        <p className="text-sm leading-relaxed text-muted-foreground italic">
          &quot;{review.review}&quot;
        </p>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="mx-auto max-w-7xl bg-background/80 backdrop-blur-xl border border-border/40 rounded-2xl shadow-xl shadow-black/10 supports-[backdrop-filter]:bg-background/70">
          <div className="px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-2xl group-hover:rotate-12 transition-transform duration-300">
                    🦝
                  </div>
                  <span className="text-xl font-bold text-primary hover:text-primary/90 transition-all duration-300">
                    raccApi
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-1">
                  {navigationItems.map((item) => (
                    <NavLink key={item.href} {...item} />
                  ))}
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/40 text-foreground hover:bg-primary/15 hover:border-primary/60 hover:shadow-md hover:scale-105 transition-all duration-300 rounded-xl bg-gradient-to-r from-transparent to-primary/5"
                  asChild
                >
                  <Link
                    href="https://github.com/raccoonOrg/racc.lol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <FaGithub className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    <span>GitHub</span>
                  </Link>
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="hover:bg-primary/10 hover:scale-110 transition-all duration-300 rounded-xl"
                >
                  {isMenuOpen ? (
                    <FaTimes className="h-6 w-6 transition-transform duration-300 rotate-90" />
                  ) : (
                    <FaBars className="h-6 w-6 transition-transform duration-300" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden animate-in slide-in-from-top-2 duration-300">
                <div className="px-6 pt-3 pb-4 space-y-2 border-t border-border/30 bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-xl rounded-b-2xl">
                  {navigationItems.map((item) => (
                    <NavLink
                      key={item.href}
                      {...item}
                      className="text-foreground/80 hover:text-primary block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-primary/10 hover:scale-105"
                      onClick={() => setIsMenuOpen(false)}
                    />
                  ))}
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full border-primary/40 hover:bg-primary/15 hover:border-primary/60 hover:shadow-md transition-all duration-300 rounded-xl bg-gradient-to-r from-transparent to-primary/5"
                    >
                      <Link
                        href="https://github.com/raccoonOrg/racc.lol"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <FaGithub className="h-4 w-4" />
                        <span>GitHub</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background min-h-[calc(100vh-5rem)] flex flex-col justify-center border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              the coolest <span className="text-primary">raccoon api</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
              hundreds of raccoons all for free! view the docs to learn how to
              use it.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6 flex-col sm:flex-row gap-y-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <Link
                  href="/documentation"
                  className="flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <FaArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Quick Demo */}
            <div className="mt-16">
              <div className="mx-auto max-w-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                  Try it now:
                </h3>
                <div className="bg-card/80 border border-border rounded-lg px-3 py-2 backdrop-blur-sm shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono px-2 py-0.5"
                      >
                        GET
                      </Badge>
                      <code className="text-xs text-primary font-mono bg-secondary/50 px-2 py-1 rounded flex-1">
                        https://api.racc.lol/raccoon
                      </code>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10 hover:text-primary transition-colors flex-shrink-0 h-7 px-2"
                      asChild
                    >
                      <a
                        href="https://api.racc.lol/raccoon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1"
                      >
                        <FaExternalLinkAlt className="h-3 w-3" />
                        <span className="text-xs">Try</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex flex-col justify-center py-20 sm:py-32 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
              is raccApi any good?
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              these are the cool people that have used raccApi, here&apos;s what
              they think!
            </p>
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container sm:px-6 lg:px-8">
          <div className="py-12">
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  only the silliest of raccoons scroll to here
                </p>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-4 sm:mt-0">
                  <span>made with</span>
                  <FaHeart className="h-4 w-4 text-red-500 fill-current" />
                  <span>by a raccoon lover</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
