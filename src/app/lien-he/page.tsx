'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock send — sau này có thể gửi email thật
    console.log('Contact form:', form);
    setSent(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <h1 className="text-[28px] font-bold tracking-[-0.625px] text-[rgba(0,0,0,0.95)] md:text-[32px]">
        Liên hệ
      </h1>
      <p className="mt-1 text-[16px] text-[#615d59]">
        Bạn có câu hỏi? Gửi tin nhắn cho chúng tôi.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {/* Form */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.1)] bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
                Họ tên
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-[#dddddd] px-3 py-2.5 text-[14px] focus:border-[#0075de] focus:outline-none focus:ring-1 focus:ring-[#0075de]"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-[#dddddd] px-3 py-2.5 text-[14px] focus:border-[#0075de] focus:outline-none focus:ring-1 focus:ring-[#0075de]"
                placeholder="example@gmail.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-md border border-[#dddddd] px-3 py-2.5 text-[14px] focus:border-[#0075de] focus:outline-none focus:ring-1 focus:ring-[#0075de]"
                placeholder="0901234567"
              />
            </div>
            <div>
              <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
                Nội dung
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md border border-[#dddddd] px-3 py-2.5 text-[14px] focus:border-[#0075de] focus:outline-none focus:ring-1 focus:ring-[#0075de]"
                placeholder="Nội dung tin nhắn..."
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-md bg-[#0075de] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005bab]"
            >
              <Send size={16} />
              {sent ? 'Đã gửi!' : 'Gửi tin nhắn'}
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="rounded-xl border border-[rgba(0,0,0,0.1)] bg-white p-6">
            <h3 className="text-[18px] font-bold text-[rgba(0,0,0,0.95)]">
              Thông tin liên hệ
            </h3>
            <ul className="mt-4 space-y-4 text-[14px] text-[#615d59]">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#0075de]" />
                <a href="mailto:info@sachhay.vn" className="hover:text-[#0075de] transition-colors">
                  info@sachhay.vn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#0075de]" />
                <a href="tel:0900000000" className="hover:text-[#0075de] transition-colors">
                  0900 000 000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#0075de]" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[rgba(0,0,0,0.1)] bg-[#f6f5f4] p-6">
            <h3 className="text-[16px] font-bold text-[rgba(0,0,0,0.95)]">
              Giờ làm việc
            </h3>
            <ul className="mt-3 space-y-2 text-[14px] text-[#615d59]">
              <li className="flex justify-between">
                <span>Thứ 2 — Thứ 6</span>
                <span className="font-medium">8:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Thứ 7</span>
                <span className="font-medium">8:00 - 12:00</span>
              </li>
              <li className="flex justify-between">
                <span>Chủ nhật</span>
                <span className="font-medium">Nghỉ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
