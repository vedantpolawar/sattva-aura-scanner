import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Sattva Bot, your Ayurvedic herb assistant. How can I help you verify authenticity or learn about sustainable sourcing today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("scan") || input.includes("qr")) {
      return "To scan a QR code, navigate to the Scanner page and point your camera at the QR code on your herb package. I'll instantly show you the complete blockchain provenance!";
    }
    
    if (input.includes("authentic") || input.includes("verify")) {
      return "Every herb in our system is verified through blockchain technology. Each QR scan shows you the complete journey from farm to your hands, including lab tests, sustainability certificates, and farmer details.";
    }
    
    if (input.includes("sustainable") || input.includes("organic")) {
      return "All our partner farms use 100% organic practices. Our blockchain records include soil health data, water usage, and fair trade certifications to ensure complete sustainability transparency.";
    }
    
    if (input.includes("help") || input.includes("how")) {
      return "I can help you with:\n• Scanning QR codes for herb verification\n• Understanding blockchain provenance\n• Learning about sustainable practices\n• Interpreting lab test results\n• Finding authentic Ayurvedic suppliers";
    }
    
    return "Thank you for your question! Our blockchain system ensures complete transparency in the Ayurvedic herb supply chain. Would you like to scan a QR code to see how it works?";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-glow",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-gradient-primary hover:shadow-glow"
        )}
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 z-40 flex flex-col shadow-glow animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Sattva Bot</span>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex items-start space-x-2",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === "bot" && (
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                
                <div
                  className={cn(
                    "max-w-[70%] p-3 rounded-lg text-sm",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>

                {message.sender === "user" && (
                  <div className="w-6 h-6 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about herb authenticity..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                variant="sage"
                disabled={!inputText.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;