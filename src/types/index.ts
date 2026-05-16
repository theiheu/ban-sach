export interface Book {
  id: number
  slug: string
  title: string
  author: string
  originalPrice: number
  price: number
  category: string
  description: string
  coverImage: string
  featured: boolean
  pages: number
}

export interface CartItem {
  book: Book
  quantity: number
}

export interface OrderForm {
  name: string
  phone: string
  email: string
  address: string
  note: string
  paymentMethod: 'cod' | 'transfer'
}
