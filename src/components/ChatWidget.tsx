
import { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { Message } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock initial admin message
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: uuidv4(),
        sender: "admin",
        text: "Hello! How can I assist you with your vehicle rental today?",
        timestamp: new Date().toISOString(),
      };
      setMessages([initialMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Simulate unread message notification
  useEffect(() => {
    // If closed chat and new admin message
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].sender === "admin") {
      setUnreadCount((prev) => prev + 1);
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      sender: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Simulate admin response after 1 second
    setTimeout(() => {
      const adminResponses = [
        "Thanks for your message! Our team will get back to you soon.",
        "I understand you're looking for vehicle rental options. How many passengers do you need to accommodate?",
        "Would you prefer a vehicle with or without a driver?",
        "We have great deals on weekend rentals right now. Would you like more information?",
        "If you have any specific requirements for your rental, please let us know!",
      ];

      const randomResponse = adminResponses[Math.floor(Math.random() * adminResponses.length)];

      const adminMessage: Message = {
        id: uuidv4(),
        sender: "admin",
        text: randomResponse,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, adminMessage]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  // Clear conversation function
  const clearConversation = () => {
    setMessages([]);
    // This will trigger the useEffect to add the initial message again
    toast.success("Chat conversation cleared");
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Chat Widget Button */}
      <button
        onClick={toggleChat}
        className="bg-primary hover:bg-primary-dark text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg relative"
      >
        {isOpen ? (
          <i className="fas fa-times text-xl"></i>
        ) : (
          <i className="fas fa-comment text-xl"></i>
        )}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Swift Ride Support</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleChat} 
                className="text-white hover:bg-primary-dark rounded-full p-1 focus:outline-none"
                title="Close chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-gray-200 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Clear conversation button - repositioned to bottom */}
            <div className="text-center mt-4 mb-2">
              <button
                onClick={clearConversation}
                className="text-sm text-gray-500 hover:text-primary opacity-50 hover:opacity-100 transition-opacity"
              >
                Clear conversation
              </button>
            </div>
            
            <div ref={messagesEndRef}></div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-md transition-colors"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
