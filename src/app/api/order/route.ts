import { NextRequest, NextResponse } from 'next/server';
import { appendOrderToSheet } from '@/lib/sheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['orderId', 'name', 'phone', 'address', 'books', 'total'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Thiếu trường: ${field}` },
          { status: 400 }
        );
      }
    }

    // Ghi vào Google Sheets (mock nếu chưa có config)
    const result = await appendOrderToSheet({
      orderId: body.orderId,
      time: body.time || new Date().toLocaleString('vi-VN'),
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      address: body.address,
      books: body.books,
      total: body.total,
      paymentMethod: body.paymentMethod || 'COD',
      note: body.note || '',
    });

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Không thể lưu đơn hàng' },
        { status: 500 }
      );
    }

    // TODO: Gửi email thông báo cho kho
    console.log(`[order] New order: ${body.orderId}`, {
      name: body.name,
      phone: body.phone,
      total: body.total,
    });

    return NextResponse.json({
      success: true,
      orderId: body.orderId,
    });
  } catch (err) {
    console.error('[order] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Lỗi máy chủ' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
