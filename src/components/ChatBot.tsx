import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { geminiService, ChatMessage } from '../services/GeminiService';

type ChatBotProps = {
  colors: {
    base: string;
    gold: string;
    pink: string;
    darkPink: string;
    sage: string;
    brown: string;
    text: string;
  };
};

const ChatBot: React.FC<ChatBotProps> = ({ colors }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: `Halo! Saya Vitri, asisten dari V-Three Snack. Bagaimana saya bisa membantu Anda dengan rekomendasi menu catering hari ini?`
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    const newMessage: ChatMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Get response from Gemini
      const response = await geminiService.generateChatResponse([...messages, newMessage]);
      
      // Add bot response to chat
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${colors.pink}, ${colors.darkPink})`,
          color: 'white',
        }}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Chat with V-Three Snack"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-h-[500px] rounded-2xl shadow-xl flex flex-col"
          style={{
            background: colors.base,
            border: `1px solid ${colors.sage}`,
            boxShadow: `0 10px 25px rgba(180, 112, 127, 0.2)`,
          }}
        >
          {/* Chat header */}
          <div 
            className="p-4 rounded-t-2xl flex items-center space-x-3"
            style={{
              background: `linear-gradient(135deg, ${colors.pink}, ${colors.darkPink})`,
              color: 'white',
            }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: colors.base,
                border: `2px solid ${colors.gold}`
              }}
            >
              <span className="text-xl" style={{ color: colors.darkPink }}>V</span>
            </div>
            <div>
              <h3 className="font-bold">Vitri</h3>
              <p className="text-xs opacity-80">Asisten Menu V-Three Snack</p>
            </div>
          </div>
          
          {/* Chat messages or login prompt */}
          <div 
            className="flex-1 p-4 overflow-y-auto"
            style={{
              backgroundImage: `radial-gradient(${colors.sage}15 0.5px, ${colors.base} 0.5px)`,
              backgroundSize: "15px 15px"
            }}
          >
            {currentUser ? (
              // Render chat messages if user is logged in
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
                  >
                    <div
                      className={`p-3 rounded-2xl ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                      style={{
                        backgroundColor: msg.role === 'user' ? colors.gold : colors.sage,
                        color: colors.text,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="mb-4 max-w-[85%] mr-auto">
                    <div
                      className="p-3 rounded-2xl rounded-tl-sm flex items-center space-x-1"
                      style={{
                        backgroundColor: colors.sage,
                        color: colors.text
                      }}
                    >
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.darkPink }}></div>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.darkPink, animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.darkPink, animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Render login prompt if user is not logged in
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: colors.sage,
                    border: `2px solid ${colors.gold}`
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: colors.darkPink }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                  Login untuk Menggunakan ChatBot
                </h3>
                <p className="text-sm mb-4" style={{ color: colors.text }}>
                  Untuk mengobrol dengan Vitri dan mendapatkan rekomendasi menu, silakan login terlebih dahulu.
                </p>
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: colors.pink,
                      color: 'white',
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: colors.gold,
                      color: colors.text,
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input - only show if logged in */}
          {currentUser && (
            <form 
              onSubmit={handleSendMessage}
              className="p-3 border-t flex items-center"
              style={{ borderColor: colors.sage }}
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Tanyakan tentang menu catering..."
                className="flex-1 p-2 rounded-l-full focus:outline-none text-sm"
                style={{ 
                  backgroundColor: colors.sage + '30',
                  color: colors.text,
                  border: `1px solid ${colors.sage}`,
                  borderRight: 'none' 
                }}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="p-2 rounded-r-full"
                style={{
                  backgroundColor: isLoading ? colors.sage : colors.darkPink,
                  color: 'white',
                  border: `1px solid ${isLoading ? colors.sage : colors.darkPink}`,
                }}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;