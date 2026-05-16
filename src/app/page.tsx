'use client';

import Link from 'next/link';
import BookGrid from '@/components/BookGrid';
import { getFeaturedBooks, categories } from '@/data/books';

export default function HomePage() {
  const featuredBooks = getFeaturedBooks();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#f6f5f4]">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6 md:py-32">
          <h1 className="mx-auto max-w-3xl text-[40px] font-bold leading-tight tracking-[-1.5px] text-[rgba(0,0,0,0.95)] md:text-[54px] md:leading-[1.04] md:tracking-[-1.875px]">
            Khám phá những cuốn sách{' '}
            <span className="text-[#0075de]">thay đổi cuộc đời</span> bạn
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-[#615d59] md:text-[20px]">
            Sách self-help, phát triển bản thân, kinh doanh và kỹ năng sống —
            đồng hành cùng bạn trên hành trình trở thành phiên bản tốt hơn.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/sach"
              className="rounded-md bg-[#0075de] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005bab]"
            >
              Khám phá sách
            </Link>
            <Link
              href="/lien-he"
              className="rounded-md border border-[rgba(0,0,0,0.1)] px-6 py-3 text-[15px] font-semibold text-[rgba(0,0,0,0.95)] transition-all hover:bg-[rgba(0,0,0,0.05)]"
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <h2 className="mb-2 text-[32px] font-bold leading-tight tracking-[-1px] text-[rgba(0,0,0,0.95)] md:text-[40px] md:tracking-[-1.5px]">
          Sách nổi bật
        </h2>
        <p className="mb-10 text-[16px] text-[#615d59]">
          Những cuốn sách được độc giả yêu thích nhất
        </p>
        <BookGrid books={featuredBooks} columns={3} />
      </section>

      {/* Categories */}
      <section className="bg-[#f6f5f4]">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h2 className="mb-2 text-[32px] font-bold leading-tight tracking-[-1px] text-[rgba(0,0,0,0.95)] md:text-[40px] md:tracking-[-1.5px]">
            Danh mục sách
          </h2>
          <p className="mb-10 text-[16px] text-[#615d59]">
            Chọn thể loại bạn yêu thích
          </p>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/sach?cat=${encodeURIComponent(cat)}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-[rgba(0,0,0,0.1)] bg-white px-6 py-8 text-center transition-all hover:-translate-y-1 hover:shadow-[rgba(0,0,0,0.04)_0px_4px_18px,rgba(0,0,0,0.027)_0px_2.025px_7.84688px]"
              >
                <span className="text-[24px] font-bold text-[#0075de] md:text-[32px]">
                  {cat === 'Phát triển bản thân' && '🧠'}
                  {cat === 'Kinh doanh' && '💼'}
                  {cat === 'Tâm lý' && '🔍'}
                  {cat === 'Kỹ năng sống' && '🌟'}
                  {cat === 'Tài chính' && '💰'}
                </span>
                <span className="text-[15px] font-semibold text-[rgba(0,0,0,0.95)]">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
