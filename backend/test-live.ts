import { GoogleGenAI, Modality } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const config = {
    responseModalities: ["AUDIO", "TEXT"] as Modality[],
    speechConfig: {
      voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
    },
    systemInstruction: "You are a helpful assistant.",
  };

  console.log("Connecting...");
  const session = await ai.live.connect({ model: 'models/gemini-2.0-flash-exp', config, callbacks: {} as any }) as any;
  
  console.log("Session keys:", Object.keys(session));
  console.log("Session prototype keys:", Object.getOwnPropertyNames(Object.getPrototypeOf(session)));
  process.exit(0);

  const stream = (session as any).receive ? (session as any).receive() : session;
  for await (const response of stream) {
    const sc = response.serverContent;
    if (sc?.modelTurn?.parts) {
      for (const part of sc.modelTurn.parts) {
        if (part.inlineData?.data) {
          console.log("-> RECEIVED AUDIO CHUNK");
        }
        if (part.text) {
          console.log("-> RECEIVED TEXT:", part.text);
        }
      }
    }
    if (sc?.turnComplete) {
      console.log("-> Turn Complete");
      process.exit(0);
    }
  }
}

run().catch(console.error);
