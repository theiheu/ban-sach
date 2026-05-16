'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    const id = sessionStorage.getItem('lastOrderId');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (id) setOrderId(id);
  }, []);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle size={48} className="text-emerald-500" />
      </div>

      <h1 className="mt-6 text-[28px] font-bold tracking-[-0.625px] text-[rgba(0,0,0,0.95)]">
        Đặt hàng thành công!
      </h1>

      {orderId && (
        <p className="mt-3 rounded-lg bg-[#f6f5f4] px-4 py-2 text-[15px] font-semibold text-[#615d59]">
          Mã đơn hàng: {orderId}
        </p>
      )}

      <p className="mt-6 text-[16px] leading-relaxed text-[#615d59]">
        Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ
        để xác nhận đơn hàng và thông báo thời gian giao hàng.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/sach"
          className="rounded-md bg-[#0075de] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005bab]"
        >
          Tiếp tục mua sắm
        </Link>
        <Link
          href="/"
          className="rounded-md border border-[rgba(0,0,0,0.1)] px-6 py-3 text-[15px] font-semibold text-[rgba(0,0,0,0.95)] transition-all hover:bg-[#f6f5f4]"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
