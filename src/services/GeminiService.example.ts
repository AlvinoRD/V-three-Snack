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
          text: `Anda adalah asisten untuk V-three Snack, perusahaan catering. Berikan rekomendasi menu berdasarkan preferensi pengguna.`
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
