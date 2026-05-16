'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + '₫';
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } =
    useCart();

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-[#a39e98]" />
        <h1 className="mt-6 text-[28px] font-bold text-[rgba(0,0,0,0.95)]">
          Giỏ hàng trống
        </h1>
        <p className="mt-2 text-[16px] text-[#615d59]">
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </p>
        <Link
          href="/sach"
          className="mt-8 inline-flex rounded-md bg-[#0075de] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005bab]"
        >
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 200000 ? 0 : 30000;
  const finalTotal = totalPrice + shipping;
  const qualifiesFreeShip = totalPrice >= 200000;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.625px] text-[rgba(0,0,0,0.95)] md:text-[32px]">
            Giỏ hàng
          </h1>
          <p className="mt-1 text-[14px] text-[#615d59]">
            {totalItems} sản phẩm
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-[14px] font-medium text-[#615d59] underline transition-colors hover:text-red-600"
        >
          Xoá tất cả
        </button>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.book.id}
              className="flex gap-4 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white p-4"
            >
              <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-[#f6f5f4]">
                <Image
                  src={item.book.coverImage}
                  alt={item.book.title}
                  width={80}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-[15px] font-semibold text-[rgba(0,0,0,0.95)]">
                    {item.book.title}
                  </h3>
                  <p className="text-[13px] text-[#615d59]">{item.book.author}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-md border border-[#dddddd]">
                    <button
                      onClick={() =>
                        updateQuantity(item.book.id, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-[#f6f5f4]"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex h-8 w-10 items-center justify-center text-[14px] font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.book.id, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-[#f6f5f4]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[16px] font-bold text-red-600">
                      {formatPrice(item.book.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.book.id)}
                      className="text-[#a39e98] transition-colors hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-[rgba(0,0,0,0.1)] bg-white p-6">
          <h3 className="text-[18px] font-bold text-[rgba(0,0,0,0.95)]">
            Tổng đơn hàng
          </h3>

          <div className="mt-4 space-y-3 text-[14px]">
            <div className="flex justify-between">
              <span className="text-[#615d59]">Tạm tính</span>
              <span className="font-semibold text-[rgba(0,0,0,0.95)]">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#615d59]">Phí vận chuyển</span>
              <span
                className={`font-semibold ${
                  qualifiesFreeShip ? 'text-emerald-600' : 'text-[rgba(0,0,0,0.95)]'
                }`}
              >
                {qualifiesFreeShip
                  ? 'Miễn phí'
                  : formatPrice(shipping)}
              </span>
            </div>
            {!qualifiesFreeShip && (
              <p className="text-[12px] text-[#a39e98]">
                Miễn phí ship cho đơn trên 200,000₫
              </p>
            )}
            <div className="border-t border-[rgba(0,0,0,0.1)] pt-3">
              <div className="flex justify-between">
                <span className="text-[16px] font-bold text-[rgba(0,0,0,0.95)]">
                  Tổng cộng
                </span>
                <span className="text-[18px] font-bold text-red-600">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/dat-hang"
            className="mt-6 flex w-full items-center justify-center rounded-md bg-[#0075de] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005bab]"
          >
            Tiến hành đặt hàng
          </Link>

          <Link
            href="/sach"
            className="mt-3 flex items-center justify-center text-[14px] font-medium text-[#615d59] transition-colors hover:text-[#0075de]"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
