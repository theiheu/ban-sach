import { getAllSlugs } from '@/data/books';
import BookDetailClient from './BookDetailClient';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function BookDetailPage() {
  return <BookDetailClient />;
}
