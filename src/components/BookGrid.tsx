import { Book } from '@/types';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  columns?: 2 | 3 | 4;
}

export default function BookGrid({ books, columns = 4 }: BookGridProps) {
  const cols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-[18px] font-medium text-[#615d59]">
          Không tìm thấy sách phù hợp
        </p>
        <p className="mt-1 text-[14px] text-[#a39e98]">
          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${cols[columns]} gap-4 md:gap-6`}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
