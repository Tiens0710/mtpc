import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "models/gemini-embedding-001" });

async function upload() {
  console.log("🚀 Bắt đầu upload dữ liệu lên Supabase...");

  const dataPath = path.join(process.cwd(), 'data/mtpc_knowledge_base/mtpc_data_structured.json');
  const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  for (let i = 0; i < rawData.length; i++) {
    const item = rawData[i];
    console.log(`[${i+1}/${rawData.length}] Đang xử lý: ${item.title}`);

    // 1. Tạo embedding
    const embeddingResponse = await model.embedContent(item.content);
    const embedding = embeddingResponse.embedding.values;

    // 2. Đẩy lên Supabase
    const { error } = await supabase.from('mtpc_documents').insert({
      content: item.content,
      metadata: {
        source: 'structured_json',
        title: item.title,
        category: item.category,
        url: item.url,
        major_id: item.major_id
      },
      embedding: embedding
    });

    if (error) {
      console.error(`❌ Lỗi tại ${item.title}:`, error.message);
    } else {
      console.log(`✅ Thành công: ${item.title}`);
    }

    // Delay nhỏ để tránh rate limit
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log("🎉 HOÀN TẤT!");
}

upload();
