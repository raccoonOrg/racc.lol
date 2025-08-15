"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  FaCopy,
  FaExternalLinkAlt,
  FaImage,
  FaVideo,
  FaSmile,
  FaBrain,
  FaChartBar,
  FaSearch,
  FaList,
  FaGithub,
  FaBars,
  FaTimes,
  FaHeart,
} from "react-icons/fa";
import type { NavigationItem } from "@/lib/types";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/documentation", label: "Documentation" },
  { href: "https://discord.gg/Ghxw5eEn2D", label: "Discord", external: true },
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

interface Parameter {
  name: string;
  type: string;
  description: string;
  example: string;
}

interface Endpoint {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  method: string;
  endpoint: string;
  description: string;
  parameters: Parameter[];
  response: Record<string, unknown>;
  examples: string[];
  subEndpoints?: Endpoint[];
}

// Common parameter definitions to reduce repetition
const commonParameters = {
  json: {
    name: "json",
    type: "boolean",
    description: "Return JSON metadata instead of media",
    example: "?json=true",
  },
  daily: {
    name: "daily",
    type: "boolean",
    description: "Get the same image for the entire day",
    example: "?daily=true",
  },
  hourly: {
    name: "hourly",
    type: "boolean",
    description: "Get the same image for the entire hour",
    example: "?hourly=true",
  },
  weekly: {
    name: "weekly",
    type: "boolean",
    description: "Get the same image for the entire week",
    example: "?weekly=true",
  },
} as const;

const endpoints: Endpoint[] = [
  {
    icon: FaImage,
    title: "Random Raccoon Image",
    method: "GET",
    endpoint: "/raccoon",
    description:
      "Get a random raccoon image. Returns image by default, or JSON metadata with ?json=true parameter.",
    parameters: [
      commonParameters.daily,
      commonParameters.hourly,
      commonParameters.weekly,
      commonParameters.json,
    ],
    response: {
      success: true,
      data: {
        url: "https://api.racc.lol/raccoon",
        size: 245760,
        contentType: "image/jpeg",
      },
    },
    examples: [
      "https://api.racc.lol/raccoon",
      "https://api.racc.lol/raccoon?daily=true",
      "https://api.racc.lol/raccoon?json=true",
    ],
    subEndpoints: [
      {
        icon: FaImage,
        title: "Specific Raccoon by ID",
        method: "GET",
        endpoint: "/raccoon/:id",
        description:
          "Get a specific raccoon image by its ID number. Returns image by default, or JSON metadata with ?json=true parameter.",
        parameters: [
          {
            name: "id",
            type: "number",
            description: "The ID number of the raccoon (1-based index)",
            example: "/raccoon/42",
          },
          commonParameters.json,
        ],
        response: {
          success: true,
          data: {
            url: "https://api.racc.lol/raccoon/42",
            id: 42,
            size: 245760,
            contentType: "image/jpeg",
          },
        },
        examples: [
          "https://api.racc.lol/raccoon/1",
          "https://api.racc.lol/raccoon/42?json=true",
        ],
      },
    ],
  },
  {
    icon: FaVideo,
    title: "Random Raccoon Video",
    method: "GET",
    endpoint: "/video",
    description:
      "Get a random raccoon video in MP4 format. Returns video by default, or JSON metadata with ?json=true parameter.",
    parameters: [commonParameters.json],
    response: {
      success: true,
      data: {
        url: "https://api.racc.lol/video/1",
        filename: "racc1.mp4",
        size: 2048576,
        format: "mp4",
      },
    },
    examples: [
      "https://api.racc.lol/video",
      "https://api.racc.lol/video?json=true",
    ],
  },
  {
    icon: FaSmile,
    title: "Random Raccoon Meme",
    method: "GET",
    endpoint: "/meme",
    description:
      "Get a random raccoon meme image. Returns image by default, or JSON metadata with ?json=true parameter.",
    parameters: [
      commonParameters.daily,
      commonParameters.hourly,
      commonParameters.weekly,
      commonParameters.json,
    ],
    response: {
      success: true,
      data: {
        url: "https://api.racc.lol/meme",
        size: 156789,
        contentType: "image/jpeg",
      },
    },
    examples: [
      "https://api.racc.lol/meme",
      "https://api.racc.lol/meme?daily=true",
      "https://api.racc.lol/meme?json=true",
    ],
    subEndpoints: [
      {
        icon: FaSmile,
        title: "Specific Meme by ID",
        method: "GET",
        endpoint: "/meme/:id",
        description:
          "Get a specific meme image by its ID number. Returns image by default, or JSON metadata with ?json=true parameter.",
        parameters: [
          {
            name: "id",
            type: "number",
            description: "The ID number of the meme (1-based index)",
            example: "/meme/15",
          },
          commonParameters.json,
        ],
        response: {
          success: true,
          data: {
            url: "https://api.racc.lol/meme/15",
            id: 15,
            size: 156789,
            contentType: "image/jpeg",
          },
        },
        examples: [
          "https://api.racc.lol/meme/1",
          "https://api.racc.lol/meme/15?json=true",
        ],
      },
    ],
  },
  {
    icon: FaBrain,
    title: "Random Raccoon Fact",
    method: "GET",
    endpoint: "/fact",
    description:
      "Get a random fascinating fact about raccoons. Returns plain text by default, or JSON with ?json=true parameter.",
    parameters: [
      {
        ...commonParameters.json,
        description: "Return JSON format with metadata",
      },
    ],
    response: {
      success: true,
      data: {
        fact: "Raccoons have extremely sensitive front paws with over 200,000 nerve endings per square inch.",
        total: 311,
      },
    },
    examples: [
      "https://api.racc.lol/fact",
      "https://api.racc.lol/fact?json=true",
    ],
  },
  {
    icon: FaChartBar,
    title: "API Statistics",
    method: "GET",
    endpoint: "/stats",
    description:
      "Get current statistics about the API content including total counts of photos, videos, and memes.",
    parameters: [],
    response: {
      success: true,
      data: {
        photos: 650,
        videos: 28,
        memes: 175,
      },
    },
    examples: ["https://api.racc.lol/stats"],
  },
  {
    icon: FaList,
    title: "List All Raccoons",
    method: "GET",
    endpoint: "/raccoons",
    description:
      "Get a list of all available raccoon images with their URLs and metadata.",
    parameters: [],
    response: {
      success: true,
      data: [
        {
          url: "https://api.racc.lol/raccoon/1",
          index: 1,
          size: 245760,
        },
        {
          url: "https://api.racc.lol/raccoon/2",
          index: 2,
          size: 189432,
        },
      ],
    },
    examples: ["https://api.racc.lol/raccoons"],
  },
  {
    icon: FaList,
    title: "List All Memes",
    method: "GET",
    endpoint: "/memes",
    description:
      "Get a list of all available meme images with their URLs and metadata.",
    parameters: [],
    response: {
      success: true,
      data: [
        {
          url: "https://api.racc.lol/meme/1",
          index: 1,
          size: 156789,
        },
        {
          url: "https://api.racc.lol/meme/2",
          index: 2,
          size: 203456,
        },
      ],
    },
    examples: ["https://api.racc.lol/memes"],
  },
];

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(
    endpoints[0]
  );
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filterEndpoints = (endpoints: Endpoint[], term: string) => {
    if (!term) return endpoints;

    const lowerTerm = term.toLowerCase();
    return endpoints.filter((endpoint) => {
      const matchesMain =
        endpoint.title.toLowerCase().includes(lowerTerm) ||
        endpoint.endpoint.toLowerCase().includes(lowerTerm) ||
        endpoint.description.toLowerCase().includes(lowerTerm);

      const matchesSub = endpoint.subEndpoints?.some(
        (sub) =>
          sub.title.toLowerCase().includes(lowerTerm) ||
          sub.endpoint.toLowerCase().includes(lowerTerm) ||
          sub.description.toLowerCase().includes(lowerTerm)
      );

      return matchesMain || matchesSub;
    });
  };

  const filteredEndpoints = filterEndpoints(endpoints, searchTerm);

  const copyToClipboard = async (text: string, buttonId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [buttonId]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [buttonId]: false }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback for older browsers or when clipboard API fails
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopiedStates((prev) => ({ ...prev, [buttonId]: true }));
        setTimeout(() => {
          setCopiedStates((prev) => ({ ...prev, [buttonId]: false }));
        }, 2000);
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError);
      }
    }
  };

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
                    href="https://github.com/venqoi/racc.lol"
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
                        href="https://github.com/venqoi/racc.lol"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)]">
            {/* Sidebar */}
            <Card className="lg:col-span-4 bg-card/95 backdrop-blur-sm border-2 border-border shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Endpoints</span>
                </CardTitle>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search endpoints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[calc(100vh-420px)] overflow-y-auto custom-scrollbar">
                  {filteredEndpoints.map(
                    (endpoint: Endpoint, index: number) => (
                      <div key={index}>
                        {/* Main endpoint */}
                        <div
                          className={`m-2 p-3 cursor-pointer transition-all duration-200 rounded-xl hover:bg-muted/30 ${
                            selectedEndpoint.endpoint === endpoint.endpoint
                              ? "bg-primary/10 border-2 border-primary shadow-sm"
                              : "border border-border/20"
                          }`}
                          onClick={() => setSelectedEndpoint(endpoint)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/30">
                              <endpoint.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant="secondary" className="text-xs">
                                  {endpoint.method}
                                </Badge>
                                <p className="text-sm font-medium text-foreground truncate">
                                  {endpoint.endpoint}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                {endpoint.title}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Sub-endpoints */}
                        {endpoint.subEndpoints?.map(
                          (subEndpoint: Endpoint, subIndex: number) => (
                            <div
                              key={`${index}-${subIndex}`}
                              className="relative"
                            >
                              <div
                                className={`ml-4 mr-2 mb-2 p-3 cursor-pointer transition-all duration-200 rounded-xl hover:bg-muted/30 relative ${
                                  selectedEndpoint.endpoint ===
                                  subEndpoint.endpoint
                                    ? "bg-primary/10 border-2 border-primary shadow-sm"
                                    : "border border-border/20"
                                }`}
                                onClick={() => setSelectedEndpoint(subEndpoint)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                                    <subEndpoint.icon className="h-3 w-3 text-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {subEndpoint.method}
                                      </Badge>
                                      <p className="text-xs font-medium text-foreground truncate">
                                        {subEndpoint.endpoint}
                                      </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {subEndpoint.title}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Card className="lg:col-span-8 bg-card/95 backdrop-blur-sm border-2 border-border shadow-xl rounded-2xl">
              <CardContent className="p-6 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 ring-2 ring-primary/30">
                        <selectedEndpoint.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {selectedEndpoint.title}
                        </h2>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">
                            {selectedEndpoint.method}
                          </Badge>
                          <code className="text-sm bg-secondary/50 px-2 py-1 rounded">
                            {selectedEndpoint.endpoint}
                          </code>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(
                              `https://api.racc.lol${selectedEndpoint.endpoint}`,
                              `endpoint-${selectedEndpoint.endpoint}`
                            )
                          }
                          className="hover:bg-primary/10 hover:text-foreground"
                        >
                          <FaCopy className="h-4 w-4 text-foreground" />
                        </Button>
                        {copiedStates[
                          `endpoint-${selectedEndpoint.endpoint}`
                        ] && (
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium shadow-lg z-10 whitespace-nowrap">
                            Copied! 🦝
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://api.racc.lol${selectedEndpoint.endpoint}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:bg-primary/10 hover:text-foreground"
                        >
                          <FaExternalLinkAlt className="h-4 w-4 text-foreground" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Description
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedEndpoint.description}
                    </p>
                  </div>

                  {/* Parameters */}
                  {selectedEndpoint.parameters.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Parameters
                      </h3>
                      <div className="space-y-3">
                        {selectedEndpoint.parameters.map(
                          (param: Parameter, index: number) => (
                            <div
                              key={index}
                              className="border border-border/30 rounded-xl p-4 bg-muted/20 shadow-sm"
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                <code className="text-sm font-mono bg-primary/10 px-2 py-1 rounded text-primary">
                                  {param.name}
                                </code>
                                <Badge variant="outline" className="text-xs">
                                  {param.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {param.description}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-muted-foreground">
                                  Example:
                                </span>
                                <code className="text-xs bg-secondary/50 px-2 py-1 rounded">
                                  {param.example}
                                </code>
                                <div className="relative">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      copyToClipboard(
                                        param.example,
                                        `param-${index}`
                                      )
                                    }
                                    className="h-6 w-6 p-0 hover:bg-primary/10 hover:text-foreground"
                                  >
                                    <FaCopy className="h-3 w-3 text-foreground" />
                                  </Button>
                                  {copiedStates[`param-${index}`] && (
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium shadow-lg z-10 whitespace-nowrap">
                                      Copied! 🦝
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-primary"></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Response */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Response
                    </h3>
                    <div className="bg-muted/20 border border-border/30 rounded-xl p-4 shadow-sm">
                      <pre className="text-sm text-foreground overflow-x-auto">
                        <code>
                          {JSON.stringify(selectedEndpoint.response, null, 2)}
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Examples
                    </h3>
                    <div className="space-y-3">
                      {selectedEndpoint.examples.map(
                        (example: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-muted/20 border border-border/30 rounded-xl p-3 shadow-sm"
                          >
                            <code className="text-sm text-primary font-mono">
                              {example}
                            </code>
                            <div className="flex space-x-2">
                              <div className="relative">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(example, `example-${index}`)
                                  }
                                  className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-foreground"
                                >
                                  <FaCopy className="h-4 w-4 text-foreground" />
                                </Button>
                                {copiedStates[`example-${index}`] && (
                                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium shadow-lg z-10 whitespace-nowrap">
                                    Copied! 🦝
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                                  </div>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-foreground"
                              >
                                <a
                                  href={example}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FaExternalLinkAlt className="h-4 w-4 text-foreground" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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
