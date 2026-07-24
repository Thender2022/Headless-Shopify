import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { revalidateTag } from 'next/cache';  // ⭐ Use tags instead

export async function POST(req: NextRequest) {
  try {
    const hmac = req.headers.get('x-shopify-hmac-sha256');
    const topic = req.headers.get('x-shopify-topic');
    const rawBody = await req.text();
    
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET || '';
    const generatedHash = crypto
      .createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('base64');
    
    if (hmac !== generatedHash) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const handle = body.handle;

    // Revalidate using tags
    revalidateTag(`product-${handle}`);
    revalidateTag('products');
    revalidateTag('homepage');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}