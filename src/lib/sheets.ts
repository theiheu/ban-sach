// Google Sheets integration for order logging
// Cần setup GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY + GOOGLE_SHEET_ID trong .env.local

interface OrderRecord {
  orderId: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  books: string;
  total: number;
  paymentMethod: string;
  note: string;
}

export async function appendOrderToSheet(order: OrderRecord): Promise<boolean> {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

    if (!sheetId || !email || !privateKey) {
      console.log('[sheets] Missing Google creds. Mock append. Order:', JSON.stringify(order));
      return true; // Mock success when not configured
    }

    // Dynamic import — only available server-side
    const { GoogleSpreadsheet } = await import('google-spreadsheet');
    const { JWT } = await import('google-auth-library');

    const serviceAccountAuth = new JWT({
      email,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      'Mã đơn': order.orderId,
      'Thời gian': order.time,
      'Tên khách': order.name,
      'SĐT': order.phone,
      'Email': order.email,
      'Địa chỉ': order.address,
      'Sách': order.books,
      'Tổng tiền': order.total,
      'Thanh toán': order.paymentMethod,
      'Ghi chú': order.note,
      'Trạng thái': 'Mới',
    });

    console.log(`[sheets] Order ${order.orderId} appended`);
    return true;
  } catch (err) {
    console.error('[sheets] Append failed:', err);
    return false;
  }
}

export function generateOrderId(): string {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DH-${t}${r}`;
}
