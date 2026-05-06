"use client";

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { api_repo } from "../utils/Consts";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  backdrop-filter: blur(12px);
  border: 1px solid #3a3530;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 73rem;
  margin: 0 auto;
  z-index: 100;
  box-sizing: border-box;

  @media (max-width: 768px) {
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid #3a3530;
    max-width: 100%;
  }
`;

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Logo = styled(motion.div)`
  a {
    font-size: 1.25rem;
    font-weight: 500;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    color: #d8c2ba;
    text-decoration: none;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: var(--text-muted);
    }
  }
`;

const NavLinks = styled(motion.div)`
  display: none;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem;
  border-radius: 0.375rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: var(--text-primary);
    background: var(--button-bg);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  color: var(--text-muted);
  background: transparent;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    `
    color: var(--text-primary);
    background: var(--button-bg);
  `}

  &:not([aria-current="page"]) {
    &:hover {
      color: var(--text-primary);
      background: var(--button-bg);
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--selected);
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: var(--foreground);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ec4899;
  }

  @media (min-width: 768px) {
    display: none;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 99;
  background: var(--background);
  backdrop-filter: blur(12px);
  padding-top: 5rem;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
`;

const MobileNavLink = styled(Link)<{ $active: boolean }>`
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  color: var(--text-muted);
  background: transparent;
  text-decoration: none;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  max-width: 20rem;

  ${({ $active }) =>
    $active &&
    `
    color: var(--text-primary);
    background: var(--bg-primary);
    border-color: var(--selected);
  `}

  &:not([aria-current="page"]) {
    &:hover {
      color: var(--text-primary);
      background: var(--bg-primary);
      border-color: var(--selected);
    }
  }
`;

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.slice(1);
    }
    return pathname === href;
  };

  const items: NavItem[] = [
    { href: "/", label: "/home" },
    { href: "/documentation", label: "/documentation" },
    { href: "/radio", label: "/radio" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <NavContainer
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <NavInner>
          <Logo
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              racc.lol
            </Link>
          </Logo>

          <NavLinks
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          >
            {items.map((item, index) => {
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + index * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <NavLink
                    href={item.href}
                    $active={active}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              );
            })}
          </NavLinks>
          <IconLink
            href={api_repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </IconLink>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            aria-label="Toggle menu"
          >
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </MobileMenuButton>
        </NavInner>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MobileNavLinks>
              {items.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <MobileNavLink
                      href={item.href}
                      $active={active}
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </MobileNavLink>
                  </motion.div>
                );
              })}
            </MobileNavLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
