import * as React from "react";
import { LuBot, LuSendHorizontal, LuUser } from "react-icons/lu";
import useChatbot from "../hooks/useChatbot";
import Markdown from "react-markdown";
import useChatScroll from "../hooks/useChatScroll";

const ChatComponent: React.FunctionComponent = () => {
  const [input, setInput] = React.useState("");
  const { messages, sendMessage } = useChatbot();
  const ref = useChatScroll(messages);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-3xl mx-auto bg-white border rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center gap-2 justify-center font-semibold text-lg">
        <LuBot size={22} />
        AI Chat Assistant
      </div>

      {/* Messages */}
      <div
        ref={ref}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Bot Avatar */}
            {msg.sender !== "user" && (
              <div className="bg-gray-300 p-2 rounded-full">
                <LuBot size={18} />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm leading-relaxed shadow ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 border rounded-bl-none"
              }`}
            >
              <Markdown>{msg.text}</Markdown>
            </div>

            {/* User Avatar */}
            {msg.sender === "user" && (
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <LuUser size={18} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex items-end gap-2">
        <textarea
          className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
        />

        <button
          onClick={handleSend}
          className="p-3 bg-blue-500 rounded-xl text-white hover:bg-blue-600 transition-all shadow-md"
        >
          <LuSendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
