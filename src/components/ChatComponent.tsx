// import * as React from "react";
// import { LuBot, LuSendHorizontal } from "react-icons/lu";
// import useChatbot from "../hooks/useChatbot";
// import Markdown from "react-markdown";
// import useChatScroll from "../hooks/useChatScroll";

// const ChatComponent: React.FunctionComponent = () => {
//   const [input, setInput] = React.useState("");
//   const { messages, sendMessage } = useChatbot();
//   const ref = useChatScroll(messages);

//   const handleSend = () => {
//     if (input.trim()) {
//       sendMessage(input);
//       setInput("");
//     }
//   };
//   return (
//     <div className="flex flex-col h-[80vh] bg-white">
//       <h2 className="p-4 font-semibold text-lg text-center bg-blue-100 flex text-blue-800 justify-center items-center gap-2">
//         React + OpenAI Chatbot <LuBot size={25} />
//       </h2>
//       <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-2">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-3 rounded-lg max-w-xs ${
//               msg.sender === "user"
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-gray-300 text-gray-800"
//             }`}
//           >
//             <Markdown>{msg.text}</Markdown>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center p-4 bg-gray-50">
//         <input
//           type="text"
//           className="flex-1 p-2 border rounded-lg focus:outline-none"
//           placeholder="Your message here"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button onClick={handleSend} className="p-2">
//           <LuSendHorizontal size={25} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;

import * as React from "react";
import { LuBot, LuSendHorizontal } from "react-icons/lu";
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

  // Handle pressing Enter to send
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white border rounded-lg shadow-md">
      <h2 className="p-4 font-semibold text-lg text-center bg-blue-100 flex text-blue-800 justify-center items-center gap-2">
        React + OpenAI Chatbot <LuBot size={25} />
      </h2>

      {/* Chat messages */}
      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs break-words ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center p-4 bg-gray-50 gap-2">
        <textarea
          className="flex-1 p-2 border rounded-lg focus:outline-none resize-none"
          placeholder="Your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={1}
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors"
        >
          <LuSendHorizontal size={25} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
