'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/sach', label: 'Danh mục sách' },
    { href: '/lien-he', label: 'Liên hệ' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.1)] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[20px] font-bold tracking-tight text-[rgba(0,0,0,0.95)]">
            Sách Hay
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-[rgba(0,0,0,0.95)] transition-colors hover:text-[#0075de]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/gio-hang"
            className="relative flex items-center gap-1 text-[15px] font-semibold text-[rgba(0,0,0,0.95)] transition-colors hover:text-[#0075de]"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#0075de] text-[11px] font-bold text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
            <span className="hidden md:inline">Giỏ hàng</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[rgba(0,0,0,0.1)] bg-white md:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-[15px] font-semibold text-[rgba(0,0,0,0.95)] transition-colors hover:bg-[#f6f5f4]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
