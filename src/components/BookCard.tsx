import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface BookCardProps {
  book: Book;
}

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + '₫';
}

export default function BookCard({ book }: BookCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group relative flex flex-col rounded-xl border border-[rgba(0,0,0,0.1)] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[rgba(0,0,0,0.04)_0px_4px_18px,rgba(0,0,0,0.027)_0px_2.025px_7.84688px,rgba(0,0,0,0.02)_0px_0.8px_2.925px,rgba(0,0,0,0.01)_0px_0.175px_1.04062px]">
      {/* Ảnh bìa */}
      <Link href={`/sach/${book.slug}`} className="block aspect-[2/3] overflow-hidden rounded-t-xl bg-[#f6f5f4]">
        <Image
          src={book.coverImage}
          alt={book.title}
          width={400}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Nội dung */}
      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        {/* Category badge */}
        <span className="self-start rounded-full bg-[#f2f9ff] px-3 py-1 text-[12px] font-semibold tracking-wide text-[#097fe8]">
          {book.category}
        </span>

        {/* Tên sách */}
        <Link href={`/sach/${book.slug}`}>
          <h3 className="text-[16px] font-semibold leading-snug text-[rgba(0,0,0,0.95)] line-clamp-2 hover:text-[#0075de] transition-colors">
            {book.title}
          </h3>
        </Link>

        {/* Tác giả */}
        <p className="text-[14px] font-medium text-[#615d59]">{book.author}</p>

        {/* Giá */}
        <div className="mt-auto flex items-center gap-2">
          <span className="text-[18px] font-bold text-red-600">
            {formatPrice(book.price)}
          </span>
          {book.originalPrice > book.price && (
            <span className="text-[13px] text-[#a39e98] line-through">
              {formatPrice(book.originalPrice)}
            </span>
          )}
        </div>

        {/* Nút thêm giỏ */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(book);
          }}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-[#0075de] px-4 py-2 text-[14px] font-semibold text-white transition-all hover:bg-[#005bab] active:scale-[0.97]"
        >
          <ShoppingCart size={16} />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}
