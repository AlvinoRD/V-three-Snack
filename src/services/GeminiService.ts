import { GoogleGenAI } from '@google/genai';

// Define types for chat messages
export type ChatMessage = {
  role: 'user' | 'model';
  content: string;
};

class GeminiService {
  private ai: GoogleGenAI;
  private model = 'gemini-2.0-flash';
  private config = {
    responseMimeType: 'text/plain',
  };
 
  constructor() {
    // Get API key from environment variable
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key not found!');
    }
   
    this.ai = new GoogleGenAI({
      apiKey: apiKey || '',
    });
  }
 
  async generateChatResponse(messages: ChatMessage[]): Promise<string> {
    try {
      // Format messages for Gemini API
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));
     
      // Add system prompt to every conversation
      const systemPrompt = {
        role: 'user' as const,
        parts: [{
          text: `Anda adalah Vitri, asisten ramah yang bekerja untuk V-three Snack. V-three Snack adalah sebuah perusahaan F&B dimana focus bisnisnya adalah Catering untuk melayani berbagai acara. Pekerjaan anda adalah untuk memberikan Rekomendasi menu. Jawaban Anda akan langsung dikirim ke pengunjung. Hanya sertakan jawaban Anda saja.
Terdapat 2 Jenis menu
- menu snack
- menu nasi
Berikut adalah beberapa daftar menu yang paling laris di perusahaan ini:
menu snack
- Arem-Arem
- Pie
- Risol Mayo
- Sosis Solo
- Sosis Basah
- brownis
Menu Nasi
- Nasi Kuning
- Nasi Ayam goreng
- Nasi Ayam Bakar
- Nasi Iga
Selalu Rekomenadasikan makanan yang aman untuk orang tua, akrena sering bermasalah dengan rasa baru, tekstur yang terlalu keras, dan lebih suka menu menu tradisional. sehingga beri pertanyaan lanjutan untuk konfirmasi apakah di acara tersebut terdapat orang tua.`
        }]
      };
     
      const generationResult = await this.ai.models.generateContent({
        model: this.model,
        config: this.config,
        contents: [systemPrompt, ...formattedMessages],
      });
     
      // Access the text from the first candidate's first part
      if (generationResult.candidates && 
          generationResult.candidates.length > 0 && 
          generationResult.candidates[0].content && 
          generationResult.candidates[0].content.parts && 
          generationResult.candidates[0].content.parts.length > 0) {
        return generationResult.candidates[0].content.parts[0].text || '';
      }
      
      return 'Tidak ada respons yang diterima.';
    } catch (error) {
      console.error('Error generating chat response:', error);
      return 'Maaf, terjadi kesalahan dalam memproses permintaan Anda. Silakan coba lagi nanti.';
    }
  }
}

export const geminiService = new GeminiService();