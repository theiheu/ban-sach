import { Search } from 'lucide-react';

interface CategoryFilterProps {
  categories: readonly string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Category buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('Tất cả')}
          className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
            activeCategory === 'Tất cả'
              ? 'bg-[#0075de] text-white'
              : 'bg-[#f6f5f4] text-[rgba(0,0,0,0.95)] hover:bg-[#e8e7e5]'
          }`}
        >
          Tất cả
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-[#0075de] text-white'
                : 'bg-[#f6f5f4] text-[rgba(0,0,0,0.95)] hover:bg-[#e8e7e5]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full md:w-64">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a39e98]"
        />
        <input
          type="text"
          placeholder="Tìm sách..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border border-[#dddddd] bg-white py-2 pl-10 pr-4 text-[14px] text-[rgba(0,0,0,0.9)] placeholder:text-[#a39e98] focus:border-[#0075de] focus:outline-none focus:ring-1 focus:ring-[#0075de]"
        />
      </div>
    </div>
  );
}
