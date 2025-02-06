

"use client"; // Add this at the very top of your file

import { ReactNode } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, BotIcon, UserIcon, Loader2, HomeIcon } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  format?: 'text' | 'structured';
  structuredContent?: {
    title?: string;
    sections?: {
      heading?: string;
      content: string[];
    }[];
  };
}

const MessageContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`w-full max-w-5xl mx-auto ${className}`}>
    {children}
  </div>
);

interface Section {
  heading?: string;
  content: string[]; // Array of strings for list items
}

interface ContentProps {
  title?: string;
  sections?: Section[]; // Array of sections
}

const StructuredMessage: React.FC<{ content: ContentProps }> = ({ content }) => (
  <div className="space-y-4">
    {content.title && (
      <h3 className="text-lg font-semibold text-gray-200 mb-2">
        {content.title}
      </h3>
    )}
    {content.sections?.map((section, index) => (
      <div key={index} className="space-y-2">
        {section.heading && (
          <h4 className="text-md font-medium text-gray-300">
            {section.heading}
          </h4>
        )}
        <ul className="space-y-2">
          {section.content.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start space-x-2">
              <span className="text-blue-400 mt-1">•</span>
              <span className="text-gray-100">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (!confirm('Are you sure you want to leave the chat?')) {
      e.preventDefault();
    }
  };

  // Format AI response and handle JSON parsing
  const formatAIResponse = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      if (parsed.sections || parsed.title) {
        return {
          format: "structured" as const,  // Ensure it is specifically "structured"
          structuredContent: parsed,
        };
      }
    } catch (e) {
      // Treat as regular text if JSON parsing fails
    }
    return {
      format: "text" as const,  // Default to "text" if not structured
      text,
    };
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      format: 'text',
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      const aiResponseText = data.outputs[0].outputs[0].outputs.message.message.text;
      const formattedResponse = formatAIResponse(aiResponseText);

      // Example interface for Message
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: formattedResponse.format === "text" ? formattedResponse.text || "" : "",
        sender: "ai",
        timestamp: new Date(),
        format: formattedResponse.format, // Now safely using "text" or "structured"
        structuredContent:
          formattedResponse.format === "structured" ? formattedResponse.structuredContent : undefined,
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your request.",
        sender: 'ai',
        timestamp: new Date(),
        format: 'text',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900 p-4 backdrop-blur-lg bg-opacity-80">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a
              href="/"
              onClick={handleHomeClick}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
            >
              <HomeIcon className="w-5 h-5 text-gray-400 hover:text-gray-200" />
            </a>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              HolistiCare
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>AI Active</span>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`px-4 py-6 ${message.sender === 'ai' ? 'bg-gray-900' : 'bg-black'
                } transition-colors duration-300`}
            >
              <MessageContainer>
                <div className="flex space-x-4 items-start">
                  <div className="flex-shrink-0 mt-1">
                    {message.sender === 'user' ? (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
                        <BotIcon className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-400">
                        {message.sender === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    {message.format === 'structured' && message.structuredContent ? (
                      <StructuredMessage content={message.structuredContent} />
                    ) : (
                      <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    )}
                  </div>
                </div>
              </MessageContainer>
            </div>
          ))}
          {isTyping && (
            <div className="px-4 py-6 bg-gray-900">
              <MessageContainer>
                <div className="flex space-x-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
                    <BotIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                    <span className="text-gray-400 text-sm">AI is thinking...</span>
                  </div>
                </div>
              </MessageContainer>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="border-t border-gray-800 bg-gray-900 p-4 backdrop-blur-lg bg-opacity-80">
        <div className="max-w-5xl mx-auto">
          <div className="flex space-x-4 items-center">
            <div className="flex-grow relative">
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ChatPage;
