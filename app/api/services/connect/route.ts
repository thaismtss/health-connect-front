import { serverInstace } from '@/lib/axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get('serviceId');

    const { data } = await serverInstace.post(
      `/services/connect`,
      { serviceId },
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
