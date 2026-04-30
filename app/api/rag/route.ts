import { NextRequest, NextResponse } from 'next/server';
import { SupabaseRAG } from '@/lib/ai/supabase-rag';

const rag = new SupabaseRAG();

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    const context = await rag.search(query);
    return NextResponse.json({ context });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
