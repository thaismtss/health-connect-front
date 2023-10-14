import { serverInstace } from '@/lib/axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const { data } = await serverInstace.get('/services/list/user', {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
