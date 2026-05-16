'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import OrderForm, { OrderFormData } from '@/components/OrderForm';
import { useCart } from '@/context/CartContext';
import { generateOrderId } from '@/lib/order';

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + '₫';
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const shipping = totalPrice >= 200000 ? 0 : 30000;
  const finalTotal = totalPrice + shipping;

  // Redirect nếu giỏ trống
  if (items.length === 0) {
    router.push('/gio-hang');
    return null;
  }

  const handleSubmit = async (formData: OrderFormData) => {
    setLoading(true);

    const orderId = generateOrderId();
    const orderPayload = {
      orderId,
      time: new Date().toLocaleString('vi-VN'),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      books: JSON.stringify(
        items.map((i) => ({
          title: i.book.title,
          price: i.book.price,
          quantity: i.quantity,
        }))
      ),
      total: finalTotal,
      paymentMethod: formData.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản',
      note: formData.note,
    };

    try {
      // Mock gửi đơn (khi có Google Sheets sẽ thay bằng API call qua Cloudflare Worker)
      console.log('[ORDER]', orderPayload);
      const success = true;

      if (success) {
        sessionStorage.setItem('lastOrderId', orderId);
        clearCart();
        router.push('/dat-hang/thanh-cong');
      } else {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } catch {
      alert('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <h1 className="text-[28px] font-bold tracking-[-0.625px] text-[rgba(0,0,0,0.95)] md:text-[32px]">
        Đặt hàng
      </h1>
      <p className="mt-1 text-[14px] text-[#615d59]">
        Vui lòng nhập thông tin để hoàn tất đơn hàng
      </p>

      <div className="mt-8 grid gap-10 md:grid-cols-[1fr_380px]">
        {/* Form */}
        <div>
          <div className="rounded-xl border border-[rgba(0,0,0,0.1)] bg-white p-6">
            <h2 className="mb-6 text-[18px] font-bold text-[rgba(0,0,0,0.95)]">
              Thông tin giao hàng
            </h2>
            <OrderForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-xl border border-[rgba(0,0,0,0.1)] bg-white p-6">
          <h3 className="text-[18px] font-bold text-[rgba(0,0,0,0.95)]">
            Đơn hàng của bạn
          </h3>

          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.book.id} className="flex gap-3">
                <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md bg-[#f6f5f4]">
                  <Image
                    src={item.book.coverImage}
                    alt={item.book.title}
                    width={48}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-[rgba(0,0,0,0.95)]">
                    {item.book.title}
                  </p>
                  <p className="text-[12px] text-[#615d59]">
                    SL: {item.quantity}
                  </p>
                </div>
                <span className="text-[14px] font-semibold text-red-600">
                  {formatPrice(item.book.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-[rgba(0,0,0,0.1)] pt-4 text-[14px]">
            <div className="flex justify-between">
              <span className="text-[#615d59]">Tạm tính</span>
              <span className="font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#615d59]">Vận chuyển</span>
              <span
                className={`font-semibold ${
                  shipping === 0 ? 'text-emerald-600' : ''
                }`}
              >
                {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-[rgba(0,0,0,0.1)] pt-3">
              <span className="text-[16px] font-bold">Tổng cộng</span>
              <span className="text-[18px] font-bold text-red-600">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
