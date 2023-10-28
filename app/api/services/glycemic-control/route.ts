import { glycemicInstance } from '@/lib/axios';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export interface Response<T> {
  success: boolean;
  data: T;
}

export interface Glycemic {
  id: string;
  value: string;
  fasting: boolean;
  status: string;
  date: string;
  time: string;
}

export interface GlycemicControl {
  glycemic: Glycemic[];
  average: string;
  max: number;
  min: number;
}

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    const { data } = await glycemicInstance.get<Response<GlycemicControl>>(
      '/',
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      }
    );
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    const payload = await req.json();

    const { data } = await glycemicInstance.post(
      '/',
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${token?.accessToken}`,
        },
      }
    );
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
