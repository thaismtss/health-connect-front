import { serverInstace } from '@/lib/axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const payload = await req.json();

    const { data } = await serverInstace.post('/register', payload);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
