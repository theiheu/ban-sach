'use client';

import { useState, FormEvent } from 'react';

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  loading: boolean;
}

export interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  paymentMethod: 'cod' | 'transfer';
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

function validate(data: OrderFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Vui lòng nhập họ tên';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại';
  } else if (!/^0\d{9}$/.test(data.phone.trim())) {
    errors.phone = 'SĐT phải 10 số, bắt đầu bằng 0';
  }

  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Email không hợp lệ';
  }

  if (!data.address.trim()) {
    errors.address = 'Vui lòng nhập địa chỉ nhận hàng';
  }

  return errors;
}

export default function OrderForm({ onSubmit, loading }: OrderFormProps) {
  const [form, setForm] = useState<OrderFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    paymentMethod: 'cod',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error khi người dùng sửa
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-md border px-3 py-2.5 text-[14px] text-[rgba(0,0,0,0.9)] placeholder:text-[#a39e98] focus:outline-none focus:ring-1 transition-colors ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
        : 'border-[#dddddd] focus:border-[#0075de] focus:ring-[#0075de]'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Họ tên */}
      <div>
        <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
          Họ tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Nguyễn Văn A"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={inputClass('name')}
        />
        {errors.name && <p className="mt-1 text-[12px] text-red-500">{errors.name}</p>}
      </div>

      {/* SĐT */}
      <div>
        <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
          Số điện thoại <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          placeholder="0901234567"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={inputClass('phone')}
        />
        {errors.phone && <p className="mt-1 text-[12px] text-red-500">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
          Email
        </label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={inputClass('email')}
        />
        {errors.email && <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>}
      </div>

      {/* Địa chỉ */}
      <div>
        <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
          Địa chỉ nhận hàng <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Số nhà, đường, phường, quận, thành phố"
          value={form.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={inputClass('address')}
        />
        {errors.address && <p className="mt-1 text-[12px] text-red-500">{errors.address}</p>}
      </div>

      {/* Ghi chú */}
      <div>
        <label className="mb-1 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
          Ghi chú
        </label>
        <textarea
          placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
          value={form.note}
          onChange={(e) => handleChange('note', e.target.value)}
          rows={3}
          className="w-full rounded-md border border-[#dddddd] px-3 py-2.5 text-[14px] text-[rgba(0,0,0,0.9)] placeholder:text-[#a39e98] focus:border-[#0075de] focus:outline-none focus:ring-1 focus:ring-[#0075de]"
        />
      </div>

      {/* Phương thức thanh toán */}
      <div>
        <label className="mb-2 block text-[14px] font-semibold text-[rgba(0,0,0,0.95)]">
          Phương thức thanh toán
        </label>
        <div className="flex gap-4">
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-[#dddddd] px-4 py-3 text-[14px] has-[:checked]:border-[#0075de] has-[:checked]:bg-[#f2f9ff]">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={form.paymentMethod === 'cod'}
              onChange={() => handleChange('paymentMethod', 'cod')}
              className="accent-[#0075de]"
            />
            Thanh toán khi nhận hàng (COD)
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-[#dddddd] px-4 py-3 text-[14px] has-[:checked]:border-[#0075de] has-[:checked]:bg-[#f2f9ff]">
            <input
              type="radio"
              name="payment"
              value="transfer"
              checked={form.paymentMethod === 'transfer'}
              onChange={() => handleChange('paymentMethod', 'transfer')}
              className="accent-[#0075de]"
            />
            Chuyển khoản ngân hàng
          </label>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[#0075de] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-[#005bab] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Đang xử lý...' : 'Đặt hàng'}
      </button>
    </form>
  );
}
