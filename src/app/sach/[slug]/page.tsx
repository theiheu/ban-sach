'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import BookGrid from '@/components/BookGrid';
import { getBookBySlug, getBooksByCategory } from '@/data/books';

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + '₫';
}

export default function BookDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const book = getBookBySlug(slug);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!book) {
    notFound();
  }

  const relatedBooks = getBooksByCategory(book.category).filter(
    (b) => b.id !== book.id
  ).slice(0, 4);

  const discountPercent = Math.round(
    (1 - book.price / book.originalPrice) * 100
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      {/* Breadcrumb */}
      <Link
        href="/sach"
        className="mb-6 inline-flex items-center gap-1 text-[14px] font-medium text-[#615d59] transition-colors hover:text-[#0075de]"
      >
        <ArrowLeft size={16} />
        Quay lại danh mục
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Ảnh sách */}
        <div className="sticky top-24 self-start">
          <div className="overflow-hidden rounded-xl border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4]">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={400}
              height={600}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Thông tin */}
        <div>
          <span className="inline-block rounded-full bg-[#f2f9ff] px-4 py-1 text-[12px] font-semibold tracking-wide text-[#097fe8]">
            {book.category}
          </span>

          <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.625px] text-[rgba(0,0,0,0.95)] md:text-[32px]">
            {book.title}
          </h1>

          <p className="mt-2 text-[16px] font-medium text-[#615d59]">
            {book.author}
          </p>

          {/* Giá */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-[28px] font-bold text-red-600">
              {formatPrice(book.price)}
            </span>
            {book.originalPrice > book.price && (
              <>
                <span className="text-[16px] text-[#a39e98] line-through">
                  {formatPrice(book.originalPrice)}
                </span>
                <span className="rounded-full bg-red-50 px-3 py-0.5 text-[13px] font-semibold text-red-600">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          {/* Mô tả */}
          <div className="mt-8">
            <h2 className="mb-2 text-[16px] font-semibold text-[rgba(0,0,0,0.95)]">
              Mô tả
            </h2>
            <p className="text-[15px] leading-relaxed text-[#615d59]">
              {book.description}
            </p>
          </div>

          {/* Thông tin chi tiết */}
          <div className="mt-6 space-y-2 border-t border-[rgba(0,0,0,0.1)] pt-6 text-[14px] text-[#615d59]">
            <p>
              <span className="font-medium text-[rgba(0,0,0,0.95)]">
                Số trang:
              </span>{' '}
              {book.pages}
            </p>
            <p>
              <span className="font-medium text-[rgba(0,0,0,0.95)]">
                Thể loại:
              </span>{' '}
              {book.category}
            </p>
          </div>

          {/* Số lượng + buttons */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
                Số lượng:
              </span>
              <div className="flex items-center rounded-md border border-[#dddddd]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-[#f6f5f4]"
                >
                  <Minus size={16} />
                </button>
                <span className="flex h-10 w-12 items-center justify-center text-[15px] font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-[#f6f5f4]"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addItem(book, quantity)}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#0075de] px-6 py-3 text-[15px] font-semibold text-[#0075de] transition-all hover:bg-[#f2f9ff] active:scale-[0.98]"
              >
                <ShoppingCart size={18} />
                Thêm vào giỏ hàng
              </button>
              <Link
                href="/gio-hang"
                className="flex flex-1 items-center justify-center rounded-md bg-[#0075de] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005bab] active:scale-[0.98]"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related books */}
      {relatedBooks.length > 0 && (
        <section className="mt-16 border-t border-[rgba(0,0,0,0.1)] pt-12">
          <h2 className="mb-8 text-[24px] font-bold tracking-[-0.5px] text-[rgba(0,0,0,0.95)]">
            Sách cùng thể loại
          </h2>
          <BookGrid books={relatedBooks} columns={4} />
        </section>
      )}
    </div>
  );
}
