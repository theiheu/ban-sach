import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[rgba(0,0,0,0.1)] bg-[#f6f5f4]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Về chúng tôi */}
          <div>
            <h3 className="mb-4 text-[18px] font-bold text-[rgba(0,0,0,0.95)]">
              Sách Hay
            </h3>
            <p className="text-[14px] leading-relaxed text-[#615d59]">
              Sách self-help, phát triển bản thân, kinh doanh và kỹ năng sống
              dành cho người Việt. Cam kết sách chính hãng, giá tốt nhất.
            </p>
          </div>

          {/* Danh mục */}
          <div>
            <h3 className="mb-4 text-[16px] font-semibold text-[rgba(0,0,0,0.95)]">
              Danh mục
            </h3>
            <ul className="space-y-2 text-[14px] text-[#615d59]">
              {['Phát triển bản thân', 'Kinh doanh', 'Tâm lý', 'Kỹ năng sống', 'Tài chính'].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/sach?cat=${encodeURIComponent(cat)}`}
                      className="transition-colors hover:text-[#0075de]"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="mb-4 text-[16px] font-semibold text-[rgba(0,0,0,0.95)]">
              Liên hệ
            </h3>
            <ul className="space-y-3 text-[14px] text-[#615d59]">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@sachhay.vn" className="hover:text-[#0075de] transition-colors">
                  info@sachhay.vn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:0900000000" className="hover:text-[#0075de] transition-colors">
                  0900 000 000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[rgba(0,0,0,0.1)] pt-6 text-center text-[13px] text-[#a39e98]">
          &copy; {new Date().getFullYear()} Sách Hay. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
