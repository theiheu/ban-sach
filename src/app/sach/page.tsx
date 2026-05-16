'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import BookGrid from '@/components/BookGrid';
import CategoryFilter from '@/components/CategoryFilter';
import { books, categories } from '@/data/books';

function SachContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'Tất cả';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = useMemo(() => {
    let result =
      activeCategory === 'Tất cả'
        ? [...books]
        : books.filter((b) => b.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
      <h1 className="mb-2 text-[32px] font-bold leading-tight tracking-[-1px] text-[rgba(0,0,0,0.95)] md:text-[40px] md:tracking-[-1.5px]">
        Danh mục sách
      </h1>
      <p className="mb-8 text-[16px] text-[#615d59]">
        {filteredBooks.length}/{books.length} sản phẩm
      </p>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="mt-8">
        <BookGrid books={filteredBooks} />
      </div>
    </div>
  );
}

export default function SachPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-20 text-center text-[#615d59]">Đang tải...</div>}>
      <SachContent />
    </Suspense>
  );
}
